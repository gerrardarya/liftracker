"use client";

import { useGetProgramQuery } from "@/features/hooks/program/use-get-program-query";

export default function useProgramList() {
  const { data, isLoading, error } = useGetProgramQuery();

  return { programs: data, error };
}
