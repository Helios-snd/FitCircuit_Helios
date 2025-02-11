import { Schema, model } from 'mongoose';

const UserPreferencesSchema = new Schema({
  clerkUserId: { type: String, required: true, unique: true },
  fitness: {
    goals: { type: String, enum: ['weight-loss', 'muscle-gain', 'maintenance'] },
    equipment: [String],
    injuries: [String],
    workoutIntensity: { type: String, enum: ['low', 'medium', 'high'] }
  },
  nutrition: {
    dietaryType: { type: String, enum: ['veg', 'non-veg', 'vegan'] },
    cuisinePreferences: [String],
    allergies: [String]
  }
});

export default model('UserPreferences', UserPreferencesSchema);