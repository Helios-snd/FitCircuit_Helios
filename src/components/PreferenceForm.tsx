import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preferencesSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function PreferenceForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      fitness: {
        goals: "weight-loss",
        availableEquipment: [],
        injuries: [],
        workoutIntensity: "medium",
        availableTime: 30,
        frequency: "3-times-week",
      },
      nutrition: {
        dietaryType: "non-veg",
        cuisinePreferences: [],
        allergies: [],
        mealCount: "3-meals",
        calorieGoal: 2000,
        restrictions: [],
      },
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/preferences", data);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to save preferences');
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Success",
        description: "Your preferences have been saved",
      });
      setLocation("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Fitness Preferences</h2>

          <FormField
            control={form.control}
            name="fitness.goals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What's your primary fitness goal?</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: "weight-loss", label: "Weight Loss" },
                    { value: "muscle-gain", label: "Muscle Gain" },
                    { value: "endurance", label: "Endurance" },
                    { value: "general-fitness", label: "General Fitness" },
                  ].map((goal) => (
                    <Card
                      key={goal.value}
                      className={`p-4 cursor-pointer ${
                        field.value === goal.value ? "border-primary" : ""
                      }`}
                      onClick={() => field.onChange(goal.value)}
                    >
                      {goal.label}
                    </Card>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fitness.availableEquipment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What equipment do you have access to?</FormLabel>
                <div className="space-y-2">
                  {[
                    "Home basics (bodyweight, resistance bands)",
                    "Free weights (dumbbells, kettlebells)",
                    "Full gym access",
                  ].map((equipment) => (
                    <div key={equipment} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value.includes(equipment)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, equipment]
                            : field.value.filter((v) => v !== equipment);
                          field.onChange(newValue);
                        }}
                      />
                      <span>{equipment}</span>
                    </div>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fitness.workoutIntensity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Intensity Level</FormLabel>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "low", label: "Beginner", desc: "Low intensity" },
                    { value: "medium", label: "Intermediate", desc: "Moderate intensity" },
                    { value: "high", label: "Advanced", desc: "High intensity" },
                  ].map((level) => (
                    <Card
                      key={level.value}
                      className={`p-4 cursor-pointer text-center ${
                        field.value === level.value ? "border-primary" : ""
                      }`}
                      onClick={() => field.onChange(level.value)}
                    >
                      <div className="font-medium">{level.label}</div>
                      <div className="text-sm text-muted-foreground">{level.desc}</div>
                    </Card>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fitness.availableTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Length (minutes)</FormLabel>
                <div className="space-y-4">
                  <Slider
                    min={15}
                    max={120}
                    step={15}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                  />
                  <div className="flex justify-between text-sm">
                    <span>15 min</span>
                    <span>120 min</span>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Nutrition Preferences</h2>

          <FormField
            control={form.control}
            name="nutrition.dietaryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dietary Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="veg">Vegetarian</SelectItem>
                    <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nutrition.mealCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Meal Count Preference</FormLabel>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "3-meals", label: "3 Meals", desc: "Traditional" },
                    { value: "5-meals", label: "5 Meals", desc: "With Snacks" },
                    { value: "6-plus-meals", label: "6+ Meals", desc: "Frequent Small" },
                  ].map((option) => (
                    <Card
                      key={option.value}
                      className={`p-4 cursor-pointer text-center ${
                        field.value === option.value ? "border-primary" : ""
                      }`}
                      onClick={() => field.onChange(option.value)}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.desc}</div>
                    </Card>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nutrition.calorieGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Calorie Goal</FormLabel>
                <div className="space-y-4">
                  <Slider
                    min={1200}
                    max={4000}
                    step={100}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                  />
                  <div className="flex justify-between text-sm">
                    <span>1200 kcal</span>
                    <span>4000 kcal</span>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Preferences'
          )}
        </Button>
      </form>
    </Form>
  );
}