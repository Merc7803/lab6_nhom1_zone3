import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Hàm phân tích câu chat (Có thể mở rộng để gọi OpenAI/Gemini theo system_prompt.txt)
  const parseInput = (text) => {
    const budgetMatch = text.match(/(\d+(\.\d+)?)\s*(triệu|tr|m|tỷ)/i);
    const seatMatch = text.match(/(\d+)\s*(chỗ|ghế|người)/i);
    return {
      budget: budgetMatch ? parseInt(budgetMatch[1]) : 2000,
      seats: seatMatch ? parseInt(seatMatch[1]) : 2,
      type: text.includes("xe máy") ? "motobike" : (text.includes("ô tô") ? "car" : "all")
    };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const { budget, seats, type } = parseInput(input);

    try {
      const response = await fetch('http://localhost:8000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget: budget,
          seats: seats,
          type: type,
          demand: "balanced"
        }),
      });

      const data = await response.json();
      
      let botText = `Dựa trên ngân sách ${budget} triệu và nhu cầu ${seats} chỗ, tôi đã tìm được các dòng xe tối ưu nhất cho bạn. `;
      if (data.top3.length > 0) {
        const topModel = data.top3[0].model;
        botText += `Đặc biệt, dòng ${topModel} đạt mức độ phù hợp cao nhất (${data.top3[0].score}%) nhờ tối ưu giữa giá thành và tính năng. Tôi đã cập nhật chi tiết ở bảng bên phải.`;
        setRecommendations(data.top3);
        setSelectedVehicle(data.top3[0]);
      } else {
        botText = "Rất tiếc, tôi chưa tìm thấy xe nào phù hợp hoàn toàn với yêu cầu này. Bạn có muốn thử điều chỉnh ngân sách hoặc số chỗ ngồi không?";
      }

      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      alert(`Lỗi: ${error.message || error.toString()}. Vui lòng kiểm tra kết nối đến Backend.`); // Thêm alert để debug
      setMessages(prev => [...prev, { role: 'bot', text: "Lỗi kết nối hệ thống AI. Vui lòng thử lại sau." }]);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="bg-[#F8F9FA] min-h-screen font-['Inter'] flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 px-8 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <img src="/img/vinfast_logo.png" alt="VinFast" className="h-8 w-auto" />
          <span className="h-6 w-[1px] bg-gray-300"></span>
          <h1 className="text-lg font-bold text-[#1A1A1A]">AI Smart Advisor</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">{user.name}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{user.role}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 border border-red-100 rounded-lg hover:bg-red-50 transition-all"
          >
            <span className="material-symbols-outlined text-base">logout</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Column: Chat */}
        <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white">
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">support_agent</span>
              VinFast AI Advisor
            </h2>
            <p className="text-sm text-gray-500">Đặt câu hỏi về ngân sách, số chỗ ngồi hoặc nhu cầu sử dụng.</p>
          </div>
          
          <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto bg-[#FBFBFF]">
            {messages.length === 0 && (
              <div className="text-center py-12 px-8 border-2 border-dashed border-gray-100 rounded-2xl">
                <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">smart_toy</span>
                <p className="text-gray-400 italic text-sm">Chào {user.name}, tôi là trợ lý VinFast. Hãy cho tôi biết ngân sách và nhu cầu của bạn (VD: "Xe 5 chỗ tầm 600 triệu")</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#0052CC] text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-[#0052CC] animate-pulse text-xs font-bold px-2">AI Advisor đang phân tích dữ liệu...</div>}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập nhu cầu của bạn..."
              className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0052CC]/20 text-sm"
            />
            <button disabled={loading} type="submit" className="bg-[#0052CC] text-white p-3 rounded-xl hover:bg-[#0041a3] transition-colors disabled:opacity-50 shadow-lg shadow-blue-200">
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>

        {/* Right Column: Advisor Panel */}
        <div className="w-1/2 overflow-y-auto p-8 bg-[#F8F9FA] flex flex-col gap-8">
          {/* Top 3 Section */}
          <section id="recos">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">auto_awesome</span> Top 3 Đề xuất
            </h3>
            <div className="grid gap-3">
              {recommendations.length > 0 ? recommendations.map((rec, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedVehicle(rec)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer bg-white flex justify-between items-center ${selectedVehicle?.model === rec.model ? 'border-[#0052CC] shadow-md' : 'border-transparent hover:border-gray-200'}`}
                >
                  <div>
                    <h4 className="font-bold text-gray-900">{rec.model} <span className="text-xs font-normal text-gray-400 ml-1">{rec.variant}</span></h4>
                    <p className="text-[#0052CC] font-bold text-sm">{rec.price_million} Triệu VNĐ</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Độ phù hợp: {rec.score}%</div>
                    <p className="text-[10px] text-gray-400 mt-1">Tầm xa: {rec.range_km}km</p>
                  </div>
                </div>
              )) : <p className="text-gray-400 text-sm italic">Gợi ý sẽ xuất hiện khi bạn cung cấp nhu cầu.</p>}
            </div>
          </section>

          {/* Calculator Section */}
          <section id="calc" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Dự toán & So sánh</h3>
            {selectedVehicle ? (
              <div className="space-y-4">
                <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                  <span className="text-gray-500 font-medium">Giá xe ({selectedVehicle.model})</span>
                  <span className="font-bold">{selectedVehicle.price_million}M</span>
                </div>
                <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                  <span className="text-gray-500 font-medium">Trả góp (dự tính/tháng)</span>
                  <span className="font-bold text-[#0052CC]">~{(selectedVehicle.price_million * 0.02).toFixed(1)}M</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700 leading-relaxed">
                  <strong>Tại sao phù hợp?</strong> Dòng {selectedVehicle.model} tối ưu cho {selectedVehicle.seats} chỗ ngồi với tầm xa {selectedVehicle.range_km}km, rất phù hợp với nhu cầu di chuyển hàng ngày của bạn.
                </div>
                
                <div className="pt-4 space-y-2">
                  <button className="w-full py-3 bg-[#0052CC] text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
                    Đăng ký lái thử
                  </button>
                  <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
                    Kết nối với nhân viên Showroom
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 italic text-center mt-4">⚠️ Giá niêm yết tham khảo, có thể thay đổi. Liên hệ showroom VinFast để xác nhận.</p>
              </div>
            ) : <p className="text-gray-400 text-sm italic">Chọn một dòng xe để xem dự toán.</p>}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ChatbotPage;