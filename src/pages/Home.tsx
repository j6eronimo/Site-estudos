import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Users, Timer, BarChart } from 'lucide-react';
import PerformanceChart from '../components/PerformanceChart';

const Home: React.FC = () => {
  const subjects = [
    "LÃ­ngua Portuguesa",
    "NoÃ§Ãµes de InformÃ¡tica",
    "LegislaÃ§Ã£o Pertinente ao Policial Militar de Alagoas",
    "MatemÃ¡tica",
    "CiÃªncias Sociais",
    "NoÃ§Ãµes de Direito Administrativo",
    "NoÃ§Ãµes de Direito Constitucional",
    "NoÃ§Ãµes de Processo Penal",
    "NoÃ§Ãµes de Direitos Humanos"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Sua aprovaÃ§Ã£o na PM-AL comeÃ§a aqui
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Prepare-se de forma eficiente com materiais exclusivos e metodologia comprovada
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
          ComeÃ§ar Agora
        </button>
      </div>

      {/* Performance Dashboard */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          AnÃ¡lise de Desempenho
        </h2>
        <PerformanceChart />
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Material Completo</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Apostilas, videoaulas e resumos atualizados para todas as disciplinas
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Brain className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Simulados Personalizados</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Monte seus prÃ³prios simulados e acompanhe seu desempenho
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Comunidade Ativa</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Interaja com outros candidatos e tire suas dÃºvidas
          </p>
        </div>
      </div>

      {/* Subjects Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Disciplinas DisponÃ­veis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject, index) => (
            <Link
              key={index}
              to={`/disciplina/${encodeURIComponent(subject)}`}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{subject}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Study Tools Section */}
      <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Ferramentas de Estudo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <Timer className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                CronÃ´metro Pomodoro
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Otimize seu tempo de estudo com a tÃ©cnica Pomodoro
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <BarChart className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                AnÃ¡lise de Desempenho
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Acompanhe seu progresso com grÃ¡ficos detalhados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;