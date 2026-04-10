import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import bgHero from './assets/bg.png';   // Gambar Otak Biru (Atas)
import bgAuth from './assets/bghp.png'; // Gambar Otak (Bawah)

function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLogin]);

  const scrollToAuth = () => {
    document.getElementById('auth').scrollIntoView({ behavior: 'smooth' });
  };

  // FUNGSI LOGIN
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    // Di sini nanti bisa pasang logic CRUD/Auth beneran
    // Untuk sekarang, kita langsung arahkan ke dashboard
    navigate('/dashboard');
  };

  return (
    <div className="bg-[#020617] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">

      {/* ══════ SECTION 1: HERO ══════ */}
      <section className="relative w-full h-screen flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={bgHero} alt="Hero Background" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-end p-8 md:p-16 pb-24">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-cyan-400 font-extrabold italic text-xl tracking-wider">Mind Guard</h2>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Sistem Deteksi <br /> Dini Gejala <br /> <span>Burnout .</span>
            </h1>
          </div>
        </div>

        <button onClick={scrollToAuth} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-60 hover:opacity-100 transition-opacity">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m7 13 5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </button>
      </section>

      {/* ══════ SECTION 2: AUTH (LOGIN & SIGN UP) ══════ */}
      <section id="auth" className="w-full h-screen flex overflow-hidden">
        
        {/* --- SISI KIRI: Gambar & Teks --- */}
        <div className="hidden md:block md:w-[45%] h-full relative flex-shrink-0">
          <img src={bgAuth} alt="Visual Auth" className="w-full h-full object-cover" />
          
          <div className="absolute bottom-12 left-12 z-20">
            {isLogin ? (
              /* Teks Original Login */
              <h2 className="text-3xl md:text-4xl font-black italic leading-tight text-white drop-shadow-lg">
                Hello Rizka,<br />Welcome Back!
              </h2>
            ) : (
              /* Teks Sign Up Sesuai Gambar 2 */
              <div className="space-y-1">
                <h2 className="text-cyan-400 font-extrabold italic text-xl tracking-wider">Mind Guard</h2>
                <h1 className="text-white text-3xl font-bold leading-tight">
                  Sistem Deteksi <br /> Dini Gejala Burnout .
                </h1>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020d1a]/80 via-transparent to-transparent"></div>
        </div>

        {/* --- SISI KANAN: Form --- */}
        <div className="flex-1 h-full flex flex-col items-center justify-center bg-[#0a1f35] relative px-6 py-10">
          
          {/* Dot texture background */}
          <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none">
            <svg width="100%" height="100%"><defs><pattern id="dotPattern" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" /></pattern></defs><rect width="100%" height="100%" fill="url(#dotPattern)" /></svg>
          </div>

          {/* Form Card */}
          <div
            ref={addToRefs}
            className={`w-full max-w-[420px] z-10 bg-white p-10 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.3)] opacity-0 translate-y-10 transition-all duration-700 
            ${isLogin ? 'rounded-2xl' : 'rounded-2xl'}`} // Radius dikurangi agar tidak terlalu melengkung
          >
            <h3 className="text-2xl font-black text-[#0d2137] italic mb-8 tracking-tight">
              {isLogin ? 'Your account' : 'Create account'}
            </h3>

            <div className="space-y-4">
              {/* Fullname (Hanya Sign Up) */}
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Enter Fullname..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-500 placeholder:text-slate-400 transition-all"
                />
              )}

              {/* Email */}
              <input
                type="email"
                placeholder="Enter Email..."
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-500 placeholder:text-slate-400 transition-all"
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-500 placeholder:text-slate-400 pr-12 transition-all"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {/* Logika ganti ikon di sini */}
                  {showPassword ? <EyeOpen /> : <EyeClosed />}
                </button>
              </div>

              {/* Confirm Password */}
              {!isLogin && (
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-500 placeholder:text-slate-400 pr-12 transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {/* Gunakan state confirm password */}
                    {showConfirmPassword ? <EyeOpen /> : <EyeClosed />}
                  </button>
                </div>
              )}

              {isLogin && (
                <div className="text-right -mt-1">
                  <a href="#" className="text-xs text-slate-400 hover:text-blue-600 font-medium">Forgot my Password</a>
                </div>
              )}

              {/* Main Button */}
              <button className="w-full bg-[#0d2137] hover:bg-[#162e4a] text-white font-bold py-3.5 rounded-lg shadow-md transition-all active:scale-[0.98] mt-2">
                {isLogin ? 'LOGIN' : 'Sign up'}
              </button>

              {/* Google Login (Login Only) */}
              {isLogin && (
                <>
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-slate-100"></div>
                    <span className="mx-3 text-slate-300 text-[10px] uppercase font-bold tracking-wider">Or</span>
                    <div className="flex-grow border-t border-slate-100"></div>
                  </div>
                  <button className="w-full border border-slate-200 py-3 rounded-lg flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                    Sign in with Google
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Switch Link */}
          <div ref={addToRefs} className="mt-8 text-center z-10 opacity-0 translate-y-10 transition-all duration-700 delay-300">
            <p className="text-white/70 text-sm">
              {isLogin ? "You Don't have an account? " : 'Already have an account? '}
              <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-400 font-bold hover:underline transition-colors">
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Icons Sesuai Versi Login & Sign Up
const EyeOpen = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const EyeClosed = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
);
const EyeIconSmall = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>
);

export default App;