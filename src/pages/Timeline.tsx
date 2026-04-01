import React, { useState, useMemo } from 'react';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Sparkles, 
  TrendingUp, 
  Eye, 
  Edit3, 
  ExternalLink, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  List, 
  Info, 
  AlertCircle,
  MoreHorizontal,
  ArrowRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

// --- Types ---

type ContentStatus = 'published' | 'scheduled' | 'ai-generated';
type Platform = 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'email' | 'ad';

interface TimelineItem {
  id: string;
  date: string; // ISO string
  time: string;
  status: ContentStatus;
  platform: Platform;
  title: string;
  address: string;
  aiContext: string;
  metrics?: {
    views: number;
    engagement: string;
    comparison: string;
    isTopPerformer?: boolean;
  };
  previewImage: string;
  captionSnippet: string;
  aiReasoning: string;
}

interface DayGroup {
  date: string;
  label: string;
  items: TimelineItem[];
}

interface AIInsight {
  id: string;
  text: string;
  icon: React.ReactNode;
}

// --- Mock Data ---

const MOCK_ITEMS: TimelineItem[] = [
  {
    id: '1',
    date: '2026-03-28',
    time: '09:00 AM',
    status: 'published',
    platform: 'instagram',
    title: 'Launch Day: Virtual Tour',
    address: '124 Oakwood Avenue',
    aiContext: 'Posted at peak engagement time',
    metrics: { views: 1240, engagement: '8.4%', comparison: '+28% vs avg', isTopPerformer: true },
    previewImage: 'https://picsum.photos/seed/house1/400/400',
    captionSnippet: 'Step inside your dream home! 🏡 This modern farmhouse is now live...',
    aiReasoning: 'Video content drives 3x more engagement for luxury listings in Austin.'
  },
  {
    id: '2',
    date: '2026-03-28',
    time: '11:30 AM',
    status: 'published',
    platform: 'facebook',
    title: 'Neighborhood Spotlight',
    address: '124 Oakwood Avenue',
    aiContext: 'Generated to boost local awareness',
    metrics: { views: 850, engagement: '4.2%', comparison: '+12% vs avg' },
    previewImage: 'https://picsum.photos/seed/park/400/400',
    captionSnippet: 'Living in Oakwood means being steps away from the best parks...',
    aiReasoning: 'Facebook users in this demographic value community and lifestyle content.'
  },
  {
    id: '3',
    date: '2026-03-29',
    time: '10:00 AM',
    status: 'published',
    platform: 'email',
    title: 'Exclusive Preview Email',
    address: '124 Oakwood Avenue',
    aiContext: 'Sent to high-intent buyer list',
    metrics: { views: 420, engagement: '22%', comparison: 'Top performer' },
    previewImage: 'https://picsum.photos/seed/interior/400/400',
    captionSnippet: 'You are invited to an exclusive first look at our newest listing...',
    aiReasoning: 'Direct email to segmented lists has the highest conversion rate for serious buyers.'
  },
  {
    id: '4',
    date: '2026-03-31',
    time: '02:00 PM',
    status: 'scheduled',
    platform: 'instagram',
    title: 'Mid-Week Market Update',
    address: '124 Oakwood Avenue',
    aiContext: 'Scheduled at optimal time for reach',
    previewImage: 'https://picsum.photos/seed/kitchen/400/400',
    captionSnippet: 'The market is heating up! Don\'t miss out on this incredible opportunity...',
    aiReasoning: 'Mid-week posts capture buyers planning their weekend tours.'
  },
  {
    id: '5',
    date: '2026-04-01',
    time: '09:00 AM',
    status: 'ai-generated',
    platform: 'ad',
    title: 'Retargeting Campaign: Kitchen Focus',
    address: '124 Oakwood Avenue',
    aiContext: 'Generated to re-engage previous viewers',
    previewImage: 'https://picsum.photos/seed/chef/400/400',
    captionSnippet: 'Still thinking about that kitchen? It\'s even better in person...',
    aiReasoning: 'Retargeting ads focusing on specific high-value features increase return visits.'
  },
  {
    id: '6',
    date: '2026-04-05',
    time: '11:00 AM',
    status: 'ai-generated',
    platform: 'instagram',
    title: 'Weekend Open House Reminder',
    address: '124 Oakwood Avenue',
    aiContext: 'High-performing format (video)',
    previewImage: 'https://picsum.photos/seed/garden/400/400',
    captionSnippet: 'Join us this Saturday from 1-4 PM for a tour of this stunning property...',
    aiReasoning: 'Short-form video reminders have 45% higher save rates for events.'
  }
];

