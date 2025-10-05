"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@supabase/supabase-js";
import { useAuth } from "@/context/auth-provider";

interface AppHeaderProps {
  user: User;
  currentView: "coach" | "athlete";
}

export function AppHeader({ user, currentView }: AppHeaderProps) {
  const router = useRouter();

  const { signOut } = useAuth();

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gym Exercise MVP</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.email}
              <Badge variant="secondary" className="ml-2">
                {currentView === "coach" ? "Coach View" : "Athlete View"}
              </Badge>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const targetView =
                  currentView === "coach" ? "athlete" : "coach";
                router.push(`/${targetView}/dashboard`);
              }}
            >
              Switch to {currentView === "coach" ? "Athlete" : "Coach"} View
            </Button>
            <Button variant="outline" onClick={signOut}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
