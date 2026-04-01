import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStrategy } from '../context/StrategyContext';
import { generateMarketingStrategy } from '../services/ai';
import { 
  Sparkles, 
  MapPin, 
  DollarSign, 
  Home, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Settings
} from 'lucide-react';
import { motion } from 'motion/react';

const Create: React.FC = () => {
  const { listingData, setListingData, setStrategy } = useStrategy();
  const navigate = useNavigate();

  const handleStartCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/loading');
    try {
      const details = `${listingData.address} - ${listingData.price} - ${listingData.description}`;
      const result = await generateMarketingStrategy(details);
      setStrategy(result);
      navigate('/');
    } catch (error) {
      console.error("Failed to generate strategy:", error);
      navigate('/create');
      alert("Something went wrong while generating your strategy. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Value Proposition & Social Proof */}
        <div className="space-y-10">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-label-sm"
            >
              <Sparkles size={12} /> AI-Powered Marketing
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-display-xl"
            >
              Launch Your <br />
              <span className="text-brand-600">AI Strategy</span> in Seconds.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-body-lg max-w-md"
            >
              Tell me about your listing, and I'll build a high-performance marketing plan tailored to your property's unique strengths.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="p-4 bg-white rounded-lg border border-gray-100 space-y-2">
              <div className="w-8 h-8 bg-success-50 rounded-lg flex items-center justify-center text-success-600">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Fair Housing Checked</h3>
              <p className="text-body-md text-gray-400">Every ad generated is automatically scanned for compliance.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-100 space-y-2">
              <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600">
                <CheckCircle2 size={18} />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Brand Compliant</h3>
              <p className="text-body-md text-gray-400">Aligns with your brokerage's visual and tonal guidelines.</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                  <img src={`https://picsum.photos/seed/agent${i}/100/100`} alt="agent" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <p className="text-body-md font-medium text-gray-500">
              Joined by <span className="text-gray-900 font-bold">2,400+ agents</span> this month
            </p>
          </div>
        </div>

        {/* Right Side: The Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-white rounded-lg border border-gray-100 p-8 md:p-10 space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900">Listing Details</h2>
              <p className="text-sm text-gray-400">The more details you provide, the better the AI strategy.</p>
            </div>

            <form onSubmit={handleStartCampaign} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-label-sm flex items-center gap-2">
                    <MapPin size={12} /> Property Address
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. 124 Oakwood Avenue, Austin TX"
                    className="w-full px-5 py-4 rounded-lg border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all text-body-md"
                    value={listingData.address}
                    onChange={e => setListingData({...listingData, address: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-label-sm flex items-center gap-2">
                    <DollarSign size={12} /> Listing Price
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. $850,000"
                    className="w-full px-5 py-4 rounded-lg border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all text-body-md"
                    value={listingData.price}
                    onChange={e => setListingData({...listingData, price: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-label-sm flex items-center gap-2">
                    <Home size={12} /> Key Features
                  </label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="e.g. 4 beds, 3 baths, pool, modern farmhouse style, open kitchen..."
                    className="w-full px-5 py-4 rounded-lg border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all text-body-md resize-none"
                    value={listingData.description}
                    onChange={e => setListingData({...listingData, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  type="submit"
                  className="w-full bg-brand-600 text-white py-5 rounded-lg font-bold hover:bg-brand-700 transition-all flex items-center justify-center gap-3 group text-base"
                >
                  Generate Strategy 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button 
                  type="button"
                  onClick={() => navigate('/setup')}
                  className="w-full py-3 text-body-md font-bold text-gray-400 hover:text-brand-600 flex items-center justify-center gap-2 transition-colors"
                >
                  <Settings size={14} /> Configure your AI assistant
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Create;
