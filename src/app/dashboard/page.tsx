"use client";

import { useAuth } from "@/context/auth-provider";
import { Button } from "@/components/ui/button";
import { mockPrograms } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { Plus } from "lucide-react";
export default function DashboardPage() {
  const { user, signOut } = useAuth();

  if (!user) return <p>Rediecting to login...</p>;

  return (
    <div className="min-h-screen bg-background">
      {/*logout*/}
      <div className="absolute top-4 right-4">
        <Button variant="outline" size="sm" onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Your Programs</h2>
            <p className="text-muted-foreground">
              Manage and edit your training programs
            </p>
          </div>
          <Button asChild size="lg"></Button>
        </div>

        {mockPrograms.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockPrograms.map((program) => (
              <Card
                key={program.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{program.name}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{program.weeks.length} weeks</span>
                      <span>
                        {program.weeks.reduce(
                          (total, week) => total + week.days.length,
                          0,
                        )}{" "}
                        days
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link href={`/coach/program/${program.id}`}>View</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href={`/coach/program/${program.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No programs yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first training program to get started
              </p>
              <Button asChild>
                <Link href="/coach/program/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Program
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
