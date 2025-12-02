"use client";

import { BookOpen, Video, Headphones, ExternalLink, Clock, Star } from "lucide-react";

interface Content {
  id: string;
  type: "article" | "video" | "podcast";
  title: string;
  description: string;
  category: string;
  duration: string;
  rating: number;
  thumbnail: string;
}

export default function ContentSection() {
  const contents: Content[] = [
    {
      id: "1",
      type: "article",
      title: "10 Hábitos Matinais de Pessoas Altamente Produtivas",
      description: "Descubra como começar seu dia da melhor forma possível e aumentar sua produtividade.",
      category: "Produtividade",
      duration: "8 min",
      rating: 4.8,
      thumbnail: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      id: "2",
      type: "video",
      title: "Meditação Guiada para Iniciantes",
      description: "Aprenda técnicas básicas de meditação para reduzir o estresse e aumentar o foco.",
      category: "Mindfulness",
      duration: "15 min",
      rating: 4.9,
      thumbnail: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      id: "3",
      type: "podcast",
      title: "Como Desenvolver Inteligência Emocional",
      description: "Entrevista com especialistas sobre o desenvolvimento de habilidades emocionais.",
      category: "Desenvolvimento",
      duration: "45 min",
      rating: 4.7,
      thumbnail: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      id: "4",
      type: "article",
      title: "Gestão do Tempo: Técnica Pomodoro",
      description: "Aprenda a usar a técnica Pomodoro para maximizar sua produtividade.",
      category: "Produtividade",
      duration: "6 min",
      rating: 4.6,
      thumbnail: "bg-gradient-to-br from-orange-400 to-orange-600"
    },
    {
      id: "5",
      type: "video",
      title: "Exercícios de Respiração para Ansiedade",
      description: "Técnicas simples de respiração que você pode usar em qualquer lugar.",
      category: "Saúde Mental",
      duration: "10 min",
      rating: 4.9,
      thumbnail: "bg-gradient-to-br from-cyan-400 to-cyan-600"
    },
    {
      id: "6",
      type: "podcast",
      title: "Construindo Relacionamentos Saudáveis",
      description: "Dicas práticas para melhorar seus relacionamentos pessoais e profissionais.",
      category: "Relacionamentos",
      duration: "38 min",
      rating: 4.8,
      thumbnail: "bg-gradient-to-br from-pink-400 to-pink-600"
    }
  ];

  const categories = [
    "Todos",
    "Produtividade",
    "Mindfulness",
    "Saúde Mental",
    "Relacionamentos",
    "Desenvolvimento"
  ];

  const typeIcons = {
    article: BookOpen,
    video: Video,
    podcast: Headphones
  };

  const typeLabels = {
    article: "Artigo",
    video: "Vídeo",
    podcast: "Podcast"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Conteúdos Educativos</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Artigos, vídeos e podcasts sobre desenvolvimento pessoal</p>
      </div>

      {/* Category Filter */}
      <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Content */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
              Destaque da Semana
            </span>
            <h3 className="text-2xl font-bold mt-4 mb-2">
              Transforme Sua Vida em 30 Dias
            </h3>
            <p className="text-purple-100 mb-4">
              Um guia completo para criar hábitos duradouros e alcançar seus objetivos de desenvolvimento pessoal.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Video className="w-4 h-4" />
                <span>Série de Vídeos</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>5 episódios</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span>4.9</span>
              </div>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
          Começar Agora
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((content) => {
          const Icon = typeIcons[content.type];
          return (
            <div
              key={content.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <div className={`h-40 ${content.thumbnail} flex items-center justify-center`}>
                <Icon className="w-12 h-12 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                    {content.category}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {typeLabels[content.type]}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                  {content.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {content.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{content.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">{content.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popular Topics */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Tópicos Populares</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl text-center">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Produtividade</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">156 conteúdos</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl text-center">
            <Video className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Mindfulness</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">89 conteúdos</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl text-center">
            <Headphones className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Saúde Mental</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">124 conteúdos</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl text-center">
            <Star className="w-8 h-8 text-pink-600 dark:text-pink-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Relacionamentos</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">67 conteúdos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
