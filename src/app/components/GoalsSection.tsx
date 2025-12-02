"use client";

import { useState } from "react";
import { Plus, Target, CheckCircle2, Circle, Calendar, TrendingUp, Trash2 } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  type: "short" | "long";
  progress: number;
  deadline: string;
  completed: boolean;
}

export default function GoalsSection() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Ler 12 livros este ano",
      description: "Desenvolver o hábito de leitura diária",
      type: "long",
      progress: 25,
      deadline: "2024-12-31",
      completed: false
    },
    {
      id: "2",
      title: "Meditar por 30 dias seguidos",
      description: "Criar uma rotina de meditação matinal",
      type: "short",
      progress: 60,
      deadline: "2024-02-15",
      completed: false
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: "",
    description: "",
    type: "short",
    progress: 0,
    deadline: "",
    completed: false
  });

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description || "",
        type: newGoal.type || "short",
        progress: 0,
        deadline: newGoal.deadline,
        completed: false
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: "",
        description: "",
        type: "short",
        progress: 0,
        deadline: "",
        completed: false
      });
      setIsAdding(false);
    }
  };

  const updateProgress = (id: string, progress: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, progress, completed: progress === 100 } : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Metas e Objetivos</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Defina e acompanhe suas metas de curto e longo prazo</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Nova Meta</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Metas Ativas</p>
              <p className="text-3xl font-bold mt-1">{activeGoals.length}</p>
            </div>
            <Target className="w-12 h-12 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Concluídas</p>
              <p className="text-3xl font-bold mt-1">{completedGoals.length}</p>
            </div>
            <CheckCircle2 className="w-12 h-12 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Progresso Médio</p>
              <p className="text-3xl font-bold mt-1">
                {activeGoals.length > 0 
                  ? Math.round(activeGoals.reduce((acc, g) => acc + g.progress, 0) / activeGoals.length)
                  : 0}%
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Add Goal Form */}
      {isAdding && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Nova Meta</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título da Meta
              </label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="Ex: Aprender um novo idioma"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição
              </label>
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                placeholder="Descreva sua meta..."
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo
                </label>
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as "short" | "long" })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="short">Curto Prazo</option>
                  <option value="long">Longo Prazo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prazo Final
                </label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddGoal}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Adicionar Meta
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Goals */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Metas Ativas</h3>
        <div className="space-y-4">
          {activeGoals.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Nenhuma meta ativa</h3>
              <p className="text-gray-600 dark:text-gray-400">Comece definindo suas primeiras metas</p>
            </div>
          ) : (
            activeGoals.map((goal) => (
              <div
                key={goal.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        goal.type === "short" 
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      }`}>
                        {goal.type === "short" ? "Curto Prazo" : "Longo Prazo"}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{goal.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{goal.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Prazo: {new Date(goal.deadline).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progresso</span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={goal.progress}
                    onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Metas Concluídas</h3>
          <div className="space-y-4">
            {completedGoals.map((goal) => (
              <div
                key={goal.id}
                className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{goal.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{goal.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
