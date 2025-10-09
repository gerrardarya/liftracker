import { useGetProgramDetailQuery } from "@/features/hooks/program/use-get-program-detail-query";
import { useGetProgramByIdQuery } from "@/features/hooks/program/use-get-program-detail-by-id-query";

type ProgramDetailProps = {
  programId: number | string;
};
export default function useProgramDetail({ programId }: ProgramDetailProps) {
  const { data, isLoading, error } = useGetProgramByIdQuery(programId);

  console.log(data);

  return { programsDetail: data, isLoading, error };
}
