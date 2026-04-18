import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ShieldCheck } from "lucide-react";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    alert("OTP sent to email (demo)");
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    alert("OTP Verified (demo)");
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password Reset Successful (demo)");
    setStep(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-teal-50" />

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Reset your password securely using OTP verification
          </p>

          {/* STEP 1: EMAIL */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="mt-6 grid gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <div className="relative mt-2">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="input-base pl-10"
                  />
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary">
                Send OTP
              </button>
            </form>
          )}

          {/* STEP 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="mt-6 grid gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={form.otp}
                  onChange={handleChange}
                  required
                  placeholder="Enter 6 digit OTP"
                  className="input-base"
                />
              </div>

              <button type="submit" className="btn-primary">
                Verify OTP
              </button>
            </form>
          )}

          {/* STEP 3: RESET PASSWORD */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="mt-6 grid gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter new password"
                  className="input-base"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm password"
                  className="input-base"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                <ShieldCheck size={18} />
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}