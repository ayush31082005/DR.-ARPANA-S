export default function ForgotPasswordForm() {
  return (
    <form className="surface grid gap-4 p-6">
      <h2 className="text-2xl font-bold text-slate-900">Forgot Password</h2>
      <input className="input-base" placeholder="Enter your email" />
      <button type="submit" className="btn-primary">Send Reset Link</button>
    </form>
  );
}
