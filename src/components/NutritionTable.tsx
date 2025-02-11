import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Utensils } from "lucide-react";

type Meal = {
  name: string;
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
};

type MealPlan = {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
};

export default function NutritionTable({ plan }: { plan?: MealPlan }) {
  if (!plan) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5" />
          Daily Meal Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meal</TableHead>
              <TableHead className="text-right">Calories</TableHead>
              <TableHead className="text-right">Protein</TableHead>
              <TableHead className="text-right">Carbs</TableHead>
              <TableHead className="text-right">Fat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(plan).map(([meal, { name, macros }]) => (
              <TableRow key={meal}>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell className="text-right">{macros.calories}</TableCell>
                <TableCell className="text-right">{macros.protein}g</TableCell>
                <TableCell className="text-right">{macros.carbs}g</TableCell>
                <TableCell className="text-right">{macros.fat}g</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
