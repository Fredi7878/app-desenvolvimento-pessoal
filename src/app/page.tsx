"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard,
  User,
  ListChecks,
  Calendar,
  TrendingUp,
  Settings,
  LogOut,
  Flame,
  Zap,
  Target,
  CheckCircle2,
  Clock,
  MessageSquare,
  Plus
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import AuthProvider from "@/components/AuthProvider";

type MenuType = "dashboard" | "perfil" | "habitos" | "calendario" | "progresso" | "configuracoes";

interface Habit {
  id: string;
  title: string;
  description: string;
  xp: number;
  user_id: string;
}

interface HabitCompletion {
  habit_id: string;
  completed_at: string;
}

interface Profile {
  id: string;
  username: string | null;
  level: number;
  xp: number;
  streak: number;
  best_streak: number;
}

function HomePage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<MenuType>("dashboard");
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }));
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      // Carregar ou criar perfil
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Perfil não existe, criar um novo
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              username: user.email?.split('@')[0] || 'Usuário',
              level: 1,
              xp: 0,
              streak: 0,
              best_streak: 0
            }
          ])
          .select()
          .single();

        if (createError) {
          console.error('Erro ao criar perfil:', createError);
        } else {
          profileData = newProfile;
        }
      }

      setProfile(profileData);

      // Carregar hábitos
      const { data: habitsData, error: habitsError } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (habitsError) {
        console.error('Erro ao carregar hábitos:', habitsError);
      } else {
        setHabits(habitsData || []);
      }

      // Carregar completamentos de hoje
      const today = new Date().toISOString().split('T')[0];
      const { data: completionsData, error: completionsError } = await supabase
        .from('habit_completions')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed_at', today);

      if (completionsError) {
        console.error('Erro ao carregar completamentos:', completionsError);
      } else {
        setCompletions(completionsData || []);
      }

      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setLoading(false);
    }
  };

  const toggleHabit = async (habitId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];
      const isCompleted = completions.some(c => c.habit_id === habitId);

      if (isCompleted) {
        // Remover completamento
        const { error } = await supabase
          .from('habit_completions')
          .delete()
          .eq('habit_id', habitId)
          .eq('completed_at', today);

        if (error) {
          console.error('Erro ao remover completamento:', error);
        } else {
          setCompletions(completions.filter(c => c.habit_id !== habitId));
          
          // Atualizar XP do perfil
          const habit = habits.find(h => h.id === habitId);
          if (habit && profile) {
            const newXp = Math.max(0, profile.xp - habit.xp);
            await supabase
              .from('profiles')
              .update({ xp: newXp })
              .eq('id', user.id);
            setProfile({ ...profile, xp: newXp });
          }
        }
      } else {
        // Adicionar completamento
        const { error } = await supabase
          .from('habit_completions')
          .insert([
            {
              habit_id: habitId,
              user_id: user.id,
              completed_at: today
            }
          ]);

        if (error) {
          console.error('Erro ao adicionar completamento:', error);
        } else {
          setCompletions([...completions, { habit_id: habitId, completed_at: today }]);
          
          // Atualizar XP do perfil
          const habit = habits.find(h => h.id === habitId);
          if (habit && profile) {
            const newXp = profile.xp + habit.xp;
            const newLevel = Math.floor(newXp / 1000) + 1;
            await supabase
              .from('profiles')
              .update({ xp: newXp, level: newLevel })
              .eq('id', user.id);
            setProfile({ ...profile, xp: newXp, level: newLevel });
          }
        }
      }
    } catch (error) {
      console.error('Erro ao alternar hábito:', error);
    }
  };

  const addHabit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('habits')
        .insert([
          {
            user_id: user.id,
            title: 'Novo Hábito',
            description: 'Descrição do hábito',
            xp: 10
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar hábito:', error);
      } else {
        setHabits([data, ...habits]);
      }
    } catch (error) {
      console.error('Erro ao adicionar hábito:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin">
          <Zap className="w-8 h-8 text-green-500" />
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: "dashboard" as MenuType, label: "Dashboard", icon: LayoutDashboard },
    { id: "perfil" as MenuType, label: "Perfil", icon: User },
    { id: "habitos" as MenuType, label: "Hábitos", icon: ListChecks },
    { id: "calendario" as MenuType, label: "Calendário", icon: Calendar },
    { id: "progresso" as MenuType, label: "Progresso", icon: TrendingUp },
    { id: "configuracoes" as MenuType, label: "Configurações", icon: Settings },
  ];

  const completedToday = completions.length;
  const totalHabits = habits.length;
  const progressPercent = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;
  const xpToday = habits
    .filter(h => completions.some(c => c.habit_id === h.id))
    .reduce((sum, h) => sum + h.xp, 0);

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-2xl font-bold text-white">ElevarHabitos</h1>
          <p className="text-sm text-zinc-500 mt-1">Construa sua rotina</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-green-500 text-black font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <User className="w-5 h-5 text-black" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{profile?.username || 'Usuário'}</p>
              <p className="text-xs text-zinc-500">{profile?.streak || 0} dias ativo</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-zinc-900 border-b border-zinc-800 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Dashboard</h2>
              <p className="text-sm text-zinc-500 mt-1">Acompanhe seu progresso diário</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-zinc-800 rounded-lg border border-zinc-700">
                <p className="text-xs text-zinc-500">Hoje</p>
                <p className="text-sm font-semibold text-white">
                  {currentDate || "Carregando..."}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Nível */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Nível</p>
                    <p className="text-2xl font-bold text-white">{profile?.level || 1}</p>
                  </div>
                </div>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${((profile?.xp || 0) % 1000) / 10}%` }}
                ></div>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                {(profile?.xp || 0) % 1000}/1000 XP para próximo nível
              </p>
            </div>

            {/* Streak */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Sequência</p>
                    <p className="text-2xl font-bold text-white">{profile?.streak || 0} dias</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-400">Melhor sequência: {profile?.best_streak || 0} dias</p>
            </div>

            {/* XP */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">XP Total</p>
                    <p className="text-2xl font-bold text-white">{profile?.xp || 0}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-400">+{xpToday} XP hoje</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hábitos */}
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Hábitos</h3>
                <button 
                  onClick={addHabit}
                  className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Criar hábito
                </button>
              </div>
              
              <div className="space-y-3">
                {habits.length === 0 ? (
                  <p className="text-center text-zinc-500 py-8">
                    Nenhum hábito criado ainda. Clique em "Criar hábito" para começar!
                  </p>
                ) : (
                  habits.map((habit) => {
                    const isCompleted = completions.some(c => c.habit_id === habit.id);
                    return (
                      <div 
                        key={habit.id}
                        className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-all"
                      >
                        <button
                          onClick={() => toggleHabit(habit.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-green-500 border-green-500'
                              : 'border-zinc-600 hover:border-green-500'
                          }`}
                        >
                          {isCompleted && <CheckCircle2 className="w-4 h-4 text-black" />}
                        </button>
                        <div className="flex-1">
                          <p className={`font-semibold ${isCompleted ? 'text-zinc-500 line-through' : 'text-white'}`}>
                            {habit.title}
                          </p>
                          <p className="text-sm text-zinc-500">{habit.description}</p>
                        </div>
                        <div className="text-sm text-zinc-400">
                          +{habit.xp} XP
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="space-y-6">
              {/* Progresso Hoje */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold text-white">Progresso Hoje</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Hábitos concluídos</span>
                    <span className="text-white font-semibold">{completedToday}/{totalHabits}</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all" 
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Metas */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-white">Metas</h3>
                </div>
                <p className="text-sm text-zinc-500">Nenhuma meta definida</p>
              </div>

              {/* Hoje */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <h3 className="font-semibold text-white">Hoje</h3>
                </div>
                <p className="text-sm text-zinc-500">Sem atividades agendadas</p>
              </div>

              {/* Reflexões */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-white">Reflexões</h3>
                </div>
                <p className="text-sm text-zinc-500">Nenhuma reflexão registrada</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
}
