import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    setUser: (user: string | null) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    const handleLogin = (user: string) => {
        localStorage.setItem("user", user);
        setUser(user); // Atualiza o estado global do usuário
        navigate("/");
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(user);
            navigate("/");
        }
        setIsChecking(false);
    }, [navigate, setUser]);

    if (isChecking) {
        return null; // Evita exibir a tela de login enquanto verifica o usuário
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Bem-vindo ao PM-AL Estudos</h1>
                <div className="space-y-4">
                    <button 
                        onClick={() => handleLogin("João Pedro")} 
                        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        João Pedro
                    </button>
                    <button 
                        onClick={() => handleLogin("José Gerônimo")} 
                        className="w-full py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                    >
                        José Gerônimo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;