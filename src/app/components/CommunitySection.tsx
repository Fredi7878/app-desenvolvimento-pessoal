"use client";

import { Users, MessageCircle, ThumbsUp, Share2, TrendingUp } from "lucide-react";

interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  category: string;
}

export default function CommunitySection() {
  const posts: Post[] = [
    {
      id: "1",
      author: "Maria Silva",
      avatar: "MS",
      time: "2 horas atrás",
      content: "Acabei de completar meu primeiro desafio de 30 dias! A sensação de conquista é incrível. Obrigada a todos pelo apoio! 🎉",
      likes: 24,
      comments: 8,
      category: "Conquista"
    },
    {
      id: "2",
      author: "João Santos",
      avatar: "JS",
      time: "5 horas atrás",
      content: "Alguém tem dicas para manter a consistência na meditação matinal? Estou tendo dificuldades para acordar mais cedo.",
      likes: 12,
      comments: 15,
      category: "Dúvida"
    },
    {
      id: "3",
      author: "Ana Costa",
      avatar: "AC",
      time: "1 dia atrás",
      content: "Compartilhando minha rotina matinal que mudou minha vida: 6h acordar, 6:15 meditação, 6:30 exercícios, 7h café saudável. Simples e eficaz!",
      likes: 45,
      comments: 22,
      category: "Dica"
    }
  ];

  const trendingTopics = [
    { name: "Meditação", posts: 234 },
    { name: "Produtividade", posts: 189 },
    { name: "Exercícios", posts: 156 },
    { name: "Leitura", posts: 142 },
    { name: "Gratidão", posts: 98 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Comunidade</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Conecte-se, compartilhe e inspire-se com outros membros</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Create Post */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                VC
              </div>
              <input
                type="text"
                placeholder="Compartilhe sua jornada..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm">
                <Share2 className="w-4 h-4" />
                Publicar
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{post.author}</h4>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                      {post.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{post.time}</p>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors ml-auto">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Compartilhar</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Community Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Comunidade</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Membros Ativos</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">12.5k</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Posts Hoje</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Novos Membros</span>
                <span className="font-semibold text-green-600 dark:text-green-400">+89</span>
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Tópicos em Alta</h3>
            </div>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-400">#{index + 1}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{topic.name}</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{topic.posts} posts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Groups */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Grupos Sugeridos</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Meditação Diária</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">2.3k membros</p>
                </div>
                <button className="px-3 py-1 text-xs font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Entrar
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Leitores Ávidos</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">1.8k membros</p>
                </div>
                <button className="px-3 py-1 text-xs font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
