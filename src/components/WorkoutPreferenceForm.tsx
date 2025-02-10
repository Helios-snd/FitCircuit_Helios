import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preferencesSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Dumbbell, Clock, Activity } from "lucide-react";

export default function WorkoutPreferenceForm({ onSubmit, defaultValues }: {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(preferencesSchema.shape.fitness),
    defaultValues: defaultValues?.fitness || {
      goals: "weight-loss",
      availableEquipment: [],
      injuries: [],
      workoutIntensity: "medium",
      availableTime: 30,
      frequency: "3-times-week",
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit({ fitness: data });
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
          <FormField
            control={form.control}
            name="goals"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  What's your primary fitness goal?
                </FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "weight-loss", label: "Weight Loss", desc: "Burn fat and improve health" },
                    { value: "muscle-gain", label: "Muscle Gain", desc: "Build strength and size" },
                    { value: "endurance", label: "Endurance", desc: "Improve stamina" },
                    { value: "general-fitness", label: "General Fitness", desc: "Overall well-being" },
                  ].map((goal) => (
                    <Card
                      key={goal.value}
                      className={`p-4 cursor-pointer transition-colors hover:bg-primary/5 ${
                        field.value === goal.value ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => field.onChange(goal.value)}
                    >
                      <div className="font-medium">{goal.label}</div>
                      <div className="text-sm text-muted-foreground">{goal.desc}</div>
                    </Card>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workoutIntensity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Preferred Intensity Level
                </FormLabel>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "low", label: "Beginner", desc: "Low impact workouts" },
                    { value: "medium", label: "Intermediate", desc: "Balanced intensity" },
                    { value: "high", label: "Advanced", desc: "High intensity training" },
                  ].map((level) => (
                    <Card
                      key={level.value}
                      className={`p-4 cursor-pointer transition-colors hover:bg-primary/5 ${
                        field.value === level.value ? "border-primary bg-primary/5" : ""
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
            name="availableTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Workout Duration
                </FormLabel>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">How long can you work out per session?</p>
                  <Slider
                    min={15}
                    max={120}
                    step={15}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm">
                    <span>15 min</span>
                    <span className="font-medium">{field.value} min</span>
                    <span>120 min</span>
                  </div>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableEquipment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Equipment</FormLabel>
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
                            : field.value.filter((v: string) => v !== equipment);
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
            name="injuries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Health Considerations</FormLabel>
                <div className="space-y-2">
                  {[
                    "Joint problems",
                    "Back pain",
                    "Recent injuries",
                    "Medical conditions",
                  ].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value.includes(condition)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, condition]
                            : field.value.filter((v: string) => v !== condition);
                          field.onChange(newValue);
                        }}
                      />
                      <span>{condition}</span>
                    </div>
                  ))}
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Continue to Meal Preferences'
          )}
        </Button>
      </form>
    </Form>
  );
}