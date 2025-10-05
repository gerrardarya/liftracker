"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Copy } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import type { Week, Day, Exercise } from "@/lib/mock-data";
import { useAuth } from "@/context/auth-provider";

export default function AthleteCreateProgramPage() {
  const { user } = useAuth();
  if (!user) return <p className="flex justify-center">Loading ...</p>;

  const router = useRouter();
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");
  const [weeks, setWeeks] = useState<Week[]>([
    {
      id: "w1",
      name: "Week 1",
      days: [
        {
          id: "d1",
          name: "Day 1",
          exercises: [
            {
              id: "e1",
              name: "",
              reps: "",
              weight: "",
              rpe: "",
              note: "",
            },
          ],
        },
      ],
    },
  ]);

  const addWeek = () => {
    const newWeek: Week = {
      id: `w${weeks.length + 1}`,
      name: `Week ${weeks.length + 1}`,
      days: [
        {
          id: `d${Date.now()}`,
          name: "Day 1",
          exercises: [
            {
              id: `e${Date.now()}`,
              name: "",
              reps: "",
              weight: "",
              rpe: "",
              note: "",
            },
          ],
        },
      ],
    };
    setWeeks([...weeks, newWeek]);
  };

  const removeWeek = (weekId: string) => {
    if (weeks.length > 1) {
      setWeeks(weeks.filter((w) => w.id !== weekId));
    }
  };

  const copyWeek = (weekIndex: number) => {
    const weekToCopy = weeks[weekIndex];
    const newWeek: Week = {
      ...weekToCopy,
      id: `w${Date.now()}`,
      name: `${weekToCopy.name} (Copy)`,
      days: weekToCopy.days.map((day) => ({
        ...day,
        id: `d${Date.now()}-${Math.random()}`,
        exercises: day.exercises.map((ex) => ({
          ...ex,
          id: `e${Date.now()}-${Math.random()}`,
        })),
      })),
    };
    setWeeks([...weeks, newWeek]);
  };

  const addDay = (weekId: string) => {
    setWeeks(
      weeks.map((week) => {
        if (week.id === weekId) {
          const newDay: Day = {
            id: `d${Date.now()}`,
            name: `Day ${week.days.length + 1}`,
            exercises: [
              {
                id: `e${Date.now()}`,
                name: "",
                reps: "",
                weight: "",
                rpe: "",
                note: "",
              },
            ],
          };
          return { ...week, days: [...week.days, newDay] };
        }
        return week;
      }),
    );
  };

  const removeDay = (weekId: string, dayId: string) => {
    setWeeks(
      weeks.map((week) => {
        if (week.id === weekId && week.days.length > 1) {
          return { ...week, days: week.days.filter((d) => d.id !== dayId) };
        }
        return week;
      }),
    );
  };

  const addExercise = (weekId: string, dayId: string) => {
    setWeeks(
      weeks.map((week) => {
        if (week.id === weekId) {
          return {
            ...week,
            days: week.days.map((day) => {
              if (day.id === dayId) {
                const newExercise: Exercise = {
                  id: `e${Date.now()}`,
                  name: "",
                  reps: "",
                  weight: "",
                  rpe: "",
                  note: "",
                };
                return { ...day, exercises: [...day.exercises, newExercise] };
              }
              return day;
            }),
          };
        }
        return week;
      }),
    );
  };

  const removeExercise = (
    weekId: string,
    dayId: string,
    exerciseId: string,
  ) => {
    setWeeks(
      weeks.map((week) => {
        if (week.id === weekId) {
          return {
            ...week,
            days: week.days.map((day) => {
              if (day.id === dayId && day.exercises.length > 1) {
                return {
                  ...day,
                  exercises: day.exercises.filter((e) => e.id !== exerciseId),
                };
              }
              return day;
            }),
          };
        }
        return week;
      }),
    );
  };

  const updateExercise = (
    weekId: string,
    dayId: string,
    exerciseId: string,
    field: keyof Exercise,
    value: string,
  ) => {
    setWeeks(
      weeks.map((week) => {
        if (week.id === weekId) {
          return {
            ...week,
            days: week.days.map((day) => {
              if (day.id === dayId) {
                return {
                  ...day,
                  exercises: day.exercises.map((ex) => {
                    if (ex.id === exerciseId) {
                      return { ...ex, [field]: value };
                    }
                    return ex;
                  }),
                };
              }
              return day;
            }),
          };
        }
        return week;
      }),
    );
  };

  const updateDayName = (weekId: string, dayId: string, name: string) => {
    setWeeks(
      weeks.map((week) => {
        if (week.id === weekId) {
          return {
            ...week,
            days: week.days.map((day) => {
              if (day.id === dayId) {
                return { ...day, name: name };
              }
              return day;
            }),
          };
        }
        return week;
      }),
    );
  };

  const handleSave = () => {
    if (!programName.trim()) {
      alert("Please enter a program name");
      return;
    }

    const newProgram = {
      id: `${Date.now()}`,
      name: programName,
      description: programDescription,
      weeks: weeks,
      createdBy: "athlete@gym.com",
      creatorRole: "athlete" as const,
      isPublic: false,
    };

    console.log("Saving program:", newProgram);
    alert("Program created successfully!");
    router.push("/athlete/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user} currentView="athlete" />
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Create Training Program</h1>
          <p className="text-muted-foreground">
            Design your own custom training program
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Program Details</CardTitle>
            <CardDescription>
              Basic information about your program
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="program-name">Program Name</Label>
              <Input
                id="program-name"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                placeholder="e.g., My Strength Program"
              />
            </div>
            <div>
              <Label htmlFor="program-description">Description</Label>
              <Textarea
                id="program-description"
                value={programDescription}
                onChange={(e) => setProgramDescription(e.target.value)}
                placeholder="Describe your program goals and approach..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Program Structure</CardTitle>
                <CardDescription>
                  Add weeks, days, and exercises
                </CardDescription>
              </div>
              <Button onClick={addWeek}>
                <Plus className="mr-2 h-4 w-4" />
                Add Week
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="w1" className="w-full">
              <TabsList className="mb-4">
                {weeks.map((week) => (
                  <TabsTrigger key={week.id} value={week.id}>
                    {week.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {weeks.map((week, weekIndex) => (
                <TabsContent
                  key={week.id}
                  value={week.id}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{week.name}</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyWeek(weekIndex)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Week
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addDay(week.id)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Day
                      </Button>
                      {weeks.length > 1 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeWeek(week.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Week
                        </Button>
                      )}
                    </div>
                  </div>

                  {week.days.map((day) => (
                    <Card key={day.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Input
                            value={day.name}
                            onChange={(e) =>
                              updateDayName(week.id, day.id, e.target.value)
                            }
                            className="max-w-xs font-semibold"
                          />
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addExercise(week.id, day.id)}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Exercise
                            </Button>
                            {week.days.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDay(week.id, day.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {day.exercises.map((exercise) => (
                            <div
                              key={exercise.id}
                              className="grid grid-cols-12 gap-3 items-start p-4 border rounded-lg"
                            >
                              <div className="col-span-3">
                                <Label className="text-xs">Exercise</Label>
                                <Input
                                  value={exercise.name}
                                  onChange={(e) =>
                                    updateExercise(
                                      week.id,
                                      day.id,
                                      exercise.id,
                                      "name",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Exercise name"
                                />
                              </div>
                              <div className="col-span-2">
                                <Label className="text-xs">Reps</Label>
                                <Input
                                  value={exercise.reps}
                                  onChange={(e) =>
                                    updateExercise(
                                      week.id,
                                      day.id,
                                      exercise.id,
                                      "reps",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="3x8"
                                />
                              </div>
                              <div className="col-span-2">
                                <Label className="text-xs">Weight</Label>
                                <Input
                                  value={exercise.weight}
                                  onChange={(e) =>
                                    updateExercise(
                                      week.id,
                                      day.id,
                                      exercise.id,
                                      "weight",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="185 lbs"
                                />
                              </div>
                              <div className="col-span-1">
                                <Label className="text-xs">RPE</Label>
                                <Input
                                  value={exercise.rpe}
                                  onChange={(e) =>
                                    updateExercise(
                                      week.id,
                                      day.id,
                                      exercise.id,
                                      "rpe",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="8"
                                />
                              </div>
                              <div className="col-span-3">
                                <Label className="text-xs">Notes</Label>
                                <Input
                                  value={exercise.note}
                                  onChange={(e) =>
                                    updateExercise(
                                      week.id,
                                      day.id,
                                      exercise.id,
                                      "note",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Form cues..."
                                />
                              </div>
                              <div className="col-span-1 flex items-end">
                                {day.exercises.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      removeExercise(
                                        week.id,
                                        day.id,
                                        exercise.id,
                                      )
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/athlete/dashboard")}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Program</Button>
        </div>
      </div>
    </div>
  );
}
