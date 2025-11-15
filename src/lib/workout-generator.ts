import { UserGoal } from './supabase';

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

type Exercise = {
  name: string;
  sets: string;
  video: string;
  muscle: string;
};

type DayWorkout = {
  name: string;
  exercises: Exercise[];
};

type WorkoutPlan = {
  [key in DayOfWeek]: DayWorkout;
};

export function generateWorkoutPlan(goals: UserGoal, location: 'home' | 'gym'): WorkoutPlan {
  const { goal_type, equipment } = goals;
  
  // Treinos para casa
  const homeWorkouts: WorkoutPlan = {
    monday: {
      name: 'Peito e Tríceps',
      exercises: [
        { name: 'Flexões', sets: '3x12', video: '💪', muscle: 'Peito' },
        { name: 'Flexões Diamante', sets: '3x10', video: '💪', muscle: 'Tríceps' },
        { name: 'Mergulho no Banco', sets: '3x12', video: '💪', muscle: 'Tríceps' },
        { name: 'Flexões Inclinadas', sets: '3x15', video: '💪', muscle: 'Peito' },
      ]
    },
    tuesday: {
      name: 'Pernas',
      exercises: [
        { name: 'Agachamento', sets: '4x15', video: '🦵', muscle: 'Pernas' },
        { name: 'Afundo', sets: '3x12', video: '🦵', muscle: 'Pernas' },
        { name: 'Agachamento Búlgaro', sets: '3x10', video: '🦵', muscle: 'Pernas' },
        { name: 'Elevação de Panturrilha', sets: '4x20', video: '🦵', muscle: 'Panturrilha' },
      ]
    },
    wednesday: {
      name: 'Costas e Bíceps',
      exercises: [
        { name: 'Remada Australiana', sets: '3x12', video: '💪', muscle: 'Costas' },
        { name: 'Superman', sets: '3x15', video: '💪', muscle: 'Costas' },
        { name: 'Rosca Concentrada', sets: '3x12', video: '💪', muscle: 'Bíceps' },
        { name: 'Rosca Martelo', sets: '3x10', video: '💪', muscle: 'Bíceps' },
      ]
    },
    thursday: {
      name: 'Ombros e Core',
      exercises: [
        { name: 'Elevação Lateral', sets: '3x15', video: '💪', muscle: 'Ombros' },
        { name: 'Elevação Frontal', sets: '3x12', video: '💪', muscle: 'Ombros' },
        { name: 'Prancha', sets: '3x45s', video: '🧘', muscle: 'Core' },
        { name: 'Prancha Lateral', sets: '3x30s', video: '🧘', muscle: 'Core' },
      ]
    },
    friday: {
      name: 'Full Body',
      exercises: [
        { name: 'Burpees', sets: '3x10', video: '🔥', muscle: 'Full Body' },
        { name: 'Mountain Climbers', sets: '3x20', video: '🔥', muscle: 'Full Body' },
        { name: 'Agachamento com Salto', sets: '3x12', video: '🦵', muscle: 'Full Body' },
        { name: 'Prancha Dinâmica', sets: '3x15', video: '🧘', muscle: 'Full Body' },
      ]
    }
  };

  // Treinos para academia
  const gymWorkouts: WorkoutPlan = {
    monday: {
      name: 'Peito e Tríceps',
      exercises: [
        { name: 'Supino Reto', sets: '4x10', video: '💪', muscle: 'Peito' },
        { name: 'Supino Inclinado', sets: '4x10', video: '💪', muscle: 'Peito' },
        { name: 'Crucifixo', sets: '3x12', video: '💪', muscle: 'Peito' },
        { name: 'Tríceps Testa', sets: '3x12', video: '💪', muscle: 'Tríceps' },
      ]
    },
    tuesday: {
      name: 'Pernas',
      exercises: [
        { name: 'Agachamento Livre', sets: '4x12', video: '🦵', muscle: 'Pernas' },
        { name: 'Leg Press', sets: '4x15', video: '🦵', muscle: 'Pernas' },
        { name: 'Cadeira Extensora', sets: '3x12', video: '🦵', muscle: 'Quadríceps' },
        { name: 'Cadeira Flexora', sets: '3x12', video: '🦵', muscle: 'Posterior' },
      ]
    },
    wednesday: {
      name: 'Costas e Bíceps',
      exercises: [
        { name: 'Barra Fixa', sets: '4x8', video: '💪', muscle: 'Costas' },
        { name: 'Remada Curvada', sets: '4x10', video: '💪', muscle: 'Costas' },
        { name: 'Puxada Frontal', sets: '3x12', video: '💪', muscle: 'Costas' },
        { name: 'Rosca Direta', sets: '3x12', video: '💪', muscle: 'Bíceps' },
      ]
    },
    thursday: {
      name: 'Ombros e Trapézio',
      exercises: [
        { name: 'Desenvolvimento', sets: '4x10', video: '💪', muscle: 'Ombros' },
        { name: 'Elevação Lateral', sets: '3x15', video: '💪', muscle: 'Ombros' },
        { name: 'Elevação Frontal', sets: '3x12', video: '💪', muscle: 'Ombros' },
        { name: 'Encolhimento', sets: '4x15', video: '💪', muscle: 'Trapézio' },
      ]
    },
    friday: {
      name: 'Pernas e Glúteos',
      exercises: [
        { name: 'Stiff', sets: '4x12', video: '🦵', muscle: 'Posterior' },
        { name: 'Afundo com Barra', sets: '3x12', video: '🦵', muscle: 'Pernas' },
        { name: 'Cadeira Abdutora', sets: '3x15', video: '🦵', muscle: 'Glúteos' },
        { name: 'Panturrilha no Smith', sets: '4x20', video: '🦵', muscle: 'Panturrilha' },
      ]
    }
  };

  return location === 'home' ? homeWorkouts : gymWorkouts;
}

