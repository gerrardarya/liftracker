import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import useProgramDetail from "@/features/athlete/program/hooks/use-program-detail";
import { Input } from "@/components/ui/input";

type ProgramDetailProps = {
  programId: number | string;
};

export default function ProgramDetail({ programId }: ProgramDetailProps) {
  const { programsDetail } = useProgramDetail({ programId });

  if (!programsDetail)
    return <p className="flex justify-center">Loading ...</p>;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/athlete">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-3xl">{programsDetail.name}</CardTitle>
          <CardDescription className="text-base">
            {programsDetail.note}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs
        defaultValue={String(programsDetail.program_weeks[0]?.id)}
        className="space-y-4"
      >
        <TabsList
          className="grid w-full"
          style={{
            gridTemplateColumns: `repeat(${programsDetail.program_weeks?.length}, 1fr)`,
          }}
        >
          {programsDetail.program_weeks?.map((detail) => (
            <TabsTrigger key={detail.id} value={String(detail.id)}>
              Week {detail.week_number}
            </TabsTrigger>
          ))}
        </TabsList>

        {programsDetail.program_weeks.map((week) => (
          <TabsContent
            key={week.id}
            value={String(week.id)}
            className="space-y-4"
          >
            {week.program_details.map((day) => (
              <Collapsible key={day.id} defaultOpen>
                <Card>
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-xl">{day.name}</CardTitle>
                      </div>
                      <ChevronDown className="h-5 w-5 transition-transform duration-200" />
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">Done</TableHead>
                            <TableHead>Exercise</TableHead>
                            <TableHead>Sets</TableHead>
                            <TableHead>Reps</TableHead>
                            <TableHead>Weight</TableHead>
                            <TableHead>RPE</TableHead>
                            <TableHead>Your RPE</TableHead>
                            <TableHead>Notes</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {day.program_workouts.map((exercise) => (
                            <TableRow key={exercise.id}>
                              <TableCell>
                                <Checkbox checked={exercise.status ?? false} />
                              </TableCell>
                              <TableCell className="font-medium">
                                {exercise.exercises?.name}
                              </TableCell>
                              <TableCell>{exercise.sets}</TableCell>
                              <TableCell>{exercise.reps}</TableCell>
                              <TableCell>{exercise.weight}</TableCell>
                              <TableCell>{exercise.target_rpe}</TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  min="1"
                                  max="10"
                                  placeholder="1-10"
                                  className="w-20"
                                  value={""}
                                />
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {exercise.note}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
