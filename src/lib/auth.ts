import { supabase, User } from './supabase';

export async function signUp(email: string, password: string, name: string): Promise<{ user: User | null; error: string | null }> {
  try {
    // Verificar se usuário já existe
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return { user: null, error: 'Email já cadastrado' };
    }

    // Criar novo usuário
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: password, // Em produção, usar hash real
          name,
          plan_type: 'normal'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return { user: data, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password_hash', password)
      .single();

    if (error || !data) {
      return { user: null, error: 'Email ou senha incorretos' };
    }

    return { user: data, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

export async function updateUserPlan(userId: string, planType: 'normal' | 'pro'): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from('users')
      .update({ plan_type: planType, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function saveUserGoals(userId: string, goals: any): Promise<{ success: boolean; error: string | null }> {
  try {
    // Verificar se já existem objetivos para este usuário
    const { data: existingGoals } = await supabase
      .from('user_goals')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existingGoals) {
      // Atualizar objetivos existentes
      const { error } = await supabase
        .from('user_goals')
        .update({
          ...goals,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) throw error;
    } else {
      // Inserir novos objetivos
      const { error } = await supabase
        .from('user_goals')
        .insert([
          {
            user_id: userId,
            ...goals,
            updated_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
    }

    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getUserGoals(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    return { goals: data, error: null };
  } catch (error: any) {
    return { goals: null, error: error.message };
  }
}

export async function saveProgress(userId: string, progress: any): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from('user_progress')
      .insert([
        {
          user_id: userId,
          date: new Date().toISOString().split('T')[0],
          ...progress
        }
      ]);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getUserProgress(userId: string, days: number = 30) {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(days);

    if (error) throw error;

    return { progress: data, error: null };
  } catch (error: any) {
    return { progress: [], error: error.message };
  }
}

export async function getAllUsers() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { users: data, error: null };
  } catch (error: any) {
    return { users: [], error: error.message };
  }
}
