"use client";

import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white shadow-lg rounded-2xl text-center w-80">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <Button onClick={handleGoogleLogin} className="w-full">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
