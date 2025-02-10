import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Timer } from "lucide-react";

type Exercise = {
  name: string;
  sets: number;
  reps: number;
  rest: number;
};

type WorkoutPlan = {
  exercises: Exercise[];
};

export default function WorkoutCard({ plan }: { plan?: WorkoutPlan }) {
  if (!plan) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5" />
          Today's Workout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {plan.exercises.map((exercise, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{exercise.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  {exercise.rest}s rest
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {exercise.sets} sets × {exercise.reps} reps
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
