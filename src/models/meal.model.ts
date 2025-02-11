import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [
            'Early Morning', 'Breakfast', 'Mid-Morning Snack', 'Lunch',
            'Afternoon Snack', 'Pre-Workout Meal', 'Post-Workout Meal', 'Dinner'
        ],
        required: true
    },
    name: { type: String, required: true },
    description: { type: String },
    cuisineCategory: { type: String },
    recipe: { type: String },
    ingredients: { type: [String], required: true },
    calories: { type: Number, required: true },
});

const daySchema = new mongoose.Schema({
    day: { type: Number, required: true }, // Example: 1, 2, 3, 4, etc.
    meals: [mealSchema],
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
});
const nutrientSchema = new mongoose.Schema({
    day: { type: Number, required: true },
    totalCalories: { type: Number, required: true, default: 0 },
    totalProtein: { type: Number, required: true, default: 0 },
    totalCarbs: { type: Number, required: true, default: 0 },
    totalFats: { type: Number, required: true, default: 0 },
    meals: [{
        type: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String },
        nutritionalValues: {
            protein: { type: Number, required: true, default: 0 },
            carbs: { type: Number, required: true, default: 0 },
            fats: { type: Number, required: true, default: 0 },
            fiber: { type: Number, required: true, default: 0 },
            sugar: { type: Number, required: true, default: 0 },
            waterContent: { type: Number, required: true, default: 0 },
            calories: { type: Number, required: true, default: 0 }
        }
    }]
});

const mealPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    days: [daySchema],
    nutrients: [nutrientSchema],
}, { timestamps: true });


export default mongoose.model('MealPlan', mealPlanSchema);
