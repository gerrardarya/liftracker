import { Database } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { ProgramWithRelations } from "@/features/hooks/program/use-get-program-detail-by-id-query";

type Program = Database["public"]["Tables"]["programs"]["Row"];
type ProgramDetail = Database["public"]["Tables"]["program_details"]["Row"];
type ProgramWorkout = Database["public"]["Tables"]["program_workouts"]["Row"];

export function useGetProgramDetailQuery() {
  return useQuery<ProgramWithRelations[]>({
    queryKey: ["programs-with-relations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("programs").select(
        `
          *,
          program_weeks (
            *,
            program_details (
              *,
              program_workouts (*)
            )
          )
        `,
      );

      if (error) throw error;
      return data ?? [];
    },
  });
}
