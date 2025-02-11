"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import type { WorkoutPlan, Exercise } from "@/types/workout"

const mockWorkoutPlan: WorkoutPlan = {
  currentWeek: 3,
  currentDay: 2,
  streak: 14,
  totalWorkouts: 32,
  progress: [
    {
      week: 1,
      status: "completed",
      days: [
        { day: 1, type: "Upper Body", exercises: 8, duration: 45, status: "completed" },
        { day: 2, type: "Lower Body", exercises: 6, duration: 40, status: "completed" },
        { day: 3, type: "Core & Cardio", exercises: 7, duration: 35, status: "completed" },
        { day: 4, type: "Full Body", exercises: 10, duration: 50, status: "completed" },
      ],
    },
    {
      week: 2,
      status: "completed",
      days: Array(4)
        .fill(null)
        .map((_, i) => ({
          day: i + 1,
          type: ["Upper Body", "Lower Body", "Core & Cardio", "Full Body"][i],
          exercises: [8, 6, 7, 10][i],
          duration: [45, 40, 35, 50][i],
          status: "completed",
        })),
    },
    {
      week: 3,
      status: "in-progress",
      days: [
        { day: 1, type: "Upper Body", exercises: 8, duration: 45, status: "completed" },
        { day: 2, type: "Lower Body", exercises: 6, duration: 40, status: "in-progress" },
        { day: 3, type: "Core & Cardio", exercises: 7, duration: 35, status: "upcoming" },
        { day: 4, type: "Full Body", exercises: 10, duration: 50, status: "upcoming" },
      ],
    },
    {
      week: 4,
      status: "upcoming",
      days: Array(4)
        .fill(null)
        .map((_, i) => ({
          day: i + 1,
          type: ["Upper Body", "Lower Body", "Core & Cardio", "Full Body"][i],
          exercises: [8, 6, 7, 10][i],
          duration: [45, 40, 35, 50][i],
          status: "upcoming",
        })),
    },
  ],
}

const todaysExercises: Exercise[] = [
  {
    id: "1",
    name: "Barbell Squats",
    sets: 4,
    reps: 12,
    muscles: ["Legs", "Glutes"],
    imageUrl: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Romanian Deadlifts",
    sets: 3,
    reps: 15,
    muscles: ["Legs", "Back"],
    imageUrl: "/placeholder.svg",
  },
]

export default function WorkoutPlans() {
  const [workoutPlan] = useState<WorkoutPlan>(mockWorkoutPlan)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())

  const toggleExercise = (id: string) => {
    setCompletedExercises((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-background min-w-full">
      <PageHeader />
      <main className="container py-6 min-w-full px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Keep pushing, {process.env.NEXT_PUBLIC_USER_NAME || "Champion"}!</h1>
              <p className="text-muted-foreground">"The only bad workout is the one that didn't happen."</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold">Week {workoutPlan.currentWeek}</h2>
              <p className="text-muted-foreground">Day {workoutPlan.currentDay} of 7</p>
            </div>
          </div>

          {/* Week Progress */}
          <div className="flex gap-4 overflow-x-auto pb-2 min-w-full">
            {workoutPlan.progress.map((week) => (
              <Button
                key={week.week}
                variant={week.status === "in-progress" ? "default" : "outline"}
                className="min-w-[100px]"
              >
                Week {week.week}
                <br />
                <span className="text-xs">
                  {week.status === "completed"
                    ? "Completed"
                    : week.status === "in-progress"
                      ? "In Progress"
                      : "Upcoming"}
                </span>
              </Button>
            ))}
          </div>

          {/* Daily Workouts */}
          <div className="grid gap-4 md:grid-cols-4">
            {workoutPlan.progress[2].days.map((day) => (
              <Card key={day.day} className={day.status === "in-progress" ? "border-primary" : ""}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Day {day.day}</h3>
                      <p className="text-sm text-muted-foreground">{day.type}</p>
                    </div>
                    {day.status === "completed" && <Check className="text-green-500" />}
                    {day.status === "in-progress" && <Clock className="text-blue-500" />}
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{day.exercises} exercises</p>
                    <p>{day.duration} minutes</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Today's Workout */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Today's Workout</h2>
            <div className="space-y-4">
              {todaysExercises.map((exercise) => (
                <Card key={exercise.id} className={completedExercises.has(exercise.id) ? "bg-muted" : ""}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="h-20 w-20 rounded-md bg-muted">{/* Exercise image would go here */}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{exercise.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {exercise.sets} sets × {exercise.reps} reps
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => toggleExercise(exercise.id)}>
                            {completedExercises.has(exercise.id) ? "Undo" : "Complete"}
                          </Button>
                        </div>
                        <div className="flex gap-2 mt-2">
                          {exercise.muscles.map((muscle) => (
                            <span key={muscle} className="inline-block px-2 py-1 text-xs rounded-full bg-secondary">
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Progress Footer */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">{workoutPlan.streak} day streak</div>
              <div className="text-sm text-muted-foreground">{workoutPlan.totalWorkouts} workouts completed</div>
            </div>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Start Workout
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

