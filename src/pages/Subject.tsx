import React, { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Video, FileText, Brain } from 'lucide-react';

interface ContentSection {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'summary' | 'exercise';
  description: string;
  url?: string;
  createdAt: Date;
}

const Subject: React.FC = () => {
  const { subject } = useParams();
  const [contents, setContents] = useState<ContentSection[]>([
    {
      id: '1',
      title: 'Apostila Completa',
      type: 'pdf',
      description: 'Material completo com todo o conteúdo da disciplina',
      url: '#',
      createdAt: new Date('2024-03-10'),
    },
    {
      id: '2',
      title: 'Videoaula - Introdução',
      type: 'video',
      description: 'Aula introdutória sobre os conceitos básicos',
      url: '#',
      createdAt: new Date('2024-03-11'),
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    type: 'pdf' as ContentSection['type'],
    description: '',
    file: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        file: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Simulando o upload do arquivo e criação de URL
    const fakeUrl = URL.createObjectURL(formData.file!);

    const newContent: ContentSection = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      description: formData.description,
      url: fakeUrl,
      createdAt: new Date(),
    };

    setContents((prev) => [newContent, ...prev]);

    // Limpar formulário
    setFormData({
      title: '',
      type: 'pdf',
      description: '',
      file: null,
    });

    // Resetar input de arquivo
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'video':
        return <Video className="h-6 w-6 text-blue-500" />;
      case 'summary':
        return <BookOpen className="h-6 w-6 text-green-500" />;
      case 'exercise':
        return <Brain className="h-6 w-6 text-purple-500" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {subject}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore o material completo desta disciplina e prepare-se
          adequadamente para sua aprovação.
        </p>
      </div>

      <div className="mt-12 bg-blue-50 dark:bg-gray-700 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Adicionar Novo Conteúdo
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tipo de Conteúdo
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="pdf">PDF</option>
              <option value="video">Vídeo</option>
              <option value="summary">Resumo</option>
              <option value="exercise">Exercícios</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Arquivo
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                dark:file:bg-gray-800 dark:file:text-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Enviar Conteúdo
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contents.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start space-x-4">
              {getIcon(item.type)}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Acessar conteúdo
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.createdAt.toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subject;
