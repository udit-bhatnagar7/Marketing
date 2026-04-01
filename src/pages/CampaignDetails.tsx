import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Eye, 
  Zap, 
  Clock, 
  Instagram, 
  Facebook, 
  Mail, 
  ChevronRight,
  Sparkles,
  Share2,
  ArrowUpRight,
  CheckCircle2,
  Play,
  Pause,
  RefreshCw,
  Target,
  BarChart3,
  MessageSquare,
  Video,
  Image as ImageIcon,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type CampaignStatus = 'live' | 'queued' | 'draft';

interface TimelineItem {
  id: string;
  platform: 'Instagram' | 'Facebook' | 'Email' | 'Meta Ads' | 'LinkedIn';
  type: 'Post' | 'Reel' | 'Newsletter' | 'Ad' | 'Story';
  status: 'Published' | 'Scheduled' | 'Draft';
  caption: string;
  metrics?: { views: string; engagement: string };
  performanceLabel?: 'Top performer' | 'Needs improvement' | 'Stable';
  whyAI?: string;
  time: string;
  previewUrl: string;
}

interface CampaignPhase {
  title: string;
  items: TimelineItem[];
}

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
    impressions: { value: string; delta: string; context: string };
    engagement: { value: string; delta: string; context: string };
    leads: { value: string; delta: string; context: string };
  };
  insights: string[];
  nextActions: {
    title: string;
    reason: string;
    impact: string;
    label: string;
  }[];
  phases: CampaignPhase[];
  healthTrend: 'up' | 'down' | 'stable';
  topContent: {
    thumbnail: string;
    platform: string;
    stats: string;
  };
  leadIntel: {
    count: string;
    summary: string;
  };
}

// --- Mock Data ---

