import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Plus, 
  Sparkles, 
  Zap, 
  MessageSquare, 
  Layout, 
  Palette, 
  Loader2,
  Lock,
  ArrowRight,
  ShieldCheck,
  User,
  Building2,
  Type,
  Image as ImageIcon,
  Mail,
  Megaphone,
  Eye,
  EyeOff,
  History,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Badge from '../components/ui/Badge';

// --- Types ---

type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: ConnectionStatus;
  account?: string;
  insight?: string;
  color: string;
}

type AgenticMode = 'draft' | 'autopilot' | 'full';

interface BrandSettings {
  brokerageName: string;
  agentName: string;
  primaryColor: string;
  tones: string[];
  headingFont: string;
  bodyFont: string;
  imageStyle: string;
  badgeLabel: string;
  badgePosition: string;
  badgeColor: string;
  badgeShape: string;
  logoUrl: string;
  logoPlacement: string;
  buttonShape: string;
  buttonStyle: string;
  buttonTone: string;
  contentPersonality: string;
  lengthPreference: string;
  emojiControl: string;
  ctaLanguageStyle: string;
  avoidWords: string;
  mustIncludePhrases: string;
  complianceMode: 'strict' | 'aggressive';
}

type TabType = 'channels' | 'brand' | 'agentic';

// --- Components ---

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-6">
    <h2 className="text-display-md">{title}</h2>
    <p className="text-body-md">{subtitle}</p>
  </div>
);

