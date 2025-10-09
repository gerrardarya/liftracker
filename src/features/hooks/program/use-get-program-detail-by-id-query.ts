"use client";

import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";

// Types
type Program = Database["public"]["Tables"]["programs"]["Row"];
type ProgramWeek = Database["public"]["Tables"]["program_weeks"]["Row"];
type ProgramDetail = Database["public"]["Tables"]["program_details"]["Row"];
type ProgramWorkout =
  Database["public"]["Tables"]["program_workouts"]["Row"] & {
    exercises: Exercise | null;
  };
type Exercise = Database["public"]["Tables"]["exercises"]["Row"];

export type ProgramWithRelations = Program & {
  program_weeks: (ProgramWeek & {
    program_details: (ProgramDetail & {
      program_workouts: ProgramWorkout[];
    })[];
  })[];
};

// Hook
export function useGetProgramByIdQuery(programId: number | string) {
  return useQuery<ProgramWithRelations>({
    queryKey: ["program", programId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select(
          `
          *,
          program_weeks (
            *,
            program_details (
              *,
              program_workouts (
                *,
                exercises (*)
              )
            )
          )
        `,
        )
        .eq("id", programId)
        .single(); // fetch one program

      if (error) throw error;
      return data;
    },
    enabled: !!programId,
  });
}
