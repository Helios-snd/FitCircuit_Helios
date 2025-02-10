"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dumbbell, MonitorIcon as Running, Heart } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function CustomizeWorkoutPlan() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="container max-w-3xl py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Customize Your Workout Plan</h1>
            <p className="text-muted-foreground">Step 1 of 3 • Set Your Preferences</p>
            <div className="w-full bg-secondary h-2 mt-4 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-1/3" />
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="font-semibold mb-4">What's your primary fitness goal?</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: Dumbbell, title: "Weight Loss" },
                    { icon: Running, title: "Muscle Gain" },
                    { icon: Running, title: "Endurance" },
                    { icon: Heart, title: "General Fitness" },
                  ].map((goal) => (
                    <Card key={goal.title} className="cursor-pointer hover:bg-accent">
                      <CardContent className="flex items-center gap-4 p-4">
                        <goal.icon className="h-5 w-5" />
                        <span className="font-medium">{goal.title}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-4">What equipment do you have access to?</h2>
                <div className="space-y-2">
                  {[
                    "Home basics (bodyweight, resistance bands)",
                    "Free weights (dumbbells, kettlebells)",
                    "Full gym access",
                  ].map((equipment) => (
                    <div key={equipment} className="flex items-center space-x-2">
                      <Checkbox id={equipment} />
                      <label htmlFor={equipment}>{equipment}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-4">Workout Duration & Frequency</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Session Length (minutes)</label>
                    <Slider defaultValue={[45]} max={120} min={15} step={5} className="mt-2" />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>15 min</span>
                      <span>120 min</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Weekly Frequency</label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 times per week</SelectItem>
                        <SelectItem value="3-4">3-4 times per week</SelectItem>
                        <SelectItem value="5-6">5-6 times per week</SelectItem>
                        <SelectItem value="7">Every day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-4">Health Considerations</h2>
                <div className="grid gap-4 sm:grid-cols-2 mb-4">
                  {["Joint problems", "Recent injuries", "Back pain", "Medical conditions"].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox id={condition} />
                      <label htmlFor={condition}>{condition}</label>
                    </div>
                  ))}
                </div>
                <Textarea
                  placeholder="Please provide any additional information about your health conditions or limitations..."
                  className="min-h-[100px]"
                />
              </div>

              <Button className="w-full">Continue to Next Step</Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

