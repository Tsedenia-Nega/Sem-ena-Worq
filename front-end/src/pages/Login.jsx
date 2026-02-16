import { Link,useNavigate } from "react-router-dom";
import React,{useState} from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "./../assets/Logo.PNG"; 
import Hexagons from "./../components/Hexagons";
import api from "../api/axios";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin =async(e)=>{
    e.preventDefault();
    setLoading(true);
    setError("");
    try{
      const response = await api.post("/login",{
        email,
        password
      },{
        withCredentials:true
      });
      if (response.data.token){localStorage.setItem("token",response.data.token);
        localStorage.setItem("user",JSON.stringify(response.data.user));
        navigate("/admin");
      }
    }catch(err){
      setError("Invalid email or password. please try again.");
      
    }finally{
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      <Link to="/" className="fixed top-5 left-9 z-50">
        <img
          src={logo}
          alt="Logo"
          className="w-16 h-16 cursor-pointer hover:opacity-80 transition-opacity"
        />
      </Link>
      <Hexagons />
      <div className="flex flex-col md:flex-row items-center w-full md:w-4/5 lg:w-3/4 xl:w-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="hidden md:block md:w-1/2"></div>
        <div className="w-full md:w-1/2 bg-yellow-700 p-12 rounded-lg">
          <h2 className="text-4xl font-bold text-white text-center mb-8">
            Login
          </h2>
          {error && (
            <div className="bg-red-200 text-red-800 p-3 rounded-lg mb-6 text-center text-sm font-bold">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                className="block text-white font-bold mb-2"
                htmlFor="username"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  className="appearance-none border-none rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none bg-yellow-600 peer"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <FaUser className="text-white mx-3 absolute right-0 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-white font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="appearance-none border-none rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none bg-yellow-600"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FaLock className="text-white mx-3 absolute right-0 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <Link
                to="/forgot-password text-xs font-bold text-black hover:underline"
                href="#"
              >
                Forgot password?
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-white hover:text-yellow-700 text-lg text-yellow-500 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                {loading ? "Verifying..." : "Login "}
              </button>
            </div>
            <div className="mt-4 text-center">
              {/* <a
                className="text-l text-yellow-400 hover:text-yellow-300"
                href="#"
              >
                Create Account
              </a> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
