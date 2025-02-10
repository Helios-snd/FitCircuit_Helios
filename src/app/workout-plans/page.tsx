"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function WorkoutPlans() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="container py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight">Your Weekly Workout Plan</h1>

          <div className="flex space-x-2 overflow-auto pb-2">
            {days.map((day, index) => (
              <Button key={day} variant={index === 0 ? "default" : "outline"} className="min-w-[100px]">
                {day}
              </Button>
            ))}
          </div>

          <div className="space-y-6">
            {exercises.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.1 }}
              >
                <div className="mb-4">
                  <span className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {group.category}
                  </span>
                </div>
                <Card>
                  <CardContent className="p-0">
                    {group.exercises.map((exercise, index) => (
                      <div
                        key={exercise.name}
                        className={`flex items-start gap-4 p-4 ${
                          index !== group.exercises.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div className="h-24 w-32 rounded-md bg-muted" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{exercise.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {exercise.sets} sets × {exercise.reps} reps
                          </p>
                          <ul className="mt-2 list-disc pl-4 text-sm text-muted-foreground">
                            {exercise.tips.map((tip, i) => (
                              <li key={i}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

const exercises = [
  {
    category: "Chest & Shoulders",
    exercises: [
      {
        name: "Bench Press",
        sets: "4",
        reps: "12",
        tips: [
          "Keep your back flat on the bench",
          "Grip slightly wider than shoulder width",
          "Lower the bar to mid-chest",
        ],
      },
      // Add more exercises...
    ],
  },
  // Add more exercise groups...
]

