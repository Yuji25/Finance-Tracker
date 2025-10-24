import { useState } from "react";
import API from "../utils/api.js";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const { data } = await API.post(endpoint, { email, password });
      localStorage.setItem("token", data.token);
      toast.success(isLogin ? "Logged in!" : "Account created!");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4 font-semibold">
        {isLogin ? "Login" : "Signup"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-gray-100 p-6 rounded-xl w-80"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>
      <p
        className="text-sm mt-4 cursor-pointer text-blue-600"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "New user? Signup" : "Already have an account? Login"}
      </p>
    </div>
  );
}
