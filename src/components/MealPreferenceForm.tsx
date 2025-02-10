import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preferencesSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function MealPreferenceForm({ onSubmit, defaultValues }: {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(preferencesSchema.shape.nutrition),
    defaultValues: defaultValues?.nutrition || {
      dietaryType: "non-veg",
      cuisinePreferences: [],
      allergies: [],
      mealCount: "3-meals",
      calorieGoal: 2000,
      restrictions: [],
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit({ nutrition: data });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Customize Your Meal Plan</h2>
          <p className="text-muted-foreground">Step 2 of 5 - Meal Preferences</p>

          <FormField
            control={form.control}
            name="restrictions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are your dietary restrictions?</FormLabel>
                <div className="space-y-2">
                  {[
                    "Vegetarian",
                    "Vegan",
                    "Gluten-free",
                    "Lactose-free",
                    "None",
                  ].map((restriction) => (
                    <div key={restriction} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value.includes(restriction)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, restriction]
                            : field.value.filter((v: string) => v !== restriction);
                          field.onChange(newValue);
                        }}
                      />
                      <span>{restriction}</span>
                    </div>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mealCount"
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
            name="cuisinePreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Preferences</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "poultry", label: "Poultry" },
                    { value: "seafood", label: "Seafood" },
                    { value: "vegetables", label: "Vegetables" },
                    { value: "whole-grains", label: "Whole Grains" },
                  ].map((preference) => (
                    <Card
                      key={preference.value}
                      className={`p-4 cursor-pointer ${
                        field.value.includes(preference.value) ? "border-primary" : ""
                      }`}
                      onClick={() => {
                        const newValue = field.value.includes(preference.value)
                          ? field.value.filter((v: string) => v !== preference.value)
                          : [...field.value, preference.value];
                        field.onChange(newValue);
                      }}
                    >
                      {preference.label}
                    </Card>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="calorieGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caloric Intake Goal</FormLabel>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Daily Calories</p>
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

        <Button type="submit" className="w-full">
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Continue to Activity Level'
          )}
        </Button>
      </form>
    </Form>
  );
}
