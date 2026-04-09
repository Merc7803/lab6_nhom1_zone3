import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
      // Tạo mật khẩu ngẫu nhiên 8 ký tự
      const newPassword = Math.random().toString(36).slice(-8);
      
      // Cập nhật mật khẩu mới vào localStorage
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));

      // Mô phỏng gửi email
      setIsSent(true);
      setMessage(`Mật khẩu mới đã được gửi tới email của bạn. (Demo: ${newPassword})`);
    } else {
      setError('Email không tồn tại trong hệ thống VinFast.');
    }
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
              <h1 className="text-3xl font-headline font-extrabold tracking-tight text-on-background">Reset Password</h1>
              <p className="text-on-surface-variant font-body text-sm">Nhập email để nhận mật khẩu mới.</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-10 rounded-xl shadow-[0_12px_32px_-4px_rgba(45,52,53,0.08)]">
            {!isSent ? (
              <form className="space-y-6" onSubmit={handleResetPassword}>
                <div className="space-y-2">
                  <label className="block text-xs font-label font-semibold tracking-wider text-secondary uppercase" htmlFor="email">Email Address</label>
                  <input 
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-surface-tint focus:border-primary transition-all duration-200" 
                    id="email" 
                    type="email" 
                    placeholder="name@vinfast.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>

                {error && <p className="text-error text-xs font-medium">{error}</p>}

                <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-headline font-bold tracking-tight text-sm hover:translate-y-[-2px] active:opacity-80 transition-all duration-300 shadow-sm" type="submit">
                  Send New Password
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="flex justify-center text-tertiary">
                  <span className="material-symbols-outlined text-5xl">mark_email_read</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{message}</p>
                <Link to="/login" className="block w-full bg-primary text-on-primary py-4 rounded-lg font-headline font-bold tracking-tight text-sm hover:translate-y-[-2px] transition-all">
                  Back to Login
                </Link>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link className="text-xs font-label text-tertiary font-semibold hover:underline" to="/login">Back to Login</Link>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 mt-auto border-t border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-12 text-center">
          <p className="text-[11px] font-body text-outline leading-relaxed uppercase tracking-widest">© 2026 VinFast. All rights reserved. Vietnam’s First Global EV Brand.</p>
        </div>
      </footer>

      {/* Decorative elements */}
      <div className="fixed top-0 right-0 -z-10 w-1/3 h-screen bg-surface-container-low opacity-50"></div>
      <div className="fixed bottom-1/4 left-10 -z-10 flex flex-col gap-2 opacity-20">
        <div className="w-32 h-[1px] bg-outline"></div>
        <div className="w-16 h-[1px] bg-outline"></div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;