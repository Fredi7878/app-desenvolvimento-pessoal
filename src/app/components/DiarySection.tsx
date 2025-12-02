"use client";

import { useState, useEffect } from "react";
import { Plus, Calendar, Smile, Meh, Frown, Save, Edit2, Trash2 } from "lucide-react";

interface DiaryEntry {
  id: string;
  date: string;
  mood: "happy" | "neutral" | "sad";
  title: string;
  content: string;
}

export default function DiarySection() {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: "1",
      date: new Date().toISOString().split("T")[0],
      mood: "happy",
      title: "Primeiro dia de jornada",
      content: "Hoje decidi começar minha jornada de desenvolvimento pessoal. Estou animado com as possibilidades!"
    }
  ]);
  const [isWriting, setIsWriting] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<DiaryEntry>>({
    date: new Date().toISOString().split("T")[0],
    mood: "happy",
    title: "",
    content: ""
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const moodIcons = {
    happy: { icon: Smile, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    neutral: { icon: Meh, color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
    sad: { icon: Frown, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" }
  };

  const formatDate = (dateString: string) => {
    if (!mounted) return dateString;
    return new Date(dateString).toLocaleDateString("pt-BR", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const handleSave = () => {
    if (currentEntry.title && currentEntry.content) {
      const newEntry: DiaryEntry = {
        id: Date.now().toString(),
        date: currentEntry.date || new Date().toISOString().split("T")[0],
        mood: currentEntry.mood || "happy",
        title: currentEntry.title,
        content: currentEntry.content
      };
      setEntries([newEntry, ...entries]);
      setCurrentEntry({
        date: new Date().toISOString().split("T")[0],
        mood: "happy",
        title: "",
        content: ""
      });
      setIsWriting(false);
    }
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Diário Pessoal</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Registre suas reflexões, conquistas e desafios diários</p>
        </div>
        <button
          onClick={() => setIsWriting(!isWriting)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Nova Entrada</span>
        </button>
      </div>

      {/* Writing Area */}
      {isWriting && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  value={currentEntry.date}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, date: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Como você se sente?
                </label>
                <div className="flex gap-2">
                  {(Object.keys(moodIcons) as Array<keyof typeof moodIcons>).map((mood) => {
                    const MoodIcon = moodIcons[mood].icon;
                    return (
                      <button
                        key={mood}
                        onClick={() => setCurrentEntry({ ...currentEntry, mood })}
                        className={`p-3 rounded-lg transition-all duration-200 ${
                          currentEntry.mood === mood
                            ? `${moodIcons[mood].bg} ${moodIcons[mood].color} scale-110`
                            : "bg-gray-100 dark:bg-gray-700 text-gray-400 hover:scale-105"
                        }`}
                      >
                        <MoodIcon className="w-6 h-6" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título
              </label>
              <input
                type="text"
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                placeholder="Ex: Um dia produtivo"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                O que aconteceu hoje?
              </label>
              <textarea
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                placeholder="Escreva sobre suas reflexões, conquistas e desafios..."
                rows={6}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Save className="w-4 h-4" />
                Salvar Entrada
              </button>
              <button
                onClick={() => setIsWriting(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Nenhuma entrada ainda</h3>
            <p className="text-gray-600 dark:text-gray-400">Comece escrevendo sua primeira reflexão do dia</p>
          </div>
        ) : (
          entries.map((entry) => {
            const MoodIcon = moodIcons[entry.mood].icon;
            return (
              <div
                key={entry.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${moodIcons[entry.mood].bg}`}>
                      <MoodIcon className={`w-5 h-5 ${moodIcons[entry.mood].color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{entry.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(entry.date)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
