import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser({ name: "Demo User", email: form.email });
    navigate("/profile");
  };

  return (
    <form onSubmit={handleSubmit} className="surface grid gap-4 p-6">
      <h2 className="text-2xl font-bold text-slate-900">Login</h2>
      <input className="input-base" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
      <input className="input-base" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
      <button type="submit" className="btn-primary">Login</button>
      <p className="text-sm text-slate-600">Don't have an account? <Link to="/register" className="font-medium text-primary">Register</Link></p>
    </form>
  );
}