const Setup: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('channels');
  
  // Channels State
  const [channels, setChannels] = useState<Channel[]>([
    { id: 'ig', name: 'Instagram', icon: <Instagram size={20} />, status: 'connected', account: '@modern_living', insight: 'Last post: 2 days ago', color: 'text-pink-600' },
    { id: 'fb', name: 'Facebook', icon: <Facebook size={20} />, status: 'connected', account: 'Modern Living Austin', insight: 'Used in last campaign', color: 'text-blue-600' },
    { id: 'li', name: 'LinkedIn', icon: <Linkedin size={20} />, status: 'disconnected', color: 'text-blue-700' },
    { id: 'tw', name: 'X (Twitter)', icon: <Twitter size={20} />, status: 'disconnected', color: 'text-gray-900' },
    { id: 'tk', name: 'TikTok', icon: <Layout size={20} />, status: 'disconnected', color: 'text-black' },
  ]);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  // Brand State
  const [brand, setBrand] = useState<BrandSettings>({
    brokerageName: 'Elite Realty Group',
    agentName: 'Sarah Jenkins',
    primaryColor: '#3b82f6',
    tones: ['Professional', 'Warm'],
    headingFont: 'Modern SaaS',
    bodyFont: 'Inter',
    imageStyle: 'Bright & Airy',
    badgeLabel: 'Just Listed',
    badgePosition: 'top-left',
    badgeColor: '#3b82f6',
    badgeShape: 'pill',
    logoUrl: '',
    logoPlacement: 'top-left',
    buttonShape: 'rounded',
    buttonStyle: 'filled',
    buttonTone: 'View Details',
    contentPersonality: 'Descriptive',
    lengthPreference: 'Balanced',
    emojiControl: 'Light emoji',
    ctaLanguageStyle: 'Soft',
    avoidWords: 'cheap, fixer-upper',
    mustIncludePhrases: 'luxury, premium, exclusive',
    complianceMode: 'strict'
  });
  const [previewTab, setPreviewTab] = useState<'instagram' | 'email' | 'ad'>('instagram');
  const [showComparison, setShowComparison] = useState(false);

  // Agentic State
  const [mode, setMode] = useState<AgenticMode>('draft');

  const connectedCount = channels.filter(c => c.status === 'connected').length;

  const handleConnect = (id: string) => {
    setIsConnecting(id);
    setTimeout(() => {
      setChannels(prev => prev.map(c => c.id === id ? { ...c, status: 'connected', account: 'Connected Account', insight: 'Just connected' } : c));
      setIsConnecting(null);
    }, 2000);
  };

  const handleFinish = () => {
    navigate('/');
  };

  const tabs = [
    { id: 'channels', label: 'Channel Connections' },
    { id: 'brand', label: 'Brand Settings' },
    { id: 'agentic', label: 'Agentic Preferences' },
  ];

  return (
    <div className="max-w-full mx-auto p-4 md:p-8 space-y-8 pb-32">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-brand-600">
          <Sparkles size={20} />
          <span className="text-label-sm text-brand-600">System Setup</span>
        </div>
        <h1 className="text-display-lg">Control Center</h1>
        <p className="text-body-lg max-w-lg">Configure how your AI assistant represents your brand and manages your marketing channels.</p>
      </header>

      {/* Tabs Navigation */}
      <div className="flex justify-center md:justify-start">
        <div role="tablist" className="inline-flex h-12 items-center justify-center rounded-lg p-1 text-muted-foreground bg-secondary">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-6 py-2 text-sm font-bold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                activeTab === tab.id 
                  ? 'bg-white text-foreground' 
                  : 'hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'channels' && (
          <motion.div
            key="channels"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-12"
          >
            <section>
              <SectionHeader 
                title="Marketing Channels" 
                subtitle="Connect your social accounts to enable AI auto-publishing and performance tracking." 
              />
              
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-lg border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="text-display-md">Connection Status</h3>
                    <p className="text-body-md">
                      {connectedCount === 0 
                        ? "No channels connected yet. Start by connecting your first account." 
                        : `Ready to publish on ${channels.filter(c => c.status === 'connected').map(c => c.name).join(' & ')}`}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className="flex-grow">
                      <div className="flex justify-between text-label-sm mb-1.5">
                        <span>Connected</span>
                        <span>{connectedCount}/{channels.length}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(connectedCount / channels.length) * 100}%` }}
                          className="h-full bg-brand-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
                  {channels.map((channel) => (
                    <motion.div
                      key={channel.id}
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-lg border border-gray-100 p-4 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center ${channel.color}`}>
                          {channel.icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{channel.name}</h4>
                          <p className="text-body-md text-gray-400 font-medium">{channel.account || "Not connected"}</p>
                        </div>
                      </div>

                      <div className="hidden md:flex flex-col items-center text-center px-4">
                        <Badge variant={channel.status === 'connected' ? 'success' : 'default'}>
                          {channel.status === 'connected' ? 'Connected' : 'Disconnected'}
                        </Badge>
                        {channel.insight && (
                          <p className="text-label-sm mt-1">{channel.insight}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-1.5 text-label-sm">
                          <Lock size={10} /> Secure OAuth
                        </div>
                        {channel.status === 'connected' ? (
                          <button className="px-4 py-2 text-body-md font-bold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                            Manage
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleConnect(channel.id)}
                            disabled={isConnecting === channel.id}
                            className="px-4 py-2 text-body-md font-bold bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2 disabled:opacity-50"
                          >
                            {isConnecting === channel.id ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                            Connect
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'brand' && (
          <motion.div
            key="brand"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7 space-y-16">
                {/* Section 1: Identity */}
                <section className="space-y-8">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Identity</h3>
                    <p className="text-xs text-gray-400">Core details for your brand representation.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Brokerage</label>
                      <input 
                        type="text" 
                        value={brand.brokerageName}
                        onChange={e => setBrand({...brand, brokerageName: e.target.value})}
                        className="w-full px-0 py-2 border-b border-gray-100 bg-transparent focus:border-brand-500 outline-none transition-all text-sm font-medium placeholder:text-gray-200"
                        placeholder="Enter brokerage name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Agent Name</label>
                      <input 
                        type="text" 
                        value={brand.agentName}
                        onChange={e => setBrand({...brand, agentName: e.target.value})}
                        className="w-full px-0 py-2 border-b border-gray-100 bg-transparent focus:border-brand-500 outline-none transition-all text-sm font-medium placeholder:text-gray-200"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                </section>

                {/* Section 2: Visual Language */}
                <section className="space-y-8">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Visual Language</h3>
                    <p className="text-xs text-gray-400">Typography and imagery style presets.</p>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Typography System</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { id: 'Modern SaaS', desc: 'Clean & Tech' },
                          { id: 'Luxury Real Estate', desc: 'Serif & Elegant' },
                          { id: 'Classic Elegant', desc: 'Sans & Timeless' }
                        ].map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => setBrand({...brand, headingFont: preset.id})}
                            className={`p-4 rounded-lg border text-left transition-all ${
                              brand.headingFont === preset.id 
                                ? 'border-brand-500 bg-brand-50/10 ring-1 ring-brand-500' 
                                : 'border-gray-100 hover:border-gray-200'
                            }`}
                          >
                            <p className="text-xs font-bold text-gray-900">{preset.id}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{preset.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Image Mood</label>
                        <select 
                          value={brand.imageStyle}
                          onChange={e => setBrand({...brand, imageStyle: e.target.value})}
                          className="w-full px-0 py-2 border-b border-gray-100 bg-transparent outline-none text-sm font-medium appearance-none cursor-pointer hover:border-gray-300 transition-colors"
                        >
                          {['Bright & Airy', 'Warm & Cozy', 'Luxury Contrast', 'Minimal Neutral'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Logo Placement</label>
                        <div className="flex bg-gray-50 p-1 rounded-lg w-fit">
                          {['top-left', 'center', 'footer'].map((place) => (
                            <button
                              key={place}
                              onClick={() => setBrand({...brand, logoPlacement: place})}
                              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                                brand.logoPlacement === place ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              {place.split('-')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 3: Tone & Voice */}
                <section className="space-y-8">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Tone & Voice</h3>
                    <p className="text-xs text-gray-400">How the AI communicates your brand personality.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Personality</label>
                      <div className="flex flex-wrap gap-2">
                        {['Descriptive', 'Direct', 'Emotional'].map((p) => (
                          <button
                            key={p}
                            onClick={() => setBrand({...brand, contentPersonality: p})}
                            className={`px-4 py-2 rounded-lg text-[11px] font-bold border transition-all ${
                              brand.contentPersonality === p ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">CTA Style</label>
                      <div className="flex flex-wrap gap-2">
                        {['Soft', 'Direct', 'Urgent'].map((s) => (
                          <button
                            key={s}
                            onClick={() => setBrand({...brand, ctaLanguageStyle: s})}
                            className={`px-4 py-2 rounded-lg text-[11px] font-bold border transition-all ${
                              brand.ctaLanguageStyle === s ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 4: Guardrails */}
                <section className="space-y-8">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Guardrails</h3>
                    <p className="text-xs text-gray-400">Safety and compliance settings.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Forbidden Words</label>
                      <textarea 
                        value={brand.avoidWords}
                        onChange={e => setBrand({...brand, avoidWords: e.target.value})}
                        placeholder="e.g. cheap, fixer-upper..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-100 bg-white focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 outline-none transition-all text-sm font-medium resize-none h-24"
                      />
                    </div>
                    
                    <div className="p-6 rounded-lg bg-gray-50/50 border border-gray-100 flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-gray-900">Compliance Mode</h4>
                        <p className="text-[10px] text-gray-400">Strict Fair Housing enforcement enabled</p>
                      </div>
                      <button 
                        onClick={() => setBrand({...brand, complianceMode: brand.complianceMode === 'strict' ? 'aggressive' : 'strict'})}
                        className={`w-11 h-6 rounded-full transition-all relative ${brand.complianceMode === 'strict' ? 'bg-brand-600' : 'bg-gray-200'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${brand.complianceMode === 'strict' ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                </section>
              </div>

                <div className="lg:col-span-5">
                  <div className="sticky top-8 space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Preview</h4>
                        <p className="text-[10px] text-gray-400">Live intelligence rendering</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setShowComparison(!showComparison)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                            showComparison ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          {showComparison ? <EyeOff size={12} /> : <Eye size={12} />}
                          Compare
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                      <div className="flex border-b border-gray-50 bg-gray-50/30">
                        {[
                          { id: 'instagram', label: 'Instagram', icon: <Instagram size={14} /> },
                          { id: 'email', label: 'Email', icon: <Mail size={14} /> },
                          { id: 'ad', label: 'Ad Creative', icon: <Megaphone size={14} /> }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setPreviewTab(tab.id as any)}
                            className={`flex-grow py-5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all relative ${
                              previewTab === tab.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                            }`}
                          >
                            {tab.icon}
                            {tab.label}
                            {previewTab === tab.id && (
                              <motion.div 
                                layoutId="activePreviewTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                              />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="p-10 flex flex-col items-center justify-center min-h-[520px] bg-gradient-to-b from-white to-gray-50/50">
                        <div className={`relative w-full transition-all duration-700 ease-in-out ${showComparison ? 'max-w-[640px]' : 'max-w-[340px]'}`}>
                          {showComparison && (
                            <div className="absolute -top-8 left-0 right-0 flex justify-between px-4">
                              <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Generic AI</span>
                              <span className="text-[9px] font-bold text-brand-500 uppercase tracking-widest">Your Brand</span>
                            </div>
                          )}
                          
                          <div className={`flex gap-6 transition-all duration-700 ${showComparison ? 'scale-95' : ''}`}>
                            {showComparison && (
                              <div className="bg-white rounded-lg w-full min-w-[280px] overflow-hidden border border-gray-100 opacity-40 grayscale blur-[1px]">
                                <div className="p-4 flex items-center gap-3 border-b border-gray-50">
                                  <div className="w-8 h-8 rounded-full bg-gray-100" />
                                  <div className="w-24 h-2 bg-gray-100 rounded-sm" />
                                </div>
                                <div className="aspect-square bg-gray-100" />
                                <div className="p-4 space-y-2">
                                  <div className="w-full h-2 bg-gray-100 rounded-sm" />
                                  <div className="w-2/3 h-2 bg-gray-100 rounded-sm" />
                                </div>
                              </div>
                            )}

                            <motion.div 
                              layout
                              className={`bg-white rounded-lg w-full min-w-[300px] overflow-hidden border border-gray-100 relative ${showComparison ? 'ring-8 ring-brand-500/5' : ''}`}
                            >
                              {brand.logoPlacement === 'top-left' && (
                                <div className="absolute top-5 left-5 z-20">
                                  <div className="px-2 py-1 bg-gray-900 rounded-sm text-[7px] font-bold text-white tracking-tighter">LOGO</div>
                                </div>
                              )}
                              {brand.logoPlacement === 'center' && (
                                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                  <div className="px-3 py-1.5 bg-gray-900/80 backdrop-blur-md rounded-sm text-[9px] font-bold text-white tracking-widest">LOGO</div>
                                </div>
                              )}

                              <div className="p-5 flex items-center gap-4 border-b border-gray-50">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden ring-1 ring-gray-100">
                                  <img src="https://picsum.photos/seed/agent/100/100" alt="agent" referrerPolicy="no-referrer" />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-gray-900">{brand.agentName || 'Your Name'}</p>
                                  <p className="text-[10px] text-gray-400 font-medium">{brand.brokerageName || 'Brokerage'}</p>
                                </div>
                              </div>

                              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                <img 
                                  src="https://picsum.photos/seed/luxury-home/800/800" 
                                  alt="preview" 
                                  className={`w-full h-full object-cover transition-all duration-1000 ${
                                    brand.imageStyle === 'Bright & Airy' ? 'brightness-110 saturate-110' :
                                    brand.imageStyle === 'Warm & Cozy' ? 'sepia-[0.2] brightness-95' :
                                    brand.imageStyle === 'Luxury Contrast' ? 'contrast-125 brightness-90' :
                                    'grayscale-[0.1] contrast-110'
                                  }`}
                                  referrerPolicy="no-referrer" 
                                />
                                
                                <div className={`absolute z-10 ${
                                  brand.badgePosition === 'top-left' ? 'top-5 left-5' :
                                  brand.badgePosition === 'top-right' ? 'top-5 right-5' :
                                  brand.badgePosition === 'bottom-left' ? 'bottom-5 left-5' :
                                  'bottom-5 right-5'
                                }`}>
                                  <div 
                                    className={`px-4 py-2 text-[9px] font-bold text-white tracking-widest uppercase ${
                                      brand.badgeShape === 'pill' ? 'rounded-full' : 'rounded-lg'
                                    }`}
                                    style={{ backgroundColor: brand.badgeColor }}
                                  >
                                    {brand.badgeLabel}
                                  </div>
                                </div>
                              </div>

                              <div className="p-6 space-y-5">
                                <div className="flex items-center justify-between">
                                  <div className="flex gap-4">
                                    <div className="w-5 h-5 rounded-full bg-gray-50 border border-gray-100" />
                                    <div className="w-5 h-5 rounded-full bg-gray-50 border border-gray-100" />
                                  </div>
                                  {brand.logoPlacement === 'footer' && (
                                    <div className="px-2 py-1 bg-gray-900 rounded-sm text-[7px] font-bold text-white tracking-tighter">LOGO</div>
                                  )}
                                </div>
                                
                                <div className="space-y-3">
                                  <p className={`text-xs text-gray-700 leading-relaxed ${brand.headingFont === 'Luxury Real Estate' ? 'font-serif italic' : 'font-sans'}`}>
                                    <span className="font-bold text-gray-900 mr-2">{brand.agentName || 'Agent'}</span>
                                    {previewTab === 'instagram' ? (
                                      <>
                                        {brand.contentPersonality === 'Emotional' ? "Imagine waking up to these views every single day. ✨ " : 
                                         brand.contentPersonality === 'Direct' ? "New listing alert. 4 beds, 3 baths, prime location. " :
                                         "This stunning property just hit the market! "}
                                        {brand.lengthPreference === 'Detailed' ? "Featuring a gourmet kitchen, master suite with private balcony, and a backyard oasis perfect for entertaining." : ""}
                                        {brand.emojiControl === 'Light emoji' ? " 🏠🔑" : ""}
                                      </>
                                    ) : previewTab === 'email' ? (
                                      <>
                                        {brand.contentPersonality === 'Direct' ? "I wanted to share this exclusive new listing with you. " : "I hope you're having a wonderful week. I just came across a property I think you'll love. "}
                                        Check out the full details at the link below.
                                      </>
                                    ) : (
                                      <>
                                        {brand.ctaLanguageStyle === 'Urgent' ? "Don't miss out on this rare opportunity. " : "Discover luxury living at its finest. "}
                                        Schedule your private tour today.
                                      </>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        {activeTab === 'agentic' && (
          <motion.div
            key="agentic"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-16"
          >
            <div className="max-w-3xl space-y-4">
              <h2 className="text-display-md">Agentic Control</h2>
              <p className="text-body-md">Define the level of autonomy granted to your AI assistant. You can adjust these settings as your trust grows.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: 'draft',
                  label: 'Draft & Approve',
                  description: 'AI creates content, you approve before publishing.',
                  trust: 'Manual Control',
                  icon: <ShieldCheck size={24} />,
                  color: 'text-blue-500',
                  tooltip: 'AI acts as a copywriter. Every post, ad, and email is saved as a draft for your final review and manual publish.'
                },
                {
                  id: 'autopilot',
                  label: 'Auto-Pilot',
                  description: 'AI handles routine posts. Ads need approval.',
                  trust: 'Collaborative',
                  recommended: true,
                  icon: <Zap size={24} />,
                  color: 'text-brand-500',
                  tooltip: 'AI publishes routine content like market updates automatically, but flags high-stakes items like ads for your approval.'
                },
                {
                  id: 'full',
                  label: 'Full Autonomy',
                  description: 'AI manages entire campaign. You get reports.',
                  trust: 'High Trust',
                  icon: <Sparkles size={24} />,
                  color: 'text-purple-500',
                  tooltip: 'AI manages your entire strategy, including budget allocation and multi-channel publishing. You receive a weekly performance report.'
                }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as AgenticMode)}
                  className={`p-8 rounded-lg border-2 text-left transition-all relative group ${
                    mode === m.id ? 'border-brand-500 bg-brand-50/5' : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  {m.recommended && (
                    <div className="absolute -top-3 left-8 px-3 py-1 bg-brand-600 text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                      Recommended
                    </div>
                  )}
                  
                  <div className="space-y-8">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                      mode === m.id ? 'bg-brand-500 text-white' : 'bg-gray-50 text-gray-400'
                    }`}>
                      {m.icon}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-gray-900">{m.label}</h4>
                        <div className="group/info relative">
                          <AlertCircle size={14} className="text-gray-300 hover:text-gray-400 cursor-help transition-colors" />
                          <div className="absolute bottom-full right-0 mb-3 w-56 p-4 bg-gray-900 text-white text-[10px] leading-relaxed rounded-lg opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all z-50">
                            {m.tooltip}
                            <div className="absolute top-full right-2 border-8 border-transparent border-t-gray-900" />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{m.description}</p>
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{m.trust}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        mode === m.id ? 'border-brand-500 bg-brand-500' : 'border-gray-200'
                      }`}>
                        {mode === m.id && <Check size={12} className="text-white" />}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-12 border-t border-gray-100">
              <button 
                onClick={handleFinish}
                className="px-12 py-4 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-black transition-all flex items-center gap-3 group"
              >
                Complete Setup 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Setup;
