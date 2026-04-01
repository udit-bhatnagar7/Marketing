import React, { useState, ReactNode, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  Layout as LayoutIcon,
  Plus,
  Settings,
  ChevronDown,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStrategy } from '../context/StrategyContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { strategy } = useStrategy();
  const location = useLocation();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: "Hi! I'm your marketing assistant. How can I help you with this listing today?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [toasts, setToasts] = useState<{ id: number, message: string }[]>([]);

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'ai', text: "That's a great question! Based on the current strategy, I'd recommend focusing on the high-intent leads first. Would you like me to draft a follow-up email for them?" }]);
    }, 1000);
  };

  const navItems = [
    { path: '/', label: 'Overview', icon: LayoutIcon },
    { path: '/campaigns', label: 'Campaigns', icon: TrendingUp },
    { path: '/timeline', label: 'Timeline', icon: Clock },
    { path: '/setup', label: 'Setup', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <main className="pb-24">
        {children}
      </main>

      {/* Floating Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-2xl flex items-center gap-6 shadow-xl border border-white/40 z-50">
        {navItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 ${location.pathname === item.path ? 'text-brand-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <item.icon size={20} />
            <span className="text-label-sm">{item.label}</span>
          </Link>
        ))}
        <button 
          onClick={() => setShowChat(true)}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <MessageSquare size={20} />
          <span className="text-label-sm">Chat</span>
        </button>
        <div className="w-px h-8 bg-gray-100" />
        <Link 
          to="/create"
          className="bg-brand-600 text-white p-2 rounded-xl shadow-lg shadow-brand-200 hover:bg-brand-700 transition-all"
        >
          <Plus size={20} />
        </Link>
      </div>

      {/* AI Chat Sidebar */}
      <AnimatePresence>
        {showChat && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChat(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                    <Sparkles className="text-brand-500 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">AI Marketing Assistant</h3>
                    <p className="text-label-sm text-success-500">Online • Strategy Expert</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowChat(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                >
                  <ChevronDown size={20} className="rotate-[-90deg]" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' ? 'bg-brand-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-700 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-100">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ask me anything about your campaign..."
                    className="w-full pl-4 pr-12 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-sm"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 px-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-all flex items-center justify-center"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toasts */}
      <div className="fixed top-6 right-6 z-[100] space-y-3">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border border-gray-100 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 min-w-[240px]"
            >
              <div className="w-8 h-8 bg-success-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="text-success-500 w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-gray-700">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Layout;