const MOCK_CAMPAIGN: Campaign = {
  id: '1',
  address: '4821 Oakmont Dr, Austin TX 78749',
  price: '$1,250,000',
  status: 'live',
  statusSignal: 'Live & performing',
  score: 87,
  insight: 'Performing better than 72% of similar listings',
  imageUrl: 'https://picsum.photos/seed/house1/1200/600',
  metrics: {
    impressions: { value: '24,350', delta: '+18%', context: 'Above average' },
    engagement: { value: '1,842', delta: '+24%', context: 'High interest' },
    leads: { value: '23', delta: '+12%', context: 'Strong pipeline' }
  },
  insights: [
    'Instagram driving 60% of engagement',
    'Video content performing 2x better than stills',
    'Engagement slowing — refresh scheduled for tomorrow'
  ],
  nextActions: [
    {
      title: 'Boost top-performing post',
      reason: 'High engagement detected on luxury kitchen reel',
      impact: '+20–30% reach',
      label: 'Apply'
    },
    {
      title: 'Refresh email subject line',
      reason: 'Open rates dipping in secondary segment',
      impact: '+15% open rate',
      label: 'Review'
    }
  ],
  phases: [
    {
      title: 'Launch Phase',
      items: [
        {
          id: 't1',
          platform: 'Instagram',
          type: 'Post',
          status: 'Published',
          caption: 'Just listed! A masterpiece of modern design in the heart of Austin.',
          metrics: { views: '12.4k', engagement: '842' },
          performanceLabel: 'Stable',
          whyAI: 'High-contrast lifestyle shots used to grab attention in the first 24h.',
          time: '2 days ago',
          previewUrl: 'https://picsum.photos/seed/p1/400/400'
        },
        {
          id: 't2',
          platform: 'Email',
          type: 'Newsletter',
          status: 'Published',
          caption: 'Exclusive Preview: 4821 Oakmont Dr',
          metrics: { views: '2.1k', engagement: '142' },
          performanceLabel: 'Top performer',
          whyAI: 'Personalized subject lines drove record open rates for this price point.',
          time: '1 day ago',
          previewUrl: 'https://picsum.photos/seed/p2/400/400'
        }
      ]
    },
    {
      title: 'Engagement Phase',
      items: [
        {
          id: 't3',
          platform: 'Instagram',
          type: 'Reel',
          status: 'Published',
          caption: 'The kitchen of your dreams. ✨',
          metrics: { views: '45.2k', engagement: '3.1k' },
          performanceLabel: 'Top performer',
          whyAI: 'Video content prioritized to highlight architectural flow.',
          time: '6 hours ago',
          previewUrl: 'https://picsum.photos/seed/p3/400/400'
        },
        {
          id: 't4',
          platform: 'Meta Ads',
          type: 'Ad',
          status: 'Scheduled',
          caption: 'Luxury living redefined. Schedule your tour.',
          time: 'Today, 4:00 PM',
          whyAI: 'Retargeting active viewers of the kitchen reel to drive tour bookings.',
          previewUrl: 'https://picsum.photos/seed/p4/400/400'
        }
      ]
    }
  ],
  healthTrend: 'up',
  topContent: {
    thumbnail: 'https://picsum.photos/seed/top/200/200',
    platform: 'Instagram Reel',
    stats: '45.2k views • 3.1k likes'
  },
  leadIntel: {
    count: '3 high-intent buyers',
    summary: 'Frequent repeat viewers from local luxury zip codes.'
  }
};

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const campaign = MOCK_CAMPAIGN; // In real app, find by id

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] pb-32">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/campaigns" className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-gray-500" />
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Campaigns</span>
              <ChevronRight size={14} className="text-gray-300" />
              <span className="font-medium">{campaign.address}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Share2 size={16} /> Share Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all">
              <Zap size={16} /> Boost Performance
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
          
          {/* LEFT COLUMN (70%) */}
          <div className="space-y-12">
            
            {/* 1. HERO SECTION */}
            <section className="relative rounded-lg overflow-hidden bg-white border border-gray-100">
              <div className="relative h-[400px]">
                <img 
                  src={campaign.imageUrl} 
                  alt={campaign.address} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full tracking-wider uppercase">
                        Live & Performing
                      </span>
                      <span className="text-white/80 text-sm font-medium">
                        {campaign.price}
                      </span>
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                      {campaign.address}
                    </h1>
                    <p className="text-white/70 text-sm flex items-center gap-2">
                      <Sparkles size={14} className="text-blue-400" />
                      {campaign.insight}
                    </p>
                  </div>

                  <div className="hidden md:flex items-center gap-6 bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12">
                        <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                          <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3" className="stroke-white/10" />
                          <circle 
                            cx="18" cy="18" r="16" fill="none" strokeWidth="3" 
                            strokeDasharray={`${campaign.score} ${100 - campaign.score}`} 
                            className="stroke-blue-400" strokeLinecap="round" 
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                          {campaign.score}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Next Action</p>
                        <p className="text-sm font-bold text-white">{campaign.nextActions[0].title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. INSIGHT BAR */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {campaign.insights.map((insight, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100/50">
                  <div className="p-2 bg-white rounded-lg text-blue-600">
                    {i === 0 ? <Instagram size={16} /> : i === 1 ? <Video size={16} /> : <Clock size={16} />}
                  </div>
                  <p className="text-xs font-medium text-blue-900 leading-tight">
                    {insight}
                  </p>
                </div>
              ))}
            </section>

            {/* 3. SIMPLIFIED METRICS */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Impressions', icon: <Eye size={18} />, key: 'impressions' },
                { label: 'Engagement', icon: <TrendingUp size={18} />, key: 'engagement' },
                { label: 'Leads', icon: <Users size={18} />, key: 'leads' }
              ].map((metric) => {
                const data = campaign.metrics[metric.key as keyof typeof campaign.metrics];
                return (
                  <div key={metric.key} className="p-6 bg-white rounded-lg border border-gray-100 transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                        {metric.icon}
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                        {data.delta}
                      </span>
                    </div>
                    <p className="text-3xl font-bold tracking-tight mb-1">{data.value}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-gray-400">{metric.label}</p>
                      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{data.context}</p>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* 4. WHAT TO DO NEXT */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <Zap size={18} className="text-blue-600" />
                <h2 className="text-lg font-bold">What to do next</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campaign.nextActions.map((action, i) => (
                  <div key={i} className="p-6 bg-white rounded-lg border border-gray-100 flex flex-col justify-between group hover:border-blue-200 transition-all">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-gray-900">{action.title}</h3>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase tracking-wider">
                          {action.impact}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {action.reason}
                      </p>
                    </div>
                    <button className="mt-6 w-full py-3 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-black transition-colors">
                      {action.label}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. CAMPAIGN TIMELINE */}
            <section className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} className="text-gray-400" />
                  <h2 className="text-lg font-bold">Campaign Strategy</h2>
                </div>
                <button className="text-sm font-bold text-blue-600 hover:underline">View Full Calendar</button>
              </div>

              <div className="space-y-12">
                {campaign.phases.map((phase, pi) => (
                  <div key={pi} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{phase.title}</h3>
                      <div className="h-px flex-1 bg-gray-100" />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {phase.items.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg border border-gray-100 p-5 flex gap-6 hover:border-gray-200 transition-all group">
                          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 relative">
                            <img src={item.previewUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <div className="absolute top-2 left-2 p-1.5 bg-white/90 backdrop-blur-md rounded-sm">
                              {item.platform === 'Instagram' ? <Instagram size={12} className="text-pink-600" /> : 
                               item.platform === 'Facebook' ? <Facebook size={12} className="text-blue-600" /> : 
                               item.platform === 'Email' ? <Mail size={12} className="text-blue-500" /> : 
                               <Target size={12} className="text-gray-900" />}
                            </div>
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${
                                  item.status === 'Published' ? 'bg-green-50 text-green-600' : 
                                  item.status === 'Scheduled' ? 'bg-blue-50 text-blue-600' : 
                                  'bg-gray-50 text-gray-400'
                                }`}>
                                  {item.status === 'Published' ? 'Published' : item.status === 'Scheduled' ? 'Queued for best time' : 'Draft'}
                                </span>
                                <span className="text-xs font-medium text-gray-400">{item.time}</span>
                              </div>
                              {item.performanceLabel && (
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                                  item.performanceLabel === 'Top performer' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-400'
                                }`}>
                                  {item.performanceLabel}
                                </span>
                              )}
                            </div>

                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.caption}</p>

                            <div className="flex items-center gap-6">
                              {item.metrics && (
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <Eye size={14} /> {item.metrics.views}
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <TrendingUp size={14} /> {item.metrics.engagement}
                                  </div>
                                </div>
                              )}
                              {item.whyAI && (
                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-blue-500 bg-blue-50/50 px-2 py-1 rounded-lg">
                                  <Sparkles size={12} />
                                  {item.whyAI}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col justify-center">
                            <button className="p-2 text-gray-300 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
                              <MoreHorizontal size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN (30%) - STICKY */}
          <aside className="space-y-6">
            <div className="sticky top-28 space-y-6">
              
              {/* A. Campaign Health */}
              <div className="p-6 bg-white rounded-lg border border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Campaign Health</h3>
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${campaign.healthTrend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {campaign.healthTrend === 'up' ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                    Trending {campaign.healthTrend}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-20">
                    <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                      <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3" className="stroke-gray-50" />
                      <circle 
                        cx="18" cy="18" r="16" fill="none" strokeWidth="3" 
                        strokeDasharray={`${campaign.score} ${100 - campaign.score}`} 
                        className="stroke-blue-600" strokeLinecap="round" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">{campaign.score}</span>
                      <span className="text-[8px] uppercase tracking-widest text-gray-400">Score</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Your campaign is optimized for high-intent leads in the Austin market.
                  </p>
                </div>
              </div>

              {/* B. Top Performing Content */}
              <div className="p-6 bg-white rounded-lg border border-gray-100 space-y-4">
                <h3 className="text-sm font-bold text-gray-900">What’s working</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <img src={campaign.topContent.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-pink-600 uppercase tracking-wider">
                        <Instagram size={10} /> {campaign.topContent.platform}
                      </div>
                      <p className="text-xs font-bold text-gray-900">Luxury Kitchen Reveal</p>
                      <p className="text-[10px] text-gray-400 font-medium">{campaign.topContent.stats}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* C. Lead Intelligence */}
              <div className="p-6 bg-white rounded-lg border border-gray-100 space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Users size={16} />
                  <h3 className="text-sm font-bold">Lead Intelligence</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-bold text-gray-900">{campaign.leadIntel.count}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {campaign.leadIntel.summary}
                  </p>
                </div>
                <button className="w-full py-2.5 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  View Leads
                </button>
              </div>

              {/* D. Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all group">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-gray-600">
                    <Pause size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500">Pause</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all group">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-gray-600">
                    <RefreshCw size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500">Refresh</span>
                </button>
              </div>

            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default CampaignDetails;
