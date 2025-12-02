"use client";

import { BarChart3, TrendingUp, Target, Award, Calendar } from "lucide-react";

export default function AnalyticsSection() {
  const weeklyData = [
    { day: "Seg", diary: 1, goals: 2, challenges: 1 },
    { day: "Ter", diary: 1, goals: 1, challenges: 1 },
    { day: "Qua", diary: 0, goals: 2, challenges: 1 },
    { day: "Qui", diary: 1, goals: 1, challenges: 1 },
    { day: "Sex", diary: 1, goals: 3, challenges: 1 },
    { day: "Sáb", diary: 1, goals: 1, challenges: 0 },
    { day: "Dom", diary: 1, goals: 2, challenges: 1 }
  ];

  const maxValue = Math.max(...weeklyData.map(d => d.diary + d.goals + d.challenges));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Análises e Progresso</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Acompanhe sua evolução e conquistas</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
              +12%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">7</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Dias de Sequência</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
              +25%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Metas Ativas</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
              +8%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Desafios Concluídos</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
              +18%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">42%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Progresso Médio</p>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Atividade Semanal</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Suas atividades nos últimos 7 dias</p>
          </div>
          <BarChart3 className="w-6 h-6 text-gray-400" />
        </div>

        <div className="space-y-4">
          {weeklyData.map((data, index) => {
            const total = data.diary + data.goals + data.challenges;
            const percentage = (total / maxValue) * 100;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300 w-12">{data.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                      <div className="h-full flex">
                        <div
                          className="bg-purple-500 transition-all duration-300"
                          style={{ width: `${(data.diary / total) * percentage}%` }}
                          title={`Diário: ${data.diary}`}
                        />
                        <div
                          className="bg-blue-500 transition-all duration-300"
                          style={{ width: `${(data.goals / total) * percentage}%` }}
                          title={`Metas: ${data.goals}`}
                        />
                        <div
                          className="bg-green-500 transition-all duration-300"
                          style={{ width: `${(data.challenges / total) * percentage}%` }}
                          title={`Desafios: ${data.challenges}`}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100 w-8 text-right">{total}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Diário</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Metas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Desafios</span>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Excelente Progresso!</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Você completou 85% das suas atividades esta semana. Continue assim!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Nova Conquista!</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Você manteve uma sequência de 7 dias. Parabéns pela dedicação!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Resumo do Mês</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">28</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Entradas no Diário</p>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">12</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Metas Criadas</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">5</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Desafios Completos</p>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">92%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Taxa de Conclusão</p>
          </div>
        </div>
      </div>
    </div>
  );
}
