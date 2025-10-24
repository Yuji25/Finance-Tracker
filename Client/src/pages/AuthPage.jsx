import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api.js";
import toast from "react-hot-toast";
import Container from "../components/Container.jsx";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const { data } = await API.post(endpoint, { email, password });
  localStorage.setItem("token", data.token);
  toast.success(isLogin ? "Logged in!" : "Account created!");
  // Use client-side navigation to prevent hard refresh (avoids 404 on Vercel for SPA routes)
  navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Container className="py-12">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="heading text-4xl">Welcome back</h1>
          <p className="text-ink-600 mt-2">Sign in to continue tracking your finances or create a new account.</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card w-full max-w-md mx-auto"
        >
          <div className="flex gap-2 mb-4 bg-ink-100 p-1 rounded-xl">
            <button type="button" onClick={() => setIsLogin(true)} className={`flex-1 py-2 rounded-lg text-sm ${isLogin ? 'bg-white shadow-soft' : 'text-ink-600'}`}>Login</button>
            <button type="button" onClick={() => setIsLogin(false)} className={`flex-1 py-2 rounded-lg text-sm ${!isLogin ? 'bg-white shadow-soft' : 'text-ink-600'}`}>Sign up</button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-ink-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-ink-300 focus:border-brand-500 focus:ring-brand-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-ink-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-ink-300 focus:border-brand-500 focus:ring-brand-500"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full mt-2">{isLogin ? 'Login' : 'Create account'}</button>
          </div>
          <p className="text-sm text-ink-600 mt-4 text-center">
            {isLogin ? 'New user? ' : 'Already have an account? '}
            <button type="button" className="text-brand-700 font-medium" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </motion.form>
      </div>
    </Container>
  );
}
