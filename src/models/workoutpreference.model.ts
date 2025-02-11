import mongoose from "mongoose";
const workoutPreferenceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    primaryFitnessGoal: {
        type: String,
        enum: [
            'Weight Loss', 'Muscle Gain', 'Endurance',
            'General Fitness', 'Flexibility & Mobility', 'Event-Specific Training'
        ],
        required: true
    },
    bodyMetrics: {
        height: { type: Number, required: true }, // cm
        weight: { type: Number, required: true }, // kg
        bmi: { type: Number } // Optional, can be calculated
    },
    trainingDuration: {
        programDuration: { type: Number, required: true }, // Weeks
        equipment: { type: [String], default: [] } // List of selected equipment
    },
    workoutDuration: {
        sessionLength: { type: Number, required: true }, // Minutes
        weeklyFrequency: { type: String, required: true }
    },
    intensityLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    healthConsiderations: {
        jointProblems: { type: Boolean, default: false },
        backPain: { type: Boolean, default: false },
        recentInjuries: { type: Boolean, default: false },
        medicalConditions: { type: Boolean, default: false },
        additionalDetails: { type: String, default: '' }
    }
}, { timestamps: true });

export default mongoose.model('WorkoutPreference', workoutPreferenceSchema);