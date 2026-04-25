import { supabase } from "../supabaseClient";
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  UserPlus,
  Wallet,
  Mail,
  Lock,
  User,
  ShieldCheck,
  TrendingUp,
  PieChart,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Check your email for confirmation!");

    reset();
  };
  const onError = (errors) => console.log(errors);

  const inputCls =
    "w-full rounded-xl py-3 text-sm text-slate-200 placeholder:text-slate-500 bg-[#0f172a]/80 border border-slate-700/60 focus:outline-none focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/15 hover:border-slate-600 transition-all duration-200";

  return (
    <>
      <style>{`
        @keyframes blob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-20px) scale(1.08); }
          66%      { transform: translate(-20px,25px) scale(0.95); }
        }
        @keyframes blob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-25px,20px) scale(1.06); }
          66%      { transform: translate(20px,-30px) scale(0.96); }
        }
        .animate-blob1 { animation: blob1 9s ease-in-out infinite; will-change: transform; }
        .animate-blob2 { animation: blob2 11s ease-in-out infinite; will-change: transform; }
        .feature-card {
          transition: transform 0.22s ease, background 0.22s ease,
                      border-color 0.22s ease, box-shadow 0.22s ease;
          will-change: transform;
        }
        .feature-card:hover {
          transform: translateX(6px);
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(59,130,246,0.28) !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }
      `}</style>

      <div className="min-h-screen flex relative overflow-hidden bg-[#0d1321]">
        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col w-[44%] relative overflow-hidden bg-gradient-to-br from-[#0f1a2e] via-[#0d1729] to-[#091220] p-10">
          <div className="animate-blob1 absolute -top-24 -left-20 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
          <div className="animate-blob2 absolute -bottom-20 -right-16 w-[350px] h-[350px] rounded-full bg-blue-800/15 blur-[90px] pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.022] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3 mb-auto">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <Wallet size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              ExpenseFlow
            </span>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col gap-6 flex-1 justify-center py-8">
            <div>
              <h2 className="text-[34px] font-bold text-white leading-tight mb-2">
                Take control of your{" "}
                <span className="text-blue-400">finances</span>
              </h2>
              <p className="text-slate-400 text-[13px] leading-relaxed mb-3">
                Track expenses, manage budgets, and gain insights into your
                spending habits — all in one place.
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5">
                <Sparkles size={12} className="text-blue-400" />
                <span className="text-blue-300 text-xs font-medium">
                  Free forever. No credit card required.
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                {
                  icon: <TrendingUp size={15} className="text-green-400" />,
                  bg: "bg-green-500/15",
                  title: "Smart Analytics",
                  desc: "Visual insights into your spending patterns",
                },
                {
                  icon: <PieChart size={15} className="text-blue-400" />,
                  bg: "bg-blue-500/15",
                  title: "Budget Tracking",
                  desc: "Set limits and stay on top of your goals",
                },
                {
                  icon: <ShieldCheck size={15} className="text-purple-400" />,
                  bg: "bg-purple-500/15",
                  title: "Secure & Private",
                  desc: "Your data is always safe and encrypted",
                },
              ].map(({ icon, bg, title, desc }) => (
                <div
                  key={title}
                  className="feature-card flex items-center gap-4 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3.5 cursor-default"
                >
                  <div
                    className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center shrink-0`}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="text-slate-200 text-sm font-semibold">
                      {title}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-5 pt-4 border-t border-white/[0.05]">
            {["No hidden fees", "Cancel anytime", "256-bit encrypted"].map(
              (t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-blue-400 shrink-0" />
                  <span className="text-slate-500 text-[11px]">{t}</span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-slate-700/40 to-transparent" />

        {/* RIGHT PANEL */}
        <div className="flex-1 flex items-center justify-center px-6 py-10 relative">
          <div className="absolute top-0 right-0 w-[380px] h-[380px] rounded-full bg-blue-900/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-slate-800/20 blur-[80px] pointer-events-none" />

          <div className="w-full max-w-[420px] relative z-10">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Wallet size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">ExpenseFlow</span>
            </div>

            {/* Form card */}
            <div className="bg-gradient-to-b from-[#1a2234]/95 to-[#141c2e]/95 border border-slate-700/40 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-sm">
              <div className="h-[3px] bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />
              <div className="px-7 pt-6 pb-7">
                <div className="mb-5">
                  <h1 className="text-[22px] font-bold text-white tracking-tight mb-1">
                    Create Account
                  </h1>
                  <p className="text-slate-500 text-[13px]">
                    Join us today and start tracking your expenses
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit, onError)}
                  className="flex flex-col gap-3.5"
                >
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="name"
                      className="text-slate-400 text-[12px] font-medium select-none"
                    >
                      Full Name
                    </label>
                    <div className="relative group">
                      <User
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none"
                      />
                      <input
                        type="text"
                        id="name"
                        {...register("name", {
                          required: "Full Name is Required",
                        })}
                        placeholder="Enter your full name"
                        className={`${inputCls} pl-10 pr-4`}
                      />
                    </div>
                    {errors?.name && (
                      <p className="text-red-400 text-[11px] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-red-400 inline-block shrink-0" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-slate-400 text-[12px] font-medium select-none"
                    >
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none"
                      />
                      <input
                        type="email"
                        id="email"
                        {...register("email", {
                          required: "Email is Required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                        placeholder="Enter your email"
                        className={`${inputCls} pl-10 pr-4`}
                      />
                    </div>
                    {errors?.email && (
                      <p className="text-red-400 text-[11px] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-red-400 inline-block shrink-0" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="password"
                      className="text-slate-400 text-[12px] font-medium select-none"
                    >
                      Password
                    </label>
                    <div className="relative group">
                      <Lock
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        {...register("password", {
                          required: "Password is Required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        placeholder="Create a strong password"
                        className={`${inputCls} pl-10 pr-11`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? (
                          <Eye size={15} />
                        ) : (
                          <EyeOff size={15} />
                        )}
                      </button>
                    </div>
                    {errors?.password && (
                      <p className="text-red-400 text-[11px] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-red-400 inline-block shrink-0" />
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="confirmPassword"
                      className="text-slate-400 text-[12px] font-medium select-none"
                    >
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <Lock
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none"
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        {...register("confirmPassword", {
                          required: "Confirm Password is Required",
                          validate: (value) =>
                            value === getValues().password ||
                            "Passwords do not match",
                        })}
                        placeholder="Re-enter your password"
                        className={`${inputCls} pl-10 pr-11`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <Eye size={15} />
                        ) : (
                          <EyeOff size={15} />
                        )}
                      </button>
                    </div>
                    {errors?.confirmPassword && (
                      <p className="text-red-400 text-[11px] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-red-400 inline-block shrink-0" />
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-1">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 text-sm rounded-xl shadow-[0_4px_18px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.58)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                      <UserPlus size={15} />
                      Create Account
                    </button>
                    <button
                      type="button"
                      onClick={() => reset()}
                      className="px-5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 border border-slate-700/50 font-medium py-3 text-sm rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </form>

                <div className="flex items-center gap-3 mt-5 mb-3">
                  <div className="flex-1 h-px bg-slate-700/40" />
                  <span className="text-slate-600 text-xs">
                    Already have an account?
                  </span>
                  <div className="flex-1 h-px bg-slate-700/40" />
                </div>

                <Link
                  to="/login"
                  className="block w-full text-center py-2.5 text-blue-400 hover:text-blue-300 font-medium text-sm rounded-xl border border-blue-800/40 hover:border-blue-600/50 hover:bg-blue-900/10 transition-all duration-200"
                >
                  Sign in to your account →
                </Link>

                <p className="text-center text-slate-700 text-[11px] mt-4 leading-relaxed">
                  By signing up, you agree to our{" "}
                  <span className="text-slate-500 hover:text-slate-400 cursor-pointer transition-colors">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-slate-500 hover:text-slate-400 cursor-pointer transition-colors">
                    Privacy Policy
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
