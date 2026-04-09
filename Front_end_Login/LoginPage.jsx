import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email.value && u.password === password.value);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ ...user, role: 'user' }));
      navigate('/chatbot');
    } else {
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('currentUser', JSON.stringify({ name: 'Guest User', role: 'guest' }));
    navigate('/chatbot');
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col relative overflow-x-hidden">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px] space-y-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center">
              <img src="/img/vinfast_logo.png" alt="VinFast Logo" className="h-12 w-auto" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-headline font-extrabold tracking-tight text-on-background">Welcome Back</h1>
              <p className="text-on-surface-variant font-body text-sm"><br /></p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-10 rounded-xl shadow-[0_12px_32px_-4px_rgba(45,52,53,0.08)]">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="block text-xs font-label font-semibold tracking-wider text-secondary uppercase" htmlFor="email">Email Address</label>
                <input className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-surface-tint focus:border-primary transition-all duration-200" id="email" name="email" placeholder="name@vinfast.com" type="email" required />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-label font-semibold tracking-wider text-secondary uppercase" htmlFor="password">Password</label>
                  <Link className="text-xs font-label text-tertiary font-semibold hover:underline" to="/forgot-password">Forgot password?</Link>
                </div>
                <div className="relative">
                  <input className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-surface-tint focus:border-primary transition-all duration-200" id="password" name="password" placeholder="••••••••" type="password" required />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input className="h-4 w-4 rounded border-outline-variant/20 text-tertiary focus:ring-tertiary/20" id="stay_logged_in" type="checkbox" />
                <label className="text-sm font-body text-on-surface-variant select-none" htmlFor="stay_logged_in">Remember me</label>
              </div>

              <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-headline font-bold tracking-tight text-sm hover:translate-y-[-2px] active:opacity-80 transition-all duration-300 shadow-sm" type="submit">
                Sign In to VINFAST
              </button>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute w-full h-[1px] bg-outline-variant/20"></div>
                <span className="relative px-4 bg-surface-container-lowest text-xs text-outline font-medium uppercase tracking-widest">or</span>
              </div>

              <button 
                onClick={handleGuestLogin}
                className="w-full border border-outline-variant/50 text-on-surface py-3 rounded-lg font-headline font-semibold text-sm hover:bg-surface-container-low transition-all duration-200" 
                type="button">
                Continue as Guest
              </button>
            </form>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm font-body text-on-surface-variant">
              New to VINFAST? 
              <Link className="text-tertiary font-bold hover:underline ml-1" to="/signup" replace>Create an Account</Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 mt-auto border-t border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-body text-outline leading-relaxed uppercase tracking-widest">© 2026 VinFast. All rights reserved. Vietnam’s First Global EV Brand.</p>
        </div>
      </footer>

      {/* Decorative elements */}
      <div className="fixed top-0 right-0 -z-10 w-1/3 h-screen bg-surface-container-low opacity-50"></div>
      <div className="fixed bottom-1/4 left-10 -z-10 flex flex-col gap-2 opacity-20">
        <div className="w-32 h-[1px] bg-outline"></div>
        <div className="w-16 h-[1px] bg-outline"></div>
        <div className="w-24 h-[1px] bg-outline"></div>
      </div>
    </div>
  );
};

export default LoginPage;