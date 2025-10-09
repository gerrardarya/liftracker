import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { Database } from "@/types/schema";

type Program = Database["public"]["Tables"]["programs"]["Row"];

export function useGetProgramQuery() {
  return useQuery<Program[]>({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("programs").select("*");

      if (error) throw error;
      return data ?? [];
    },
  });
}