const MOCK_INSIGHTS: AIInsight[] = [
  { id: 'i1', text: 'Engagement increased 32% after video posts', icon: <TrendingUp size={16} /> },
  { id: 'i2', text: 'Instagram is driving most traffic for this listing', icon: <Instagram size={16} /> },
  { id: 'i3', text: 'Next best action: Post open house reminder', icon: <Sparkles size={16} /> }
];

// --- Components ---

const PlatformIcon = ({ platform, size = 16 }: { platform: Platform, size?: number }) => {
  switch (platform) {
    case 'instagram': return <Instagram size={size} className="text-pink-600" />;
    case 'facebook': return <Facebook size={size} className="text-blue-600" />;
    case 'linkedin': return <Linkedin size={size} className="text-blue-700" />;
    case 'twitter': return <Twitter size={size} className="text-gray-900" />;
    case 'email': return <Info size={size} className="text-brand-500" />;
    case 'ad': return <Zap size={size} className="text-warning-500" />;
    default: return null;
  }
};

const ActivityCard = ({ item }: { item: TimelineItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColor = {
    'published': 'bg-success-500',
    'scheduled': 'bg-warning-500',
    'ai-generated': 'bg-brand-500'
  };

  const statusText = {
    'published': 'Live · Performing well',
    'scheduled': 'Scheduled at optimal time',
    'ai-generated': 'AI Draft · Ready for review'
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="bg-white rounded-lg border border-gray-100 p-4 flex flex-col md:flex-row items-center gap-6 transition-all hover:border-brand-100 cursor-pointer">
        {/* LEFT: Time & Status */}
        <div className="flex flex-row md:flex-col items-center justify-center gap-2 min-w-[80px]">
          <div className="text-label-sm">{item.time}</div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColor[item.status]}`} />
            <div className="p-1.5 bg-gray-50 rounded-lg">
              <PlatformIcon platform={item.platform} />
            </div>
          </div>
        </div>

        {/* CENTER: Main Content */}
        <div className="flex-grow space-y-1 text-center md:text-left">
          <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
          <p className="text-body-md text-gray-400 font-medium">{item.platform.toUpperCase()} • {item.address}</p>
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-label-sm">
            <Sparkles size={10} />
            {item.aiContext}
          </div>
        </div>

        {/* RIGHT: Performance & Actions */}
        <div className="flex flex-col md:flex-row items-center gap-6 min-w-[240px]">
          {/* Performance */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <Badge variant={item.status === 'published' ? 'success' : item.status === 'scheduled' ? 'warning' : 'default'}>
              {statusText[item.status]}
            </Badge>
            {item.metrics && (
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-label-sm">
                  <Eye size={10} /> {item.metrics.views}
                </div>
                <div className="flex items-center gap-1 text-label-sm">
                  <Zap size={10} /> {item.metrics.engagement}
                </div>
                <div className="text-label-sm">
                  {item.metrics.comparison}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">
              <Edit3 size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">
              <ExternalLink size={16} />
            </button>
            {item.metrics?.isTopPerformer && (
              <button className="px-3 py-1.5 bg-brand-600 text-white text-label-sm rounded-lg hover:bg-brand-700 transition-all flex items-center gap-1.5">
                <Zap size={12} /> Boost
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hover Preview */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 z-50 w-64 bg-white rounded-lg border border-gray-100 overflow-hidden pointer-events-none"
          >
            <div className="aspect-video bg-gray-100">
              <img src={item.previewImage} alt="preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <PlatformIcon platform={item.platform} size={12} />
                <span className="text-label-sm">Preview</span>
              </div>
              <p className="text-body-md text-gray-600 italic leading-relaxed line-clamp-3">
                "{item.captionSnippet}"
              </p>
              <div className="pt-2 border-t border-gray-50 flex items-center gap-1.5 text-label-sm text-brand-600">
                <Info size={10} /> AI Reasoning: {item.aiReasoning.slice(0, 40)}...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InsightStrip = ({ insight }: { insight: AIInsight }) => (
  <div className="bg-brand-50/50 rounded-lg border border-brand-100/50 p-4 flex items-center gap-3">
    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-brand-500">
      {insight.icon}
    </div>
    <p className="text-sm font-bold text-brand-700">{insight.text}</p>
    <div className="flex-grow" />
    <button className="text-label-sm text-brand-600 hover:underline">
      View Details
    </button>
  </div>
);

const WhatsNextPanel = ({ nextItem }: { nextItem: TimelineItem }) => (
  <Card className="bg-gray-900 text-white border-none">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-label-sm">What's Next</h3>
        <Badge variant="warning">Upcoming</Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
          <PlatformIcon platform={nextItem.platform} size={24} />
        </div>
        <div>
          <h4 className="text-sm font-bold">{nextItem.title}</h4>
          <p className="text-body-md text-gray-400">{nextItem.time} • Tomorrow</p>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
        <div className="flex items-center gap-2 text-brand-400">
          <Sparkles size={16} />
          <span className="text-body-md font-bold">AI Recommendation</span>
        </div>
        <p className="text-body-md text-gray-300 leading-relaxed">
          "This post is performing well in similar markets. Consider boosting it to reach 2,500+ more local buyers."
        </p>
        <div className="flex gap-2 pt-2">
          <button className="flex-grow py-2 bg-white/10 hover:bg-white/20 text-body-md font-bold rounded-lg transition-all">
            Review
          </button>
          <button className="flex-grow py-2 bg-brand-500 hover:bg-brand-600 text-body-md font-bold rounded-lg transition-all">
            Apply Suggestion
          </button>
        </div>
      </div>
    </div>
  </Card>
);

const Calendar = ({ items }: { items: TimelineItem[] }) => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-7 border-b border-gray-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-4 text-center text-label-sm">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map(day => {
              const dayItems = items.filter(item => new Date(item.date).getDate() === day);
              return (
                <div 
                  key={day} 
                  className="min-h-[120px] p-2 border-r border-b border-gray-50 last:border-r-0 group hover:bg-gray-50/50 transition-colors"
                >
                  <div className="text-label-sm text-gray-300 mb-2 group-hover:text-gray-500">{day}</div>
                  <div className="space-y-1">
                    {dayItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="w-full p-1.5 rounded-lg bg-white border border-gray-100 flex items-center justify-between hover:border-brand-300 transition-all"
                      >
                        <PlatformIcon platform={item.platform} size={10} />
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          item.status === 'published' ? 'bg-success-500' : 
                          item.status === 'scheduled' ? 'bg-warning-500' : 'bg-brand-500'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-label-sm">Content Details</h4>
                <button onClick={() => setSelectedItem(null)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X size={16} className="text-gray-400" />
                </button>
              </div>

              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img src={selectedItem.previewImage} alt="preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-bold text-gray-900">{selectedItem.title}</h5>
                  <p className="text-body-md text-gray-500">{selectedItem.time} • {selectedItem.date}</p>
                </div>

                <div className="p-4 bg-brand-50 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-brand-600">
                    <Sparkles size={14} />
                    <span className="text-label-sm text-brand-600">AI Reasoning</span>
                  </div>
                  <p className="text-body-md text-brand-700 leading-relaxed italic">
                    "{selectedItem.aiReasoning}"
                  </p>
                </div>

                {selectedItem.metrics && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-label-sm block mb-1">Views</span>
                      <span className="text-sm font-bold">{selectedItem.metrics.views}</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-label-sm block mb-1">Engagement</span>
                      <span className="text-sm font-bold">{selectedItem.metrics.engagement}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <button className="flex-grow py-3 bg-gray-900 text-white text-body-md font-bold rounded-lg hover:bg-black transition-all">
                    Edit Content
                  </button>
                  <button className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Timeline: React.FC = () => {
  const [view, setView] = useState<'timeline' | 'calendar'>('timeline');

  const groupedItems = useMemo(() => {
    const groups: DayGroup[] = [
      { date: '2026-03-28', label: 'Launch Day', items: MOCK_ITEMS.filter(i => i.date === '2026-03-28') },
      { date: '2026-03-29', label: 'Momentum Phase', items: MOCK_ITEMS.filter(i => i.date === '2026-03-29') },
      { date: '2026-03-31', label: 'Refresh Cycle', items: MOCK_ITEMS.filter(i => i.date === '2026-03-31') },
      { date: '2026-04-01', label: 'Optimization Phase', items: MOCK_ITEMS.filter(i => i.date === '2026-04-01') },
      { date: '2026-04-05', label: 'Closing Phase', items: MOCK_ITEMS.filter(i => i.date === '2026-04-05') },
    ];
    return groups.filter(g => g.items.length > 0);
  }, []);

  return (
    <div className="max-w-full mx-auto p-4 md:p-8 space-y-12 pb-32">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-600">
            <Sparkles size={20} />
            <span className="text-label-sm text-brand-600">Smart Marketing Timeline</span>
          </div>
          <h1 className="text-display-lg">Everything your AI is doing to sell this listing</h1>
          <p className="text-body-lg max-w-lg">Your assistant is actively managing 5 channels to maximize exposure and buyer intent.</p>
        </div>

        <div className="flex items-center bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setView('timeline')}
            className={`px-4 py-2 rounded-lg text-body-md font-bold transition-all flex items-center gap-2 ${view === 'timeline' ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List size={16} /> Timeline
          </button>
          <button 
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg text-body-md font-bold transition-all flex items-center gap-2 ${view === 'calendar' ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <CalendarIcon size={16} /> Calendar
          </button>
        </div>
      </header>

      {view === 'timeline' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-12">
            {groupedItems.map((group, groupIndex) => (
              <div key={group.date} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-gray-900 text-white text-label-sm rounded-lg">
                    {new Date(group.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="h-px flex-grow bg-gray-100" />
                  <div className="text-label-sm">{group.label}</div>
                </div>

                <div className="space-y-4">
                  {group.items.map((item, itemIndex) => (
                    <React.Fragment key={item.id}>
                      <ActivityCard item={item} />
                      {((groupIndex * 2) + itemIndex + 1) % 3 === 0 && (
                        <InsightStrip insight={MOCK_INSIGHTS[((groupIndex * 2) + itemIndex + 1) / 3 - 1] || MOCK_INSIGHTS[0]} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <WhatsNextPanel nextItem={MOCK_ITEMS[3]} />
              
              <div className="bg-white rounded-lg border border-gray-100 p-6 space-y-4">
                <h4 className="text-label-sm">Performance Summary</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-body-md text-gray-500">Total Reach</span>
                    <span className="text-sm font-bold">12.4k</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-md text-gray-500">Avg. Engagement</span>
                    <span className="text-sm font-bold text-success-500">6.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-md text-gray-500">Lead Conversion</span>
                    <span className="text-sm font-bold">4.8%</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-gray-50 text-gray-900 text-body-md font-bold rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                  Full Analytics <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Calendar items={MOCK_ITEMS} />
      )}
    </div>
  );
};

export default Timeline;
