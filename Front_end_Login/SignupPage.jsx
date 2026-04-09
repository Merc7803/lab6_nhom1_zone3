import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password, terms } = e.target.elements;

    if (!terms.checked) {
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(user => user.email === email.value)) {
      return;
    }

    users.push({ name: name.value, email: email.value, password: password.value });
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };

  return (
    <div className="bg-surface text-on-surface antialiased overflow-x-hidden min-h-screen relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -z-10 transition-all"></div>
      
      <main className="min-h-screen flex items-center justify-center p-6 md:p-12 overflow-hidden">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-24">
          <div className="w-full md:w-[480px] bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-[0_12px_32px_-4px_rgba(45,52,53,0.08)]">
            <header className="mb-10">
              <h2 className="text-3xl font-bold text-on-surface mb-2 tracking-tight">Create Account</h2>
              <p className="text-on-surface-variant text-sm">Join the community of VinFast global EV enthusiasts.</p>
            </header>

            <form className="space-y-6" onSubmit={handleSignup}>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider" htmlFor="name">Full Name</label>
                <div className="relative">
                  <input className="w-full px-4 py-3.5 bg-surface-container-lowest border border-outline-variant/20 rounded-md focus:outline-none focus:ring-2 focus:ring-surface-tint/20 focus:border-primary transition-all placeholder:text-outline-variant/60 text-on-surface font-medium" id="name" name="name" placeholder="Full Name" type="text" required />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-outline-variant">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider" htmlFor="email">Email Address</label>
                <div className="relative">
                  <input className="w-full px-4 py-3.5 bg-surface-container-lowest border border-outline-variant/20 rounded-md focus:outline-none focus:ring-2 focus:ring-surface-tint/20 focus:border-primary transition-all placeholder:text-outline-variant/60 text-on-surface font-medium" id="email" name="email" placeholder="email@example.com" type="email" required />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-outline-variant">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider" htmlFor="password">Secure Password</label>
                <div className="relative">
                  <input className="w-full px-4 py-3.5 bg-surface-container-lowest border border-outline-variant/20 rounded-md focus:outline-none focus:ring-2 focus:ring-surface-tint/20 focus:border-primary transition-all placeholder:text-outline-variant/60 text-on-surface font-medium" id="password" name="password" placeholder="••••••••••••" type="password" required minLength="6" />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-outline-variant">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input className="mt-1 w-4 h-4 text-primary border-outline-variant/40 rounded focus:ring-primary/20" id="terms" name="terms" type="checkbox" />
                <label className="text-sm text-on-surface-variant leading-tight" htmlFor="terms">
                  I agree to the <a className="text-tertiary font-medium hover:underline" href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>.
                </label>
              </div>

              <button className="w-full bg-primary text-on-primary font-bold py-4 rounded-md shadow-md hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 transition-all duration-300 tracking-wide" type="submit">
                Create Account
              </button>
            </form>

            <footer className="mt-12 pt-6 border-t border-outline-variant/10 text-center">
              <p className="text-on-surface-variant text-sm">
                Already have an account? 
                <Link className="text-tertiary font-bold ml-1 hover:underline" to="/login">Login</Link>
              </p>
            </footer>
          </div>
        </div>
      </main>
      <footer className="w-full border-t border-[#e2e2e2] bg-[#f9f9f9]">
        <div className="px-12 py-8 max-w-screen-2xl mx-auto text-center text-[11px] text-outline uppercase tracking-widest">
          © 2026 VinFast. All rights reserved. Vietnam’s First Global EV Brand.
        </div>
      </footer>
    </div>
  );
};

export default SignupPage;