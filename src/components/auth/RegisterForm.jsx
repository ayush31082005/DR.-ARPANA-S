import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <form className="surface grid gap-4 p-6">
      <h2 className="text-2xl font-bold text-slate-900">Register</h2>
      <input className="input-base" placeholder="Full name" />
      <input className="input-base" placeholder="Email address" />
      <input className="input-base" placeholder="Phone number" />
      <input className="input-base" type="password" placeholder="Password" />
      <button type="submit" className="btn-primary">Create Account</button>
      <p className="text-sm text-slate-600">Already have an account? <Link to="/login" className="font-medium text-primary">Login</Link></p>
    </form>
  );
}
