import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    login();
    navigate("/admin");
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-200">
    <div className="bg-white p-8 rounded shadow-lg w-96">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Admin Login
      </h1>
      <button 
      onClick={handleLogin}
      className="w-full bg-sky-900 text-white text-xl rounded p-4 hover:bg-rose-800 cursor-pointer">
        Login
      </button>
    </div>
  </div>
  );
};

export default Login;
