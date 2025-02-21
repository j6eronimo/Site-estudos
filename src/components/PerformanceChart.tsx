import React, { useState } from 'react';
import { BarChart3, CheckCircle2, XCircle, CircleDot, PlusCircle } from 'lucide-react';

interface UserPerformance {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  subjects: {
    [key: string]: {
      total: number;
      correct: number;
      wrong: number;
    }
  }
}

interface DailyPerformance extends UserPerformance {
  date: string;
}

interface PerformanceData {
  [key: string]: {
    today: DailyPerformance;
    total: UserPerformance;
  }
}

interface QuestionFormData {
  subject: string;
  topic: string;
  total: number;
  correct: number;
}

const PerformanceChart: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    'João Pedro': {
      today: {
        date: new Date().toISOString().split('T')[0],
        totalQuestions: 50,
        correctAnswers: 35,
        wrongAnswers: 15,
        subjects: {
          'Língua Portuguesa': { total: 20, correct: 15, wrong: 5 },
          'Matemática': { total: 30, correct: 20, wrong: 10 }
        }
      },
      total: {
        totalQuestions: 200,
        correctAnswers: 150,
        wrongAnswers: 50,
        subjects: {
          'Língua Portuguesa': { total: 80, correct: 60, wrong: 20 },
          'Matemática': { total: 120, correct: 90, wrong: 30 }
        }
      }
    },
    'José Gerônimo': {
      today: {
        date: new Date().toISOString().split('T')[0],
        totalQuestions: 40,
        correctAnswers: 30,
        wrongAnswers: 10,
        subjects: {
          'Língua Portuguesa': { total: 25, correct: 20, wrong: 5 },
          'Matemática': { total: 15, correct: 10, wrong: 5 }
        }
      },
      total: {
        totalQuestions: 180,
        correctAnswers: 140,
        wrongAnswers: 40,
        subjects: {
          'Língua Portuguesa': { total: 100, correct: 80, wrong: 20 },
          'Matemática': { total: 80, correct: 60, wrong: 20 }
        }
      }
    }
  });

  const [showTotal, setShowTotal] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState<QuestionFormData>({
    subject: '',
    topic: '',
    total: 0,
    correct: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'total' || name === 'correct' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (user: string) => (e: React.FormEvent) => {
    e.preventDefault();
    const wrong = formData.total - formData.correct;
    
    setPerformanceData(prev => {
      const userData = { ...prev[user] };
      
      // Update today's data
      userData.today.totalQuestions += formData.total;
      userData.today.correctAnswers += formData.correct;
      userData.today.wrongAnswers += wrong;
      
      if (!userData.today.subjects[formData.subject]) {
        userData.today.subjects[formData.subject] = {
          total: formData.total,
          correct: formData.correct,
          wrong
        };
      } else {
        userData.today.subjects[formData.subject].total += formData.total;
        userData.today.subjects[formData.subject].correct += formData.correct;
        userData.today.subjects[formData.subject].wrong += wrong;
      }

      // Update total data
      userData.total.totalQuestions += formData.total;
      userData.total.correctAnswers += formData.correct;
      userData.total.wrongAnswers += wrong;

      if (!userData.total.subjects[formData.subject]) {
        userData.total.subjects[formData.subject] = {
          total: formData.total,
          correct: formData.correct,
          wrong
        };
      } else {
        userData.total.subjects[formData.subject].total += formData.total;
        userData.total.subjects[formData.subject].correct += formData.correct;
        userData.total.subjects[formData.subject].wrong += wrong;
      }

      return {
        ...prev,
        [user]: userData
      };
    });

    // Reset form
    setFormData({
      subject: '',
      topic: '',
      total: 0,
      correct: 0
    });
    setShowForm(prev => ({ ...prev, [user]: false }));
  };

  const renderPerformanceData = (user: string, data: UserPerformance) => {
    const currentUser = localStorage.getItem('user');
    const isCurrentUser = currentUser === user;

    return (
      <div key={user} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{user}</h3>
          </div>
          {isCurrentUser && (
            <button
              onClick={() => setShowForm(prev => ({ ...prev, [user]: true }))}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Registrar Questões
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
            <CircleDot className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.totalQuestions}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total</div>
          </div>
          <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.correctAnswers}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Corretas</div>
          </div>
          <div className="bg-red-50 dark:bg-gray-700 p-4 rounded-lg">
            <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.wrongAnswers}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Erradas</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${(data.correctAnswers / data.totalQuestions) * 100}%` }}
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Taxa de Acerto: {((data.correctAnswers / data.totalQuestions) * 100).toFixed(1)}%
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Desempenho por Disciplina
          </h4>
          <div className="space-y-4">
            {Object.entries(data.subjects).map(([subject, stats]) => (
              <div key={subject}>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span>{subject}</span>
                  <span>{((stats.correct / stats.total) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${(stats.correct / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {showForm[user] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Registrar Questões para {user}
              </h3>
              <form onSubmit={handleSubmit(user)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Disciplina
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Assunto
                  </label>
                  <input
                    type="text"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Total de Questões
                  </label>
                  <input
                    type="number"
                    name="total"
                    value={formData.total}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Questões Corretas
                  </label>
                  <input
                    type="number"
                    name="correct"
                    value={formData.correct}
                    onChange={handleInputChange}
                    min="0"
                    max={formData.total}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(prev => ({ ...prev, [user]: false }))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => setShowTotal(!showTotal)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {showTotal ? 'Mostrar Hoje' : 'Mostrar Total'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(performanceData).map(([user, data]) => (
          renderPerformanceData(user, showTotal ? data.total : data.today)
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;