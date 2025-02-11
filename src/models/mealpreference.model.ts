import mongoose from 'mongoose';

const mealPreferenceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mealTypes: {
        type: [String],
        enum: ['Vegetarian', 'Vegan', 'Gluten-free', 'Lactose-free', 'None'],
        default: []
    },
    availableIngredients: { type: [String], default: [] }, // List of available ingredients user prefers
    caloricIntakeGoal: { type: Number, required: true }, // kcal goal
    mealCountPreference: {
        type: String,
        enum: ['3 Meals', '5 Meals', '6+ Meals'],
        required: true
    },
    foodPreferences: { type: [String], default: [] }, // List of preferred foods or cuisines
    goal: { type: String, required: true } // User's meal planning goal
}, { timestamps: true });

export default mongoose.model('MealPreference', mealPreferenceSchema);
