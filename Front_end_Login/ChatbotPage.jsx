import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="bg-surface min-h-screen font-body flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-outline-variant/20 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <img src="/img/vinfast_logo.png" alt="VinFast" className="h-8 w-auto" />
          <span className="h-6 w-[1px] bg-outline-variant/30"></span>
          <h1 className="text-lg font-headline font-bold text-on-surface">AI Smart Advisor</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-bold text-on-surface">{user.name}</p>
            <p className="text-[10px] text-outline uppercase tracking-widest">{user.role}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-error border border-error/20 rounded-lg hover:bg-error/5 transition-all"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Logout
          </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-8 flex flex-col gap-6">
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
          <h2 className="text-2xl font-headline font-extrabold text-on-background mb-2">Xin chào, {user.name}!</h2>
          <p className="text-on-surface-variant">Tôi là trợ lý ảo của VinFast. Tôi có thể giúp bạn chọn dòng xe điện phù hợp nhất với nhu cầu của gia đình mình.</p>
        </div>

        <div className="flex-1 border border-outline-variant/20 rounded-2xl bg-white p-6 flex flex-col justify-center items-center text-center gap-4 opacity-60">
          <span className="material-symbols-outlined text-5xl text-outline-variant">chat_bubble</span>
          <p className="text-outline italic">Hệ thống Chatbot đang được khởi tạo...</p>
        </div>
      </main>
    </div>
  );
};

export default ChatbotPage;