"use client";

import { useState } from "react";
import { Award, CheckCircle2, Circle, Calendar, Flame, Trophy } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: "health" | "reading" | "gratitude" | "productivity";
  daysTotal: number;
  daysCompleted: number;
  startDate: string;
  active: boolean;
}

export default function ChallengesSection() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "30 Dias de Exercícios",
      description: "Pratique pelo menos 30 minutos de exercícios físicos por dia",
      category: "health",
      daysTotal: 30,
      daysCompleted: 12,
      startDate: new Date().toISOString().split("T")[0],
      active: true
    },
    {
      id: "2",
      title: "Leitura Diária",
      description: "Leia pelo menos 20 páginas de um livro todos os dias",
      category: "reading",
      daysTotal: 21,
      daysCompleted: 8,
      startDate: new Date().toISOString().split("T")[0],
      active: true
    },
    {
      id: "3",
      title: "Diário de Gratidão",
      description: "Escreva 3 coisas pelas quais você é grato todos os dias",
      category: "gratitude",
      daysTotal: 14,
      daysCompleted: 14,
      startDate: new Date().toISOString().split("T")[0],
      active: false
    }
  ]);

  const categoryConfig = {
    health: { 
      label: "Saúde", 
      color: "from-green-500 to-emerald-600",
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400"
    },
    reading: { 
      label: "Leitura", 
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400"
    },
    gratitude: { 
      label: "Gratidão", 
      color: "from-pink-500 to-rose-600",
      bg: "bg-pink-100 dark:bg-pink-900/30",
      text: "text-pink-700 dark:text-pink-400"
    },
    productivity: { 
      label: "Produtividade", 
      color: "from-purple-500 to-violet-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-700 dark:text-purple-400"
    }
  };

  const availableChallenges = [
    {
      title: "Meditação Matinal",
      description: "Medite por 10 minutos todas as manhãs",
      category: "health" as const,
      days: 21
    },
    {
      title: "Sem Redes Sociais",
      description: "Fique 7 dias sem acessar redes sociais",
      category: "productivity" as const,
      days: 7
    },
    {
      title: "Aprender Algo Novo",
      description: "Dedique 1 hora por dia para aprender uma nova habilidade",
      category: "productivity" as const,
      days: 30
    }
  ];

  const markDayComplete = (id: string) => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id === id && challenge.daysCompleted < challenge.daysTotal) {
        const newCompleted = challenge.daysCompleted + 1;
        return {
          ...challenge,
          daysCompleted: newCompleted,
          active: newCompleted < challenge.daysTotal
        };
      }
      return challenge;
    }));
  };

  const startChallenge = (challengeData: typeof availableChallenges[0]) => {
    const newChallenge: Challenge = {
      id: Date.now().toString(),
      title: challengeData.title,
      description: challengeData.description,
      category: challengeData.category,
      daysTotal: challengeData.days,
      daysCompleted: 0,
      startDate: new Date().toISOString().split("T")[0],
      active: true
    };
    setChallenges([...challenges, newChallenge]);
  };

  const activeChallenges = challenges.filter(c => c.active);
  const completedChallenges = challenges.filter(c => !c.active);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Desafios Semanais</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Participe de desafios que incentivam práticas saudáveis</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Sequência Atual</p>
              <p className="text-3xl font-bold mt-1">7 dias</p>
            </div>
            <Flame className="w-12 h-12 text-orange-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Desafios Ativos</p>
              <p className="text-3xl font-bold mt-1">{activeChallenges.length}</p>
            </div>
            <Award className="w-12 h-12 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Concluídos</p>
              <p className="text-3xl font-bold mt-1">{completedChallenges.length}</p>
            </div>
            <Trophy className="w-12 h-12 text-yellow-200" />
          </div>
        </div>
      </div>

      {/* Active Challenges */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Desafios Ativos</h3>
        <div className="space-y-4">
          {activeChallenges.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Nenhum desafio ativo</h3>
              <p className="text-gray-600 dark:text-gray-400">Escolha um desafio abaixo para começar</p>
            </div>
          ) : (
            activeChallenges.map((challenge) => {
              const config = categoryConfig[challenge.category];
              const progress = (challenge.daysCompleted / challenge.daysTotal) * 100;
              
              return (
                <div
                  key={challenge.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
                          {config.label}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {challenge.daysCompleted}/{challenge.daysTotal} dias
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{challenge.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{challenge.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`bg-gradient-to-r ${config.color} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <button
                      onClick={() => markDayComplete(challenge.id)}
                      disabled={challenge.daysCompleted >= challenge.daysTotal}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        challenge.daysCompleted >= challenge.daysTotal
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                          : `bg-gradient-to-r ${config.color} text-white hover:shadow-lg hover:scale-105`
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Marcar Dia Como Completo
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Available Challenges */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Novos Desafios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableChallenges.map((challenge, index) => {
            const config = categoryConfig[challenge.category];
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center mb-4`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
                  {challenge.days} dias
                </span>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-3">{challenge.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{challenge.description}</p>
                <button
                  onClick={() => startChallenge(challenge)}
                  className={`w-full mt-4 px-4 py-2 bg-gradient-to-r ${config.color} text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105`}
                >
                  Começar Desafio
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Challenges */}
      {completedChallenges.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Desafios Concluídos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedChallenges.map((challenge) => {
              const config = categoryConfig[challenge.category];
              return (
                <div
                  key={challenge.id}
                  className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800"
                >
                  <div className="flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{challenge.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.daysTotal} dias completos!</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
