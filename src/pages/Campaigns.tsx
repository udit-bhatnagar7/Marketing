import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Zap, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Instagram,
  Facebook,
  Mail,
  Layout as LayoutIcon,
  CheckCircle2,
  ExternalLink,
  MoreHorizontal,
  Eye,
  ArrowUpRight,
  Play,
  Pause,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';

// --- Types ---

type CampaignStatus = 'live' | 'queued' | 'draft';

interface Campaign {
  id: string;
  address: string;
  price: string;
  status: CampaignStatus;
  statusSignal: string;
  score: number;
  insight: string;
  imageUrl: string;
  metrics: {
    impressions: { value: string; delta: string };
    engagement: { value: string; delta: string };
    leads: { value: string; delta: string };
  };
  nextScheduled: string;
  channels: string[];
  topChannel: string;
  nextAction: {
    suggestion: string;
    label: string;
  };
  whyAI: string[];
}

// --- Mock Data ---

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    address: '4821 Oakmont Dr, Austin TX 78749',
    price: '$1,250,000',
    status: 'live',
    statusSignal: 'Auto-Pilot (Low Risk)',
    score: 87,
    insight: 'Performing better than 78% of listings in your area',
    imageUrl: 'https://picsum.photos/seed/house1/400/300',
    metrics: {
      impressions: { value: '24,350', delta: '+18% vs avg' },
      engagement: { value: '1,842', delta: '+24% vs avg' },
      leads: { value: '23', delta: '+12% vs similar homes' }
    },
    nextScheduled: 'Today, 2:00 PM',
    channels: ['Instagram', 'Facebook', 'Email', 'Meta Ads'],
    topChannel: 'Instagram',
    nextAction: {
      suggestion: 'Boost top-performing post',
      label: 'Apply'
    },
    whyAI: [
      'Instagram + Reels selected due to high buyer activity',
      'Evening schedule matches peak engagement',
      'Luxury tone aligned with price segment'
    ]
  },
  {
    id: '2',
    address: '45 Highland Terrace, Austin TX 78746',
    price: '$1,200,000',
    status: 'queued',
    statusSignal: 'Monitoring engagement',
    score: 92,
    insight: 'Engagement driven by video content',
    imageUrl: 'https://picsum.photos/seed/house2/400/300',
    metrics: {
      impressions: { value: '12,402', delta: '' },
      engagement: { value: '942', delta: '' },
      leads: { value: '12', delta: '' }
    },
    nextScheduled: 'Tomorrow, 10:00 AM',
    channels: ['Instagram', 'LinkedIn', 'Email'],
    topChannel: 'Instagram',
    nextAction: {
      suggestion: 'Add open house promotion',
      label: 'Review'
    },
    whyAI: [
      'Video-first strategy to highlight architectural details',
      'Targeting high-net-worth individuals on LinkedIn',
      'Scheduled for weekend launch to maximize tour bookings'
    ]
  }
];

// --- Components ---

const ScoreCircle = ({ score }: { score: number }) => {
  const dashArray = `${score} ${100 - score}`;
  
  return (
    <div className="relative w-12 h-12">
      <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
        <circle 
          cx="18" 
          cy="18" 
          r="15.915" 
          fill="none" 
          strokeWidth="3" 
          className="stroke-secondary"
        />
        <circle 
          cx="18" 
          cy="18" 
          r="15.915" 
          fill="none" 
          strokeWidth="3" 
          strokeDasharray={dashArray} 
          className="stroke-success" 
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
        {score}
      </span>
    </div>
  );
};

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border border-border bg-card hover:border-primary/20 transition-colors group relative ${isMenuOpen ? 'z-40' : 'z-0'}`}
    >
      <div className="flex items-center">
        {/* Property Image */}
        <div className="relative w-40 h-32 flex-shrink-0 overflow-hidden rounded-l-lg">
          <img 
            src={campaign.imageUrl} 
            alt={campaign.address} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-5 py-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link 
                  to={`/campaigns/${campaign.id}`}
                  className="font-display font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  {campaign.address}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 text-[10px] bg-success/15 text-success border-success/20">
                  Active
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{campaign.price}</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Launch
                </span>
                <span>·</span>
                <span>{campaign.statusSignal}</span>
              </div>
            </div>

            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 top-full mt-2 z-50 min-w-[10rem] overflow-hidden rounded-sm border bg-popover p-1 text-popover-foreground"
                  >
                    <div 
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Play className="w-3.5 h-3.5 mr-2" /> Activate
                    </div>
                    <div 
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Pause className="w-3.5 h-3.5 mr-2" /> Pause
                    </div>
                    <div 
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <RefreshCw className="w-3.5 h-3.5 mr-2" /> Refresh Content
                    </div>
                    <div 
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-destructive"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-3">
            {campaign.channels.map(channel => (
              <span 
                key={channel}
                className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
              >
                {channel}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics Section */}
        <div className="flex items-center px-5 py-4 border-l border-border gap-0">
          <div className="px-6 first:pl-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Eye className="w-3.5 h-3.5" /> Impressions
            </div>
            <p className="text-sm font-display font-bold text-foreground">
              {campaign.metrics.impressions.value}
            </p>
          </div>

          <div className="h-8 w-px bg-border mx-2" />

          <div className="px-6">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <TrendingUp className="w-3.5 h-3.5" /> Engagements
            </div>
            <p className="text-sm font-display font-bold text-foreground">
              {campaign.metrics.engagement.value}
            </p>
          </div>

          <div className="h-8 w-px bg-border mx-2" />

          <div className="px-6">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Users className="w-3.5 h-3.5" /> Leads
            </div>
            <p className="text-sm font-display font-bold text-foreground">
              {campaign.metrics.leads.value}
            </p>
          </div>

          <div className="h-8 w-px bg-border mx-2" />

          <div className="px-6">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Clock className="w-3.5 h-3.5" /> Next
            </div>
            <p className="text-xs font-medium text-foreground">
              {campaign.nextScheduled}
            </p>
          </div>

          <div className="pl-6">
            <ScoreCircle score={campaign.score} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Campaigns: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12 pb-32">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-600">
            <LayoutIcon size={20} />
            <span className="text-label-sm text-brand-600">Your Campaigns</span>
          </div>
          <h1 className="text-display-lg">Active Marketing</h1>
          <p className="text-body-lg max-w-lg">Monitor your live campaigns and review AI-generated drafts for your latest listings.</p>
        </div>

        <Link to="/create" className="px-8 py-3 bg-brand-600 text-white text-sm font-bold rounded-lg hover:bg-brand-700 transition-all flex items-center gap-2">
          New Campaign <ArrowRight size={18} />
        </Link>
      </header>

      <div className="space-y-8">
        {MOCK_CAMPAIGNS.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
