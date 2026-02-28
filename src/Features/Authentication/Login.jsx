import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LogIn,
  Wallet,
  Mail,
  Lock,
  ShieldCheck,
  TrendingUp,
  PieChart,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../Supabase-Client";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const state = useSelector((state) => state.auth);
  console.log(state);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.emailAddress,
      password: data.password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Login Successfully");
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
        @keyframes floatUp {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes barGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        .animate-blob1 { animation: blob1 9s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 11s ease-in-out infinite; }
        .animate-float { animation: floatUp 5s ease-in-out infinite; }
        .bar { transform-origin: bottom; animation: barGrow 1s ease-out both; }
        .feature-card {
          transition: transform 0.22s ease, background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }
        .feature-card:hover {
          transform: translateX(6px);
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(59,130,246,0.28) !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }
      `}</style>

      <div className="min-h-screen flex relative overflow-hidden bg-[#0d1321]">
        {/* ══ LEFT PANEL ══ */}
        <div className="hidden lg:flex flex-col w-[44%] relative overflow-hidden bg-gradient-to-br from-[#0f1a2e] via-[#0d1729] to-[#091220] p-10">
          {/* Animated blobs */}
          <div className="animate-blob1 absolute -top-24 -left-20 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
          <div className="animate-blob2 absolute -bottom-20 -right-16 w-[350px] h-[350px] rounded-full bg-blue-800/15 blur-[90px] pointer-events-none" />

          {/* Subtle grid */}
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
            {/* Headline */}
            <div>
              <h2 className="text-[34px] font-bold text-white leading-tight mb-2">
                Welcome <span className="text-blue-400">back</span>
              </h2>
              <p className="text-slate-400 text-[13px] leading-relaxed mb-3">
                Sign in to continue tracking your expenses, managing budgets,
                and staying on top of your finances.
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5">
                <Sparkles size={12} className="text-blue-400" />
                <span className="text-blue-300 text-xs font-medium">
                  Your data is always safe and private.
                </span>
              </div>
            </div>

            {/* Feature cards */}
            <div className="flex flex-col gap-2.5">
              {[
                {
                  icon: <TrendingUp size={15} className="text-green-400" />,
                  bg: "bg-green-500/15",
                  title: "Pick up where you left off",
                  desc: "Your expenses and budgets are always saved automatically",
                },
                {
                  icon: <PieChart size={15} className="text-blue-400" />,
                  bg: "bg-blue-500/15",
                  title: "Everything in one place",
                  desc: "Transactions, budgets, and analytics all in one dashboard",
                },
                {
                  icon: <ShieldCheck size={15} className="text-purple-400" />,
                  bg: "bg-purple-500/15",
                  title: "Your account is protected",
                  desc: "Industry-grade encryption keeps your data safe",
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

            {/* What's waiting for you — 3 bullets only */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5">
              <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider mb-3">
                What's waiting for you
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { dot: "bg-blue-400", text: "Your full transaction history" },
                  {
                    dot: "bg-green-400",
                    text: "Budget progress & spending limits",
                  },
                  {
                    dot: "bg-purple-400",
                    text: "Category-wise expense breakdown",
                  },
                ].map(({ dot, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`}
                    />
                    <span className="text-slate-400 text-[12px]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom trust signals */}
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

        {/* ══ RIGHT PANEL ══ */}
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
                <div className="mb-6">
                  <h1 className="text-[22px] font-bold text-white tracking-tight mb-1">
                    Welcome Back
                  </h1>
                  <p className="text-slate-500 text-[13px]">
                    Login to your account to continue
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit, onError)}
                  className="flex flex-col gap-4"
                >
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
                        })}
                        placeholder="Enter your password"
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

                  {/* Forgot password */}
                  <div className="flex justify-end -mt-1">
                    <Link
                      to="/signup"
                      className="text-blue-400 hover:text-blue-300 text-[12px] font-medium transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Login button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 text-sm rounded-xl shadow-[0_3px_12px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_18px_rgba(37,99,235,0.35)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    <LogIn size={15} />
                    Login
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 mt-5 mb-3">
                  <div className="flex-1 h-px bg-slate-700/40" />
                  <span className="text-slate-600 text-xs">
                    Don't have an account?
                  </span>
                  <div className="flex-1 h-px bg-slate-700/40" />
                </div>

                {/* Signup link */}
                <Link
                  to="/signup"
                  className="block w-full text-center py-2.5 text-blue-400 hover:text-blue-300 font-medium text-sm rounded-xl border border-blue-800/40 hover:border-blue-600/50 hover:bg-blue-900/10 transition-all duration-200"
                >
                  Create an account →
                </Link>

                <p className="text-center text-slate-700 text-[11px] mt-4 leading-relaxed">
                  Protected by industry-standard{" "}
                  <span className="text-slate-500">256-bit encryption</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
