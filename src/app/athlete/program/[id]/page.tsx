"use client";

import { AppHeader } from "@/components/layout/app-header";
import { useAuth } from "@/context/auth-provider";
import { useParams } from "next/navigation";
import ProgramDetail from "@/features/athlete/program/components/program-detail";

export default function ProgramDetailPage() {
  const { user } = useAuth();
  if (!user) return <p className="flex justify-center">Loading ...</p>;

  const params = useParams();
  const { id } = params;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user} currentView="athlete" />
      <ProgramDetail programId={Number(id)} />
    </div>
  );
}
