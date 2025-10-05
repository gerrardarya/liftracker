export type AuthUser = {
  id: string;
  email: string | null;
  phone: string | null;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  last_sign_in_at: string | null;
};