type Meal = {
  meal: string;
  food: string;
  calories: string;
};

export function generateDietPlan(goals: UserGoal): Meal[] {
  const { goal_type, diet_preferences } = goals;
  
  const isVegetarian = diet_preferences?.includes('vegetarian');
  const isLowCost = diet_preferences?.includes('budget');
  const isPractical = diet_preferences?.includes('practical');
  
  // Dieta para emagrecer
  if (goal_type === 'lose') {
    return [
      { meal: 'Café da Manhã', food: isVegetarian ? 'Aveia + Banana + Pasta de amendoim' : 'Ovos mexidos + Aveia + Banana', calories: '400 kcal' },
      { meal: 'Lanche', food: 'Iogurte grego + Frutas vermelhas', calories: '180 kcal' },
      { meal: 'Almoço', food: isVegetarian ? 'Grão de bico + Arroz integral + Brócolis' : 'Frango grelhado + Arroz integral + Brócolis', calories: '550 kcal' },
      { meal: 'Lanche', food: 'Maçã + Castanhas', calories: '200 kcal' },
      { meal: 'Jantar', food: isVegetarian ? 'Tofu grelhado + Batata doce + Salada' : 'Peixe grelhado + Batata doce + Salada', calories: '500 kcal' },
    ];
  }
  
  // Dieta para ganhar massa
  if (goal_type === 'gain') {
    return [
      { meal: 'Café da Manhã', food: isVegetarian ? 'Panqueca de aveia + Pasta de amendoim + Banana' : 'Ovos + Pão integral + Abacate', calories: '550 kcal' },
      { meal: 'Lanche', food: 'Vitamina de whey + Aveia + Banana', calories: '350 kcal' },
      { meal: 'Almoço', food: isVegetarian ? 'Lentilha + Arroz + Batata + Salada' : 'Frango + Arroz + Batata + Salada', calories: '700 kcal' },
      { meal: 'Lanche', food: 'Pasta de amendoim + Pão integral', calories: '300 kcal' },
      { meal: 'Jantar', food: isVegetarian ? 'Grão de bico + Macarrão integral + Legumes' : 'Carne vermelha + Macarrão + Legumes', calories: '650 kcal' },
    ];
  }
  
  // Dieta para manter peso
  return [
    { meal: 'Café da Manhã', food: isVegetarian ? 'Aveia + Frutas + Castanhas' : 'Ovos mexidos + Aveia + Banana', calories: '450 kcal' },
    { meal: 'Lanche', food: 'Iogurte grego + Granola', calories: '200 kcal' },
    { meal: 'Almoço', food: isVegetarian ? 'Feijão + Arroz + Brócolis + Salada' : 'Frango grelhado + Arroz + Brócolis', calories: '600 kcal' },
    { meal: 'Lanche', food: 'Pasta de amendoim + Maçã', calories: '250 kcal' },
    { meal: 'Jantar', food: isVegetarian ? 'Tofu + Batata doce + Salada' : 'Salmão + Batata doce + Salada', calories: '550 kcal' },
  ];
}
