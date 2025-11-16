import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email: string;
  name: string;
  plan_type: 'normal' | 'pro';
  created_at: string;
  updated_at: string;
};

export type UserGoal = {
  id: string;
  user_id: string;
  goal_type: 'lose' | 'gain' | 'maintain' | 'tone';
  workout_location: string[];
  time_available: string;
  equipment: string[];
  diet_preferences: string[];
  restrictions: string;
  created_at: string;
  updated_at: string;
};

export type UserProgress = {
  id: string;
  user_id: string;
  date: string;
  weight?: number;
  workout_completed: boolean;
  workout_duration?: number;
  notes?: string;
  created_at: string;
};
