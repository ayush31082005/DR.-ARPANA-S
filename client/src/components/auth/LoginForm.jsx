import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { login } from "../../services/authService";

export default function LoginForm() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setFeedback({ type: "", message: "" });

      const response = await login(form);
      loginUser(response.user, response.token);
      navigate(response.user?.role === "admin" ? "/admin" : "/user-dashboard");
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Login failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mx-auto w-full max-w-xl"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-50/80 via-white to-[#eefddb]/80" />
        <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-lime-200/40 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[#bdf37f]/40 blur-3xl" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-200 bg-lime-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4f8f16]"
          >
            <LogIn size={14} />
            Welcome Back
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Login to your account
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Access your profile, appointments, orders, and health records from
              one place.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.5 }}
            className="mt-8 grid gap-5"
          >
            {feedback.message && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {feedback.message}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-lime-100"
                placeholder="Enter your email"
                type="email"
                name="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-lime-100"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-800"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" className="rounded border-slate-300" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary transition hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-secondary px-5 py-3.5 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(123,234,24,0.24)] transition duration-300 hover:from-secondary hover:to-[#4f8f16]"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </motion.button>

            <p className="text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary transition hover:underline"
              >
                Register
              </Link>
            </p>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}
