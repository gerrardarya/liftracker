import { supabase } from "@/lib/supabaseClient";

export async function getPrograms() {
  const { data, error } = await supabase.from("programs").select("*");
  if (error) throw error;
  console.log(data);
  return data;
}
