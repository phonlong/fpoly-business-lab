import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { getGeminiRecommendation } from '../services/geminiService';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: 'Xin chào! Mình là trợ lý ảo của Tiệm. Bạn đang thèm uống gì nè? ☕✨' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputValue('');
    setIsLoading(true);

    const reply = await getGeminiRecommendation(userMsg);
    
    setMessages(prev => [...prev, { role: 'ai', content: reply }]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 bg-gradient-to-r from-coffee-500 to-coffee-700 text-white p-4 rounded-full shadow-lg z-40 hover:scale-110 transition-transform animate-bounce"
        aria-label="Chat AI"
      >
        <Sparkles size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 w-80 bg-white rounded-2xl shadow-2xl z-50 border border-coffee-200 flex flex-col overflow-hidden animate-fade-in-up" style={{maxHeight: '500px'}}>
      <div className="bg-coffee-600 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles size={18} />
          <h3 className="font-bold">Trợ lý Tiệm Chill</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-coffee-700 p-1 rounded">
          <X size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-coffee-50 space-y-3 h-64">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-coffee-500 text-white rounded-tr-none' 
                : 'bg-white text-coffee-900 shadow-sm border border-coffee-100 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-coffee-400 text-sm">
              Đang suy nghĩ...
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-white border-t border-coffee-100 flex gap-2">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Bạn muốn uống gì?..."
          className="flex-1 bg-coffee-50 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-coffee-300 text-coffee-900"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-coffee-600 text-white p-2 rounded-xl hover:bg-coffee-700 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};