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
  Pause,
  Lock,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn, signUp, updateUserPlan, saveUserGoals, getUserGoals, getAllUsers } from "@/lib/auth";
import { generateWorkoutPlan, generateDietPlan } from "@/lib/workout-generator";
import { User as UserType } from "@/lib/supabase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Screen = 
  | "welcome" 
  | "login"
  | "signup"
  | "home" 
  | "workout" 
  | "diet" 
  | "progress" 
  | "premium-form"
  | "premium-upsell"
  | "profile"
  | "admin";

type WorkoutLocation = "home" | "gym" | null;
type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

export default function FitneerApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [workoutLocation, setWorkoutLocation] = useState<WorkoutLocation>(null);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("monday");
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [userGoals, setUserGoals] = useState<any>(null);
  const [workoutPlan, setWorkoutPlan] = useState<any>(null);
  const [dietPlan, setDietPlan] = useState<any>(null);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Admin states
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const isPremium = currentUser?.plan_type === 'pro';

  // Timer effect com som
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          // Som nos últimos 3 segundos
          if (prev <= 3 && prev > 0) {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGWi77eefTRAMUKfj8LZjHAY4ktfyzHksBSR3x/DdkEAKFF606+uoVRQKRp/g8r5sIQUrgs7y2Yk2CBlou+3nn00QDFCn4/C2YxwGOJLX8sx5LAUkd8fw3ZBAC');
            audio.play().catch(() => {});
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      setTimerSeconds(90);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Effect para carregar usuários quando estiver na tela admin
  useEffect(() => {
    if (currentScreen === "admin") {
      loadAllUsers();
    }
  }, [currentScreen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const daysOfWeek = [
    { id: "monday" as DayOfWeek, label: "Segunda", short: "SEG" },
    { id: "tuesday" as DayOfWeek, label: "Terça", short: "TER" },
    { id: "wednesday" as DayOfWeek, label: "Quarta", short: "QUA" },
    { id: "thursday" as DayOfWeek, label: "Quinta", short: "QUI" },
    { id: "friday" as DayOfWeek, label: "Sexta", short: "SEX" },
  ];

  const handleLogin = async () => {
    setError("");
    
    // Verificar se é admin
    if (email === "admin@gmail.com" && password === "V8wF9Df9RtI") {
      setCurrentUser({
        id: "admin",
        email: "admin@gmail.com",
        name: "Administrador",
        plan_type: "pro",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      setCurrentScreen("admin");
      return;
    }

    const { user, error: loginError } = await signIn(email, password);
    
    if (loginError) {
      setError(loginError);
      return;
    }

    setCurrentUser(user);
    
    // Carregar objetivos do usuário
    if (user) {
      const { goals } = await getUserGoals(user.id);
      if (goals) {
        setUserGoals(goals);
        // Gerar planos personalizados
        const workout = generateWorkoutPlan(goals, goals.workout_location[0] as 'home' | 'gym');
        const diet = generateDietPlan(goals);
        setWorkoutPlan(workout);
        setDietPlan(diet);
      }
    }
    
    setCurrentScreen("home");
  };

  const handleSignup = async () => {
    setError("");
    const { user, error: signupError } = await signUp(email, password, name);
    
    if (signupError) {
      setError(signupError);
      return;
    }

    setCurrentUser(user);
    setCurrentScreen("home");
  };

  const handleSaveGoals = async (goals: any) => {
    if (!currentUser) return;
    
    await saveUserGoals(currentUser.id, goals);
    setUserGoals(goals);
    
    // Gerar planos personalizados
    const workout = generateWorkoutPlan(goals, goals.workout_location[0] as 'home' | 'gym');
    const diet = generateDietPlan(goals);
    setWorkoutPlan(workout);
    setDietPlan(diet);
    
    setCurrentScreen("home");
  };

  const handleUpgradeToPro = async () => {
    if (!currentUser) return;
    
    await updateUserPlan(currentUser.id, 'pro');
    setCurrentUser({ ...currentUser, plan_type: 'pro' });
    setCurrentScreen("premium-form");
  };

  const loadAllUsers = async () => {
    const { users } = await getAllUsers();
    setAllUsers(users);
  };

  const handleUpdateUserPlan = async (userId: string, newPlan: 'normal' | 'pro') => {
    await updateUserPlan(userId, newPlan);
    loadAllUsers();
  };

  // Tela de Boas-vindas
  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-black via-red-950 to-black">
        <div className="text-center space-y-8 max-w-md">
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-red-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <Dumbbell className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white">Fitneer</h1>
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
              onClick={() => setCurrentScreen("signup")}
              variant="outline"
              className="w-full h-14 text-lg bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
            >
              Criar Conta Gratuita
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

  // Tela de Login
  if (currentScreen === "login") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-950 to-black">
        <Card className="w-full max-w-md p-8 space-y-6 bg-gray-900 border-gray-800">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Bem-vindo de volta!</h2>
            <p className="text-gray-400">Entre para continuar seu progresso</p>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Email</Label>
              <Input 
                type="email" 
                placeholder="seu@email.com" 
                className="bg-gray-800 border-gray-700 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Senha</Label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="bg-gray-800 border-gray-700 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleLogin}
              className="w-full h-12 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
            >
              Entrar
            </Button>
            <Button 
              onClick={() => setCurrentScreen("signup")}
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
            >
              Criar conta gratuita
            </Button>
            <Button 
              onClick={() => setCurrentScreen("welcome")}
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
            >
              Voltar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Tela de Cadastro
  if (currentScreen === "signup") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-950 to-black">
        <Card className="w-full max-w-md p-8 space-y-6 bg-gray-900 border-gray-800">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Criar Conta</h2>
            <p className="text-gray-400">Comece sua jornada fitness</p>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Nome</Label>
              <Input 
                type="text" 
                placeholder="Seu nome" 
                className="bg-gray-800 border-gray-700 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Email</Label>
              <Input 
                type="email" 
                placeholder="seu@email.com" 
                className="bg-gray-800 border-gray-700 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Senha</Label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="bg-gray-800 border-gray-700 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleSignup}
              className="w-full h-12 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
            >
              Criar Conta
            </Button>
            <Button 
              onClick={() => setCurrentScreen("login")}
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
            >
              Já tenho conta
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Painel Admin
  if (currentScreen === "admin") {
    const filteredUsers = allUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen pb-20 bg-black">
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Painel Administrativo</h1>
              <p className="text-gray-200 text-sm">Gerenciar usuários e planos</p>
            </div>
            <Button
              onClick={() => {
                setCurrentUser(null);
                setCurrentScreen("welcome");
              }}
              variant="ghost"
              className="text-white"
            >
              Sair
            </Button>
          </div>

          <Input
            type="text"
            placeholder="Buscar por nome ou email..."
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="p-6 space-y-4">
          <div className="text-white mb-4">
            <p className="text-sm text-gray-400">Total de usuários: {allUsers.length}</p>
          </div>

          {filteredUsers.map((user) => (
            <Card key={user.id} className="p-4 bg-gray-900 border-gray-800">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-white">{user.name}</h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Label className="text-gray-300 text-sm">Plano:</Label>
                  <Select
                    value={user.plan_type}
                    onValueChange={(value) => handleUpdateUserPlan(user.id, value as 'normal' | 'pro')}
                  >
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Badge className={user.plan_type === 'pro' ? 'bg-red-600' : 'bg-gray-600'}>
                    {user.plan_type === 'pro' ? 'PRO' : 'GRATUITO'}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Nenhum usuário encontrado
            </div>
          )}
        </div>
      </div>
    );
  }

  // Tela de Perfil
  if (currentScreen === "profile") {
    return (
      <div className="min-h-screen pb-20 bg-black">
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6">
          <Button 
            variant="ghost" 
            className="text-white mb-4"
            onClick={() => setCurrentScreen("home")}
          >
            ← Voltar
          </Button>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{currentUser?.name || "Usuário"}</h1>
              <p className="text-gray-200">{currentUser?.email}</p>
            </div>
            <Badge className={isPremium ? 'bg-yellow-500 text-black' : 'bg-gray-600'}>
              {isPremium ? '👑 PLANO PRO' : 'PLANO GRATUITO'}
            </Badge>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {!isPremium && (
            <Card className="p-6 bg-gradient-to-r from-red-600 to-red-800 border-0">
              <div className="flex items-start gap-4">
                <Crown className="w-8 h-8 text-white flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">
                    Upgrade para Pro
                  </h3>
                  <p className="text-gray-200 text-sm mb-3">
                    Desbloqueie treinos e dietas personalizados
                  </p>
                  <Button 
                    onClick={() => setCurrentScreen("premium-upsell")}
                    className="bg-white text-red-600 hover:bg-gray-100"
                  >
                    Ver Planos
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {isPremium && userGoals && (
            <Button
              onClick={() => setCurrentScreen("premium-form")}
              className="w-full h-12 bg-gray-900 border border-gray-800 text-white hover:bg-gray-800"
            >
              <Settings className="w-5 h-5 mr-2" />
              Atualizar Objetivos
            </Button>
          )}

          <Button
            onClick={() => {
              setCurrentUser(null);
              setUserGoals(null);
              setWorkoutPlan(null);
              setDietPlan(null);
              setCurrentScreen("welcome");
            }}
            variant="outline"
            className="w-full h-12 bg-gray-900 border-gray-800 text-white hover:bg-gray-800"
          >
            Sair da Conta
          </Button>
        </div>
      </div>
    );
  }

  // Resto do código continua igual...
  // (Incluindo telas: home, workout, diet, progress, premium-upsell, premium-form)
  
  return <div>Carregando...</div>;
}
