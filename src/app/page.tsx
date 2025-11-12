"use client";

import { useState, useEffect } from "react";
import { 
  Dumbbell, 
  Home, 
  Apple, 
  TrendingUp, 
  Crown, 
  Play, 
  Check, 
  ChevronRight,
  Timer,
  Calendar,
  Target,
  Zap,
  Award,
  ShoppingCart,
  RefreshCw,
  User,
  LogIn,
  Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

type Screen = 
  | "welcome" 
  | "login" 
  | "home" 
  | "workout" 
  | "diet" 
  | "progress" 
  | "premium-form"
  | "premium-upsell";

type WorkoutLocation = "home" | "gym" | null;

export default function FitNowApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [isPremium, setIsPremium] = useState(false);
  const [workoutLocation, setWorkoutLocation] = useState<WorkoutLocation>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(90); // 1:30 padrão

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      setTimerSeconds(90); // Reset para 1:30
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Dados de exemplo para treinos
  const workouts = {
    home: [
      { name: "Flexões", sets: "3x12", video: "💪", muscle: "Peito" },
      { name: "Agachamento", sets: "3x15", video: "🦵", muscle: "Pernas" },
      { name: "Prancha", sets: "3x30s", video: "🧘", muscle: "Core" },
      { name: "Burpees", sets: "3x10", video: "🔥", muscle: "Full Body" },
    ],
    gym: [
      { name: "Supino Reto", sets: "4x10", video: "💪", muscle: "Peito" },
      { name: "Agachamento Livre", sets: "4x12", video: "🦵", muscle: "Pernas" },
      { name: "Remada Curvada", sets: "4x10", video: "💪", muscle: "Costas" },
      { name: "Desenvolvimento", sets: "4x10", video: "💪", muscle: "Ombros" },
    ],
  };

  const dietPlan = [
    { meal: "Café da Manhã", food: "Ovos mexidos + Aveia + Banana", calories: "450 kcal" },
    { meal: "Lanche", food: "Iogurte grego + Granola", calories: "200 kcal" },
    { meal: "Almoço", food: "Frango grelhado + Arroz + Brócolis", calories: "600 kcal" },
    { meal: "Lanche", food: "Pasta de amendoim + Maçã", calories: "250 kcal" },
    { meal: "Jantar", food: "Salmão + Batata doce + Salada", calories: "550 kcal" },
  ];

  // Tela de Boas-vindas
  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-black via-red-950 to-black">
        <div className="text-center space-y-8 max-w-md">
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-red-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <Zap className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white">FitNow</h1>
            <p className="text-xl text-gray-300">
              Transforme seu corpo com treinos e dietas personalizadas
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => setCurrentScreen("login")}
              className="w-full h-14 text-lg bg-red-600 text-white hover:bg-red-700 shadow-xl"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Entrar
            </Button>
            <Button 
              onClick={() => setCurrentScreen("home")}
              variant="outline"
              className="w-full h-14 text-lg bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
            >
              Continuar sem login
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Check className="w-4 h-4" />
            <span>Plano gratuito disponível</span>
          </div>
        </div>
      </div>
    );
  }

  // Tela de Login Simples
  if (currentScreen === "login") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-950 to-black">
        <Card className="w-full max-w-md p-8 space-y-6 bg-gray-900 border-gray-800">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Bem-vindo de volta!</h2>
            <p className="text-gray-400">Entre para continuar seu progresso</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Email</Label>
              <Input type="email" placeholder="seu@email.com" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Senha</Label>
              <Input type="password" placeholder="••••••••" className="bg-gray-800 border-gray-700 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => setCurrentScreen("home")}
              className="w-full h-12 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
            >
              Entrar
            </Button>
            <Button 
              onClick={() => setCurrentScreen("home")}
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
            >
              Criar conta gratuita
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Tela Principal (Home)
  if (currentScreen === "home") {
    return (
      <div className="min-h-screen pb-20 bg-black">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 pb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Olá, Atleta! 👋</h1>
              <p className="text-gray-200 text-sm">Pronto para treinar hoje?</p>
            </div>
            <Button
              onClick={() => setCurrentScreen("premium-upsell")}
              className="bg-red-500 text-white hover:bg-red-400"
            >
              <Crown className="w-4 h-4 mr-2" />
              Premium
            </Button>
          </div>

          {/* Streak */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Sequência de 7 dias</p>
                  <p className="text-gray-200 text-sm">Continue assim!</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
          </Card>
        </div>

        {/* Escolha de Local */}
        {!workoutLocation && (
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Onde vai treinar hoje?</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                onClick={() => setWorkoutLocation("home")}
                className="p-6 text-center space-y-3 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-red-600 bg-gray-900"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Em Casa</h3>
                  <p className="text-sm text-gray-400">Treino funcional</p>
                </div>
              </Card>

              <Card 
                onClick={() => setWorkoutLocation("gym")}
                className="p-6 text-center space-y-3 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-red-600 bg-gray-900"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Na Academia</h3>
                  <p className="text-sm text-gray-400">Treino completo</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Treino do Dia */}
        {workoutLocation && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Treino de Hoje</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setWorkoutLocation(null)}
                className="text-gray-400 hover:text-white"
              >
                Trocar local
              </Button>
            </div>

            <Card className="p-6 bg-gradient-to-br from-red-600 to-red-800 text-white border-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">
                    {workoutLocation === "home" ? "Treino em Casa" : "Treino na Academia"}
                  </h3>
                  <p className="text-gray-200">4 exercícios • 30-40 min</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  {workoutLocation === "home" ? (
                    <Home className="w-8 h-8" />
                  ) : (
                    <Dumbbell className="w-8 h-8" />
                  )}
                </div>
              </div>
              <Button 
                onClick={() => setCurrentScreen("workout")}
                className="w-full bg-white text-red-600 hover:bg-gray-100"
              >
                <Play className="w-5 h-5 mr-2" />
                Iniciar Treino
              </Button>
            </Card>

            {/* Dieta do Dia */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">Dieta de Hoje</h2>
              <Card className="p-6 bg-gradient-to-br from-gray-900 to-black text-white border-red-900">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">Plano Alimentar</h3>
                    <p className="text-gray-400">2.050 kcal • 5 refeições</p>
                  </div>
                  <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
                    <Apple className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <Button 
                  onClick={() => setCurrentScreen("diet")}
                  className="w-full bg-red-600 text-white hover:bg-red-700"
                >
                  Ver Dieta Completa
                </Button>
              </Card>
            </div>

            {/* Banner Premium */}
            {!isPremium && (
              <Card className="p-6 bg-gradient-to-r from-red-600 to-red-800 border-0">
                <div className="flex items-start gap-4">
                  <Crown className="w-8 h-8 text-white flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">
                      Desbloqueie seu potencial máximo
                    </h3>
                    <p className="text-gray-200 text-sm mb-3">
                      Treinos e dietas 100% personalizados para você
                    </p>
                    <Button 
                      onClick={() => setCurrentScreen("premium-upsell")}
                      className="bg-white text-red-600 hover:bg-gray-100"
                    >
                      Conhecer Premium
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-6 py-4">
          <div className="flex items-center justify-around max-w-md mx-auto">
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 text-red-600"
              onClick={() => setCurrentScreen("home")}
            >
              <Home className="w-6 h-6 mb-1" />
              <span className="text-xs">Início</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 text-gray-400 hover:text-white"
              onClick={() => setCurrentScreen("workout")}
            >
              <Dumbbell className="w-6 h-6 mb-1" />
              <span className="text-xs">Treino</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 text-gray-400 hover:text-white"
              onClick={() => setCurrentScreen("diet")}
            >
              <Apple className="w-6 h-6 mb-1" />
              <span className="text-xs">Dieta</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-2 text-gray-400 hover:text-white"
              onClick={() => setCurrentScreen("progress")}
            >
              <TrendingUp className="w-6 h-6 mb-1" />
              <span className="text-xs">Progresso</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Tela de Treino
  if (currentScreen === "workout") {
    const currentWorkout = workoutLocation ? workouts[workoutLocation] : workouts.home;
    const exercise = currentWorkout[currentExercise];
    const totalSets = 3;
    const remainingSets = totalSets - completedSets.length;

    return (
      <div className="min-h-screen pb-20 bg-black">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6">
          <Button 
            variant="ghost" 
            className="text-white mb-4"
            onClick={() => setCurrentScreen("home")}
          >
            ← Voltar
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Treino em Andamento</h1>
              <p className="text-gray-200">Exercício {currentExercise + 1} de {currentWorkout.length}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{Math.round((currentExercise / currentWorkout.length) * 100)}%</div>
              <div className="text-sm text-gray-200">Completo</div>
            </div>
          </div>
          <Progress value={(currentExercise / currentWorkout.length) * 100} className="mt-4 h-2" />
        </div>

        {/* Exercício Atual */}
        <div className="p-6 space-y-6">
          <Card className="overflow-hidden bg-gray-900 border-gray-800">
            {/* Vídeo/GIF Placeholder */}
            <div className="bg-gradient-to-br from-gray-950 to-black h-64 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-8xl mb-4">{exercise.video}</div>
                <div className="text-sm bg-red-600/20 px-4 py-2 rounded-full inline-block">
                  Vídeo demonstrativo
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <Badge className="mb-2 bg-red-600">{exercise.muscle}</Badge>
                <h2 className="text-2xl font-bold text-white">{exercise.name}</h2>
                <p className="text-3xl font-bold text-red-600 mt-2">{exercise.sets}</p>
              </div>

              {/* Timer e Controle */}
              <div className="space-y-2">
                <Card className="p-4 bg-gray-800 border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Timer className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-white">Cronômetro de Descanso</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{formatTime(timerSeconds)}</span>
                  </div>
                  <Button
                    onClick={() => {
                      if (isTimerRunning) {
                        setIsTimerRunning(false);
                      } else {
                        setIsTimerRunning(true);
                      }
                    }}
                    className={`w-full h-12 ${
                      isTimerRunning 
                        ? "bg-gray-700 hover:bg-gray-600 text-white" 
                        : "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white"
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Iniciar Cronômetro
                      </>
                    )}
                  </Button>
                </Card>

                {/* Indicador de Séries Restantes */}
                <Card className="p-4 bg-gradient-to-r from-red-950 to-black border-red-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Séries Restantes</p>
                      <p className="text-3xl font-bold text-white">{remainingSets}</p>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((set) => (
                        <div
                          key={set}
                          className={`w-3 h-3 rounded-full ${
                            completedSets.includes(set) 
                              ? "bg-red-600" 
                              : "bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Controle de Séries */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-300">Marcar Série Completa</Label>
                <div className="flex gap-2">
                  {[1, 2, 3].map((set) => (
                    <Button
                      key={set}
                      variant={completedSets.includes(set) ? "default" : "outline"}
                      className={`flex-1 h-12 ${
                        completedSets.includes(set) 
                          ? "bg-red-600 hover:bg-red-700 text-white" 
                          : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                      }`}
                      onClick={() => {
                        if (completedSets.includes(set)) {
                          setCompletedSets(completedSets.filter(s => s !== set));
                        } else {
                          setCompletedSets([...completedSets, set]);
                        }
                      }}
                    >
                      {completedSets.includes(set) && <Check className="w-5 h-5 mr-2" />}
                      Série {set}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Botões de Navegação */}
              <div className="flex gap-3 pt-4">
                {currentExercise > 0 && (
                  <Button
                    variant="outline"
                    className="flex-1 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    onClick={() => {
                      setCurrentExercise(currentExercise - 1);
                      setCompletedSets([]);
                      setIsTimerRunning(false);
                      setTimerSeconds(90);
                    }}
                  >
                    Anterior
                  </Button>
                )}
                {currentExercise < currentWorkout.length - 1 ? (
                  <Button
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                    onClick={() => {
                      setCurrentExercise(currentExercise + 1);
                      setCompletedSets([]);
                      setIsTimerRunning(false);
                      setTimerSeconds(90);
                    }}
                  >
                    Próximo Exercício
                  </Button>
                ) : (
                  <Button
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                    onClick={() => {
                      setCurrentScreen("home");
                      setCurrentExercise(0);
                      setCompletedSets([]);
                      setIsTimerRunning(false);
                      setTimerSeconds(90);
                    }}
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Finalizar Treino
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Lista de Exercícios */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Próximos Exercícios</h3>
            <div className="space-y-2">
              {currentWorkout.map((ex, idx) => (
                <Card 
                  key={idx}
                  className={`p-4 ${idx === currentExercise ? "border-2 border-red-600 bg-red-950" : "bg-gray-900 border-gray-800"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{ex.video}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{ex.name}</h4>
                      <p className="text-sm text-gray-400">{ex.sets}</p>
                    </div>
                    {idx < currentExercise && (
                      <Check className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de Dieta
  if (currentScreen === "diet") {
    return (
      <div className="min-h-screen pb-20 bg-black">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6">
          <Button 
            variant="ghost" 
            className="text-white mb-4"
            onClick={() => setCurrentScreen("home")}
          >
            ← Voltar
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Plano Alimentar</h1>
              <p className="text-gray-200">Segunda-feira</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">2.050</div>
              <div className="text-sm text-gray-200">kcal/dia</div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Refeições */}
          <div className="space-y-3">
            {dietPlan.map((meal, idx) => (
              <Card key={idx} className="p-4 bg-gray-900 border-gray-800">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-white">{meal.meal}</h3>
                    <p className="text-gray-400 mt-1">{meal.food}</p>
                  </div>
                  <Badge variant="secondary" className="bg-red-600 text-white">{meal.calories}</Badge>
                </div>
                {isPremium && (
                  <Button variant="ghost" size="sm" className="mt-2 text-red-600 hover:text-red-500">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Substituir alimento
                  </Button>
                )}
              </Card>
            ))}
          </div>

          {/* Lista de Compras */}
          {isPremium ? (
            <Card className="p-6 bg-gradient-to-br from-red-600 to-red-800 text-white border-0">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="w-6 h-6" />
                <h3 className="text-xl font-bold">Lista de Compras</h3>
              </div>
              <p className="text-gray-200 mb-4">
                Lista semanal gerada automaticamente com base no seu plano
              </p>
              <Button className="w-full bg-white text-red-600 hover:bg-gray-100">
                Ver Lista Completa
              </Button>
            </Card>
          ) : (
            <Card className="p-6 bg-gradient-to-r from-red-600 to-red-800 border-0">
              <div className="flex items-start gap-4">
                <Crown className="w-8 h-8 text-white flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">
                    Desbloqueie substituições e lista de compras
                  </h3>
                  <p className="text-gray-200 text-sm mb-3">
                    Personalize sua dieta e tenha lista automática
                  </p>
                  <Button 
                    onClick={() => setCurrentScreen("premium-upsell")}
                    className="bg-white text-red-600 hover:bg-gray-100"
                  >
                    Assinar Premium
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Macros */}
          <Card className="p-6 bg-gray-900 border-gray-800">
            <h3 className="font-semibold mb-4 text-white">Distribuição de Macros</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Proteínas</span>
                  <span className="text-sm text-gray-400">150g (30%)</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Carboidratos</span>
                  <span className="text-sm text-gray-400">250g (50%)</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Gorduras</span>
                  <span className="text-sm text-gray-400">45g (20%)</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Tela de Progresso
  if (currentScreen === "progress") {
    return (
      <div className="min-h-screen pb-20 bg-black">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6">
          <Button 
            variant="ghost" 
            className="text-white mb-4"
            onClick={() => setCurrentScreen("home")}
          >
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold">Seu Progresso</h1>
          <p className="text-gray-200">Acompanhe sua evolução</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center bg-gray-900 border-gray-800">
              <div className="text-3xl font-bold text-red-600">28</div>
              <div className="text-sm text-gray-400 mt-1">Treinos completos</div>
            </Card>
            <Card className="p-4 text-center bg-gray-900 border-gray-800">
              <div className="text-3xl font-bold text-red-600">7</div>
              <div className="text-sm text-gray-400 mt-1">Dias seguidos</div>
            </Card>
            <Card className="p-4 text-center bg-gray-900 border-gray-800">
              <div className="text-3xl font-bold text-red-600">-3kg</div>
              <div className="text-sm text-gray-400 mt-1">Peso perdido</div>
            </Card>
            <Card className="p-4 text-center bg-gray-900 border-gray-800">
              <div className="text-3xl font-bold text-red-600">42h</div>
              <div className="text-sm text-gray-400 mt-1">Tempo total</div>
            </Card>
          </div>

          {/* Gráfico de Peso */}
          <Card className="p-6 bg-gray-900 border-gray-800">
            <h3 className="font-semibold mb-4 text-white">Evolução de Peso</h3>
            <div className="h-48 bg-gradient-to-t from-red-950 to-transparent rounded-lg flex items-end justify-around p-4">
              {[75, 74, 73.5, 73, 72.5, 72, 71.5].map((weight, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-8 bg-gradient-to-t from-red-600 to-red-800 rounded-t"
                    style={{ height: `${(weight / 75) * 100}%` }}
                  />
                  <span className="text-xs text-gray-400">S{idx + 1}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Histórico de Treinos */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Histórico Recente</h3>
            <div className="space-y-2">
              {[
                { date: "Hoje", workout: "Treino em Casa", duration: "35 min" },
                { date: "Ontem", workout: "Treino na Academia", duration: "45 min" },
                { date: "2 dias atrás", workout: "Treino em Casa", duration: "30 min" },
              ].map((item, idx) => (
                <Card key={idx} className="p-4 bg-gray-900 border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{item.workout}</h4>
                        <p className="text-sm text-gray-400">{item.date}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-red-600 text-white">{item.duration}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Premium Upsell */}
          {!isPremium && (
            <Card className="p-6 bg-gradient-to-r from-red-600 to-red-800 border-0">
              <div className="flex items-start gap-4">
                <Crown className="w-8 h-8 text-white flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">
                    Acompanhe medidas e fotos de progresso
                  </h3>
                  <p className="text-gray-200 text-sm mb-3">
                    Registre peso, medidas corporais e compare fotos
                  </p>
                  <Button 
                    onClick={() => setCurrentScreen("premium-upsell")}
                    className="bg-white text-red-600 hover:bg-gray-100"
                  >
                    Desbloquear Premium
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Tela de Upsell Premium
  if (currentScreen === "premium-upsell") {
    return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white p-6 pb-12">
          <Button 
            variant="ghost" 
            className="text-white mb-4"
            onClick={() => setCurrentScreen("home")}
          >
            ← Voltar
          </Button>
          <div className="text-center space-y-2">
            <Crown className="w-16 h-16 mx-auto" />
            <h1 className="text-3xl font-bold">FitNow Premium</h1>
            <p className="text-gray-200">
              Transforme seu corpo com planos 100% personalizados
            </p>
          </div>
        </div>

        <div className="p-6 -mt-6 space-y-6">
          {/* Planos */}
          <div className="space-y-4">
            <Card className="p-6 border-2 border-red-600 bg-gray-900">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Plano Anual</h3>
                  <p className="text-sm text-gray-400">Economize 40%</p>
                </div>
                <Badge className="bg-red-600 text-white">Melhor valor</Badge>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">R$ 19,90</span>
                  <span className="text-gray-400">/mês</span>
                </div>
                <p className="text-sm text-gray-400">R$ 238,80 cobrado anualmente</p>
              </div>
              <Button 
                onClick={() => {
                  setIsPremium(true);
                  setCurrentScreen("premium-form");
                }}
                className="w-full h-12 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
              >
                Começar Agora
              </Button>
            </Card>

            <Card className="p-6 bg-gray-900 border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Plano Mensal</h3>
                  <p className="text-sm text-gray-400">Cancele quando quiser</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">R$ 32,90</span>
                  <span className="text-gray-400">/mês</span>
                </div>
              </div>
              <Button 
                onClick={() => {
                  setIsPremium(true);
                  setCurrentScreen("premium-form");
                }}
                variant="outline"
                className="w-full h-12 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              >
                Assinar Mensal
              </Button>
            </Card>
          </div>

          {/* Benefícios */}
          <div>
            <h3 className="font-semibold mb-4 text-white">O que você ganha:</h3>
            <div className="space-y-3">
              {[
                "Treinos 100% personalizados para seu objetivo",
                "Dieta adaptada às suas preferências e restrições",
                "Substituições automáticas de alimentos",
                "Lista de compras semanal gerada automaticamente",
                "Acompanhamento completo de progresso",
                "Registro de peso, medidas e fotos",
                "Sem anúncios",
                "Suporte prioritário",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Garantia */}
          <Card className="p-4 bg-red-950 border-red-900">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Garantia de 7 dias</h4>
                <p className="text-sm text-gray-300">
                  Não gostou? Devolvemos 100% do seu dinheiro
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Formulário Premium
  if (currentScreen === "premium-form") {
    return (
      <div className="min-h-screen pb-20 bg-black">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6">
          <Button 
            variant="ghost" 
            className="text-white mb-4"
            onClick={() => setCurrentScreen("home")}
          >
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold">Personalização</h1>
          <p className="text-gray-200">Vamos criar seu plano ideal</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Objetivo */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1 text-white">Qual seu objetivo?</h3>
              <p className="text-sm text-gray-400">Escolha o que melhor descreve sua meta</p>
            </div>
            <RadioGroup defaultValue="lose">
              <div className="space-y-3">
                {[
                  { value: "lose", label: "Emagrecer", icon: "🔥" },
                  { value: "gain", label: "Ganhar massa muscular", icon: "💪" },
                  { value: "maintain", label: "Manter o peso", icon: "⚖️" },
                  { value: "tone", label: "Definir o corpo", icon: "✨" },
                ].map((option) => (
                  <Card key={option.value} className="p-4 cursor-pointer hover:border-red-600 transition-colors bg-gray-900 border-gray-800">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="flex items-center gap-3 cursor-pointer flex-1 text-white">
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                      </Label>
                    </div>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Local de Treino */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1 text-white">Onde vai treinar?</h3>
              <p className="text-sm text-gray-400">Pode escolher mais de uma opção</p>
            </div>
            <div className="space-y-3">
              {[
                { id: "home", label: "Em casa", icon: <Home className="w-5 h-5" /> },
                { id: "gym", label: "Na academia", icon: <Dumbbell className="w-5 h-5" /> },
              ].map((option) => (
                <Card key={option.id} className="p-4 bg-gray-900 border-gray-800">
                  <div className="flex items-center gap-3">
                    <Checkbox id={option.id} />
                    <Label htmlFor={option.id} className="flex items-center gap-3 cursor-pointer flex-1 text-white">
                      {option.icon}
                      <span className="font-medium">{option.label}</span>
                    </Label>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Tempo Disponível */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1 text-white">Tempo disponível por dia</h3>
              <p className="text-sm text-gray-400">Quanto tempo você pode dedicar?</p>
            </div>
            <RadioGroup defaultValue="30-45">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "15-30", label: "15-30 min" },
                  { value: "30-45", label: "30-45 min" },
                  { value: "45-60", label: "45-60 min" },
                  { value: "60+", label: "Mais de 1h" },
                ].map((option) => (
                  <Card key={option.value} className="p-4 cursor-pointer hover:border-red-600 transition-colors bg-gray-900 border-gray-800">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value={option.value} id={`time-${option.value}`} />
                      <Label htmlFor={`time-${option.value}`} className="cursor-pointer font-medium text-white">
                        {option.label}
                      </Label>
                    </div>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Equipamentos */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1 text-white">Equipamentos disponíveis</h3>
              <p className="text-sm text-gray-400">Marque o que você tem acesso</p>
            </div>
            <div className="space-y-3">
              {[
                "Halteres",
                "Barra e anilhas",
                "Elásticos de resistência",
                "Colchonete",
                "Nenhum equipamento",
              ].map((equipment) => (
                <Card key={equipment} className="p-4 bg-gray-900 border-gray-800">
                  <div className="flex items-center gap-3">
                    <Checkbox id={equipment} />
                    <Label htmlFor={equipment} className="cursor-pointer flex-1 text-white">
                      {equipment}
                    </Label>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Preferências Alimentares */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1 text-white">Preferências alimentares</h3>
              <p className="text-sm text-gray-400">Como você prefere se alimentar?</p>
            </div>
            <div className="space-y-3">
              {[
                { id: "vegetarian", label: "Vegetariano/Vegano" },
                { id: "practical", label: "Refeições práticas e rápidas" },
                { id: "budget", label: "Opções de baixo custo" },
                { id: "no-lactose", label: "Sem lactose" },
                { id: "no-gluten", label: "Sem glúten" },
              ].map((pref) => (
                <Card key={pref.id} className="p-4 bg-gray-900 border-gray-800">
                  <div className="flex items-center gap-3">
                    <Checkbox id={pref.id} />
                    <Label htmlFor={pref.id} className="cursor-pointer flex-1 text-white">
                      {pref.label}
                    </Label>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Restrições */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1 text-white">Restrições físicas</h3>
              <p className="text-sm text-gray-400">Opcional - nos ajuda a adaptar os exercícios</p>
            </div>
            <Input 
              placeholder="Ex: problema no joelho, dor nas costas..."
              className="h-12 bg-gray-900 border-gray-800 text-white"
            />
          </div>

          {/* Botão Gerar Plano */}
          <Button 
            onClick={() => setCurrentScreen("home")}
            className="w-full h-14 text-lg bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
          >
            <Zap className="w-5 h-5 mr-2" />
            Gerar Meu Plano Personalizado
          </Button>

          <p className="text-center text-sm text-gray-400">
            Seu plano será gerado em segundos e você pode ajustá-lo a qualquer momento
          </p>
        </div>
      </div>
    );
  }

  return null;
}
