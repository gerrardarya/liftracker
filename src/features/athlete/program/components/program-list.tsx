import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { mockPrograms } from "@/lib/mock-data";
import useProgramList from "@/features/athlete/program/hooks/use-program-list";
import useProgramDetail from "@/features/athlete/program/hooks/use-program-detail";

export default function ProgramList() {
  const athletePrograms = mockPrograms;

  const { programs = [] } = useProgramList();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold">My Programs</h3>
          <p className="text-muted-foreground">
            Programs you've created for yourself
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/athlete/program/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Program
          </Link>
        </Button>
      </div>
      {programs?.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs?.map((program) => (
            <Card
              key={program.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-xl">{program.name}</CardTitle>
                <CardDescription>{program.note}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground"></div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/athlete/program/${program.id}`}>View</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/athlete/program/${program.id}/edit`}>
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
              Create your own custom training program
            </p>
            <Button asChild>
              <Link href="/athlete/program/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Program
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
