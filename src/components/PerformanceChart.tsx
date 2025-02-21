import React, { useState, useEffect } from 'react';
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

const NOTION_API_KEY = "sua-api-key-aqui";
const DATABASE_ID = "seu-database-id-aqui";

const PerformanceChart: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({});
  const [showTotal, setShowTotal] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState({
    disciplina: '',
    assunto: '',
    total: '',
    corretas: ''
  });

  useEffect(() => {
    fetchNotionData();
  }, []);

  async function fetchNotionData() {
    try {
      const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();

      const formattedData: PerformanceData = {};

      data.results.forEach((entry: any) => {
        const user = entry.properties.Usuário.select.name;
        const subject = entry.properties.Matéria.title[0]?.text.content || "Outros";
        const total = entry.properties["Questões Totais"].number;
        const correct = entry.properties["Acertos"].number;
        const wrong = total - correct;
        const date = entry.properties.Data.date.start;

        if (!formattedData[user]) {
          formattedData[user] = {
            today: { date, totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, subjects: {} },
            total: { totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, subjects: {} }
          };
        }

        formattedData[user].total.totalQuestions += total;
        formattedData[user].total.correctAnswers += correct;
        formattedData[user].total.wrongAnswers += wrong;

        if (!formattedData[user].total.subjects[subject]) {
          formattedData[user].total.subjects[subject] = { total: 0, correct: 0, wrong: 0 };
        }
        formattedData[user].total.subjects[subject].total += total;
        formattedData[user].total.subjects[subject].correct += correct;
        formattedData[user].total.subjects[subject].wrong += wrong;

        if (date === new Date().toISOString().split('T')[0]) {
          formattedData[user].today.totalQuestions += total;
          formattedData[user].today.correctAnswers += correct;
          formattedData[user].today.wrongAnswers += wrong;
          if (!formattedData[user].today.subjects[subject]) {
            formattedData[user].today.subjects[subject] = { total: 0, correct: 0, wrong: 0 };
          }
          formattedData[user].today.subjects[subject].total += total;
          formattedData[user].today.subjects[subject].correct += correct;
          formattedData[user].today.subjects[subject].wrong += wrong;
        }
      });

      setPerformanceData(formattedData);
    } catch (error) {
      console.error("Erro ao buscar dados do Notion:", error);
    }
  }

  const renderPerformanceData = (user: string, data: UserPerformance) => (
    <div key={user} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{user}</h3>
        </div>
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
    </div>
  );

  return (
    <div>
      <div className="flex justify-end mb-4">
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