"use client";

import { useAuth } from "@/context/auth-provider";
import { AppHeader } from "@/components/layout/app-header";
import { mockPrograms, mockEnrollments, mockProgress } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Plus, Search, TrendingUp } from "lucide-react";
import ProgramList from "@/features/athlete/program/components/program-list";
import { supabase } from "@/lib/supabaseClient";

export default function AthletePage() {
  const { user } = useAuth();
  if (!user) return <p className="flex justify-center">Loading ...</p>;

  const athleteEnrollments = mockEnrollments;

  const athletePrograms = mockPrograms;

  const enrolledProgramsWithProgress = athleteEnrollments.map((enrollment) => {
    const program = mockPrograms.find((p) => p.id === enrollment.programId);

    const progress = mockProgress.find((p) => p.enrollmentId === enrollment.id);

    let completedExercises = 0;
    let totalExercises = 0;

    if (progress && program) {
      program.weeks.forEach((week) => {
        week.days.forEach((day) => {
          totalExercises += day.exercises.length;
        });
      });

      progress.weeks.forEach((week) => {
        week.days.forEach((day) => {
          day.exercises.forEach((ex) => {
            if (ex.completed) completedExercises++;
          });
        });
      });
    }

    const completionRate =
      totalExercises > 0
        ? Math.round((completedExercises / totalExercises) * 100)
        : 0;

    return {
      ...enrollment,
      program,
      completedExercises,
      totalExercises,
      completionRate,
      lastUpdated: progress?.lastUpdated || "No activity",
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user} currentView="athlete" />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Athlete Dashboard</h2>
          <p className="text-muted-foreground">
            Track your training programs and progress
          </p>
        </div>

        <Tabs defaultValue="enrolled" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="enrolled">
              Enrolled Programs ({enrolledProgramsWithProgress.length})
            </TabsTrigger>
            <TabsTrigger value="my-programs">
              My Programs ({athletePrograms.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold">Enrolled Programs</h3>
                <p className="text-muted-foreground">
                  Programs you're currently following
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/athlete/programs/browse">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Programs
                </Link>
              </Button>
            </div>

            {enrolledProgramsWithProgress.length > 0 ? (
              <div className="grid gap-6">
                {enrolledProgramsWithProgress.map((enrollment) => {
                  if (!enrollment.program) return null;

                  return (
                    <Card
                      key={enrollment.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">
                              {enrollment.program.name}
                            </CardTitle>
                            <CardDescription>
                              {enrollment.program.description}
                            </CardDescription>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-sm ${
                              enrollment.status === "active"
                                ? "bg-green-100 text-green-700"
                                : enrollment.status === "completed"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {enrollment.status}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Enrolled:{" "}
                                {new Date(
                                  enrollment.enrolledDate,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <span>Coach: {enrollment.program.createdBy}</span>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">
                                Progress
                              </span>
                              <span className="text-sm font-semibold">
                                {enrollment.completionRate}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{
                                  width: `${enrollment.completionRate}%`,
                                }}
                              />
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-muted-foreground">
                                {enrollment.completedExercises} /{" "}
                                {enrollment.totalExercises} exercises completed
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Last updated: {enrollment.lastUpdated}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button asChild className="flex-1">
                              <Link
                                href={`/athlete/program/${enrollment.program.id}`}
                              >
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Continue Training
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">
                    No enrolled programs
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Browse and apply to programs from professional coaches
                  </p>
                  <Button asChild>
                    <Link href="/athlete/programs/browse">
                      <Search className="mr-2 h-4 w-4" />
                      Browse Programs
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="my-programs" className="space-y-6">
            <ProgramList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
