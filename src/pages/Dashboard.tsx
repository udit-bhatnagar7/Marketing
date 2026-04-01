import React, { useState, ReactNode } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Clock, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Zap,
  ShieldCheck,
  Layout as LayoutIcon,
  Plus,
  Mail,
  Megaphone,
  Check,
  SquarePen,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import { useStrategy } from '../context/StrategyContext';

const Dashboard: React.FC = () => {
  const { listingData, strategy } = useStrategy();
  const [showDetails, setShowDetails] = useState(false);

  if (!strategy) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <p className="text-gray-500">No strategy generated yet.</p>
      <Link to="/create" className="bg-brand-600 text-white px-6 py-3 rounded-lg font-bold">
        Create Your First Strategy
      </Link>
    </div>
  );

  return (
    <div className="max-w-full mx-auto p-4 md:p-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-display-md">Listing Performance</h1>
          <p className="text-body-md font-medium">{listingData.address} • {strategy.listingDuration}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/campaigns"
            className="px-4 py-2 text-body-md font-bold text-brand-600 hover:bg-brand-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <LayoutIcon size={16} /> View All Campaigns
          </Link>
          <div className="w-px h-6 bg-gray-200 mx-2" />
          <Link 
            to="/create"
            className="px-4 py-2 text-body-md font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={16} /> New Campaign
          </Link>
          <div className="w-px h-6 bg-gray-200 mx-2" />
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </header>

      {/* 1. AI Confidence + Reasoning Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-brand-50/50 to-white border-brand-100 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-brand-100 w-full md:w-40">
              <span className="text-label-sm text-brand-600 mb-1">Confidence</span>
              <div className="text-display-lg text-gray-900">{strategy.confidence}%</div>
              <div className="mt-2 flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <Zap key={i} size={12} className={i <= Math.round(strategy.confidence / 20) ? "text-brand-500 fill-brand-500" : "text-gray-200"} />
                ))}
              </div>
            </div>
            
            <div className="flex-grow space-y-4">
              <div className="flex items-center gap-2 text-brand-600">
                <Sparkles size={18} />
                <h2 className="font-semibold">Here’s why I chose this strategy</h2>
              </div>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {strategy.reasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-[11px] font-semibold text-gray-400 hover:text-brand-600 flex items-center gap-1 transition-colors group"
                >
                  {showDetails ? 'Hide details' : 'View full reasoning details'}
                  {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-4 bg-white/50 rounded-lg border border-gray-100 text-body-md leading-relaxed">
                        {strategy.detailedReasoning}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* 2. Expected vs Actual Performance */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-label-sm">Performance Proof</h3>
              <div className="flex items-center gap-4 text-label-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                  <span className="text-gray-400">Expected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-success-500" />
                  <span className="text-gray-600">Actual</span>
                </div>
              </div>
            </div>
            
            <Card className="space-y-8">
              {strategy.performanceMetrics.map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-semibold text-gray-700">{metric.label}</span>
                    <div className="text-right">
                      <span className="text-lg font-bold">{metric.actual}{metric.suffix}</span>
                      <span className="text-body-md text-gray-400 ml-1">/ {metric.expected}{metric.suffix}</span>
                    </div>
                  </div>
                  <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((metric.expected / Math.max(metric.expected, metric.actual, 1)) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="absolute top-0 left-0 h-full bg-gray-200 z-10" 
                    />
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((metric.actual / Math.max(metric.expected, metric.actual, 1)) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className={`absolute top-0 left-0 h-full ${metric.color.includes('bg-') ? metric.color : 'bg-brand-500'} z-20`} 
                    />
                  </div>
                </div>
              ))}
              
              <div className="pt-4 flex flex-col md:flex-row gap-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp size={16} className="text-success-500" />
                  <span className="text-gray-600 font-medium">{strategy.performanceInsight}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck size={16} className="text-brand-500" />
                  <span className="text-gray-600 font-medium">{strategy.marketPosition}</span>
                </div>
              </div>
            </Card>
          </section>

          {/* 3. Content Performance Highlights */}
          <section className="space-y-4">
            <h3 className="text-label-sm">Top Performing Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategy.topContent.map((content, i) => (
                <Card key={i} className="p-0 overflow-hidden card-hover flex flex-col">
                  <div className="relative h-40 bg-gray-200">
                    <img src={content.imageUrl} alt="content" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-3 left-3">
                      <Badge variant={i === 0 ? 'success' : 'info'}>{content.badge}</Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center">
                      {content.platform === 'instagram' ? <Instagram size={16} className="text-pink-600" /> : 
                       content.platform === 'facebook' ? <Facebook size={16} className="text-blue-600" /> :
                       <LayoutIcon size={16} className="text-gray-600" />}
                    </div>
                  </div>
                  <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                    <div className="space-y-1">
                      <p className="text-label-sm">{content.stats}</p>
                      <p className="text-sm text-gray-600 font-medium leading-snug">{content.insight}</p>
                    </div>
                    <button className="text-body-md font-bold text-brand-600 flex items-center gap-1 group">
                      View Post <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* 4. AI Actions / Recommendations */}
          <section className="space-y-4">
            <h3 className="text-label-sm">What you should do next</h3>
            <div className="space-y-3">
              {strategy.actions.map((action, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 4 }}
                  className="bg-white rounded-lg border border-gray-100 p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                      {action.type === 'boost' ? <Zap size={18} className="text-brand-500" /> : 
                       action.type === 'refresh' ? <Clock size={18} className="text-warning-500" /> : 
                       <Users size={18} className="text-success-500" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{action.title}</h4>
                      <p className="text-body-md">{action.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right">
                      <span className="text-label-sm block">Est. Impact</span>
                      <span className="text-body-md font-bold text-success-500">{action.impact}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-body-md font-bold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">Review</button>
                      <button 
                        className="px-3 py-1.5 text-body-md font-bold bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          
          {/* Agentic Inbox */}
          <section className="space-y-4">
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="p-5 border-b border-border flex items-center justify-between bg-white">
                <div>
                  <h3 className="font-display font-bold text-foreground">Agentic Inbox</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">3 items awaiting approval</p>
                </div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary/10 text-primary border-primary/20 text-xs">
                  3 pending
                </div>
              </div>
              <div className="divide-y divide-border bg-white">
                {/* Item 1: Instagram */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Instagram size={16} className="text-brand-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground truncate">Just Listed: Lakefront Living at Its Finest</span>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">2h ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">Wake up to panoramic Lake Travis views from this stunning 5BR estate. Chef's kitchen with Sub-Zero & Wolf. Resort-style infinity pool. Private dock.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-secondary text-secondary-foreground font-medium">Instagram</span>
                        <span className="text-[10px] text-muted-foreground">1200 Lake Shore Blvd</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button className="p-1.5 text-success-500 hover:bg-success-50 rounded-sm transition-colors" title="Approve">
                        <Check size={14} />
                      </button>
                      <button className="p-1.5 text-brand-600 hover:bg-brand-50 rounded-sm transition-colors" title="Edit">
                        <SquarePen size={14} />
                      </button>
                      <button className="p-1.5 text-danger-500 hover:bg-danger-50 rounded-sm transition-colors" title="Dismiss">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Item 2: Email */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail size={16} className="text-brand-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground truncate">New Listing Alert: Circle C Ranch Gem</span>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">4h ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">I'm excited to share this beautiful 4-bedroom home in one of Austin's most sought-after neighborhoods. Updated kitchen, private backyard oasis...</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-secondary text-secondary-foreground font-medium">Email</span>
                        <span className="text-[10px] text-muted-foreground">789 Barton Creek Dr</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button className="p-1.5 text-success-500 hover:bg-success-50 rounded-sm transition-colors" title="Approve">
                        <Check size={14} />
                      </button>
                      <button className="p-1.5 text-brand-600 hover:bg-brand-50 rounded-sm transition-colors" title="Edit">
                        <SquarePen size={14} />
                      </button>
                      <button className="p-1.5 text-danger-500 hover:bg-danger-50 rounded-sm transition-colors" title="Dismiss">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Item 3: Meta Ads */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Megaphone size={16} className="text-brand-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground truncate">Downtown Austin Luxury Condo — Open House Saturday</span>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">5h ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">22nd floor views. Walk to everything. 2BR/2BA with floor-to-ceiling windows. Starting at $725K. RSVP for exclusive preview.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-secondary text-secondary-foreground font-medium">Meta Ads</span>
                        <span className="text-[10px] text-muted-foreground">345 Congress Ave #2201</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button className="p-1.5 text-success-500 hover:bg-success-50 rounded-sm transition-colors" title="Approve">
                        <Check size={14} />
                      </button>
                      <button className="p-1.5 text-brand-600 hover:bg-brand-50 rounded-sm transition-colors" title="Edit">
                        <SquarePen size={14} />
                      </button>
                      <button className="p-1.5 text-danger-500 hover:bg-danger-50 rounded-sm transition-colors" title="Dismiss">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 5. Lead Quality Intelligence */}
          <section className="space-y-4">
            <h3 className="text-label-sm">Lead Intelligence</h3>
            <Card className="space-y-6">
              <div className="space-y-4">
                {[
                  { label: 'High Intent', count: strategy.leads.high.count, color: 'bg-danger-500', icon: '🔥', summary: strategy.leads.high.summary },
                  { label: 'Medium', count: strategy.leads.medium.count, color: 'bg-warning-500', icon: '⚠️', summary: strategy.leads.medium.summary },
                  { label: 'Low', count: strategy.leads.low.count, color: 'bg-gray-300', icon: '❄️', summary: strategy.leads.low.summary },
                ].map((lead) => (
                  <div key={lead.label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{lead.icon}</span>
                        <span className="text-body-md font-bold text-gray-700">{lead.label}</span>
                      </div>
                      <span className="text-sm font-bold">{lead.count}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                      <div className={`h-full ${lead.color}`} style={{ width: `${(lead.count / 100) * 100}%` }} />
                    </div>
                    <p className="text-label-sm">{lead.summary}</p>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-danger-50 rounded-lg border border-danger-50 space-y-3">
                <div className="flex items-center gap-2 text-danger-500">
                  <AlertCircle size={16} />
                  <span className="text-body-md font-bold">Action Required</span>
                </div>
                <p className="text-body-md font-medium leading-relaxed">
                  {strategy.leads.high.count} high-intent buyers need follow-up. {strategy.leads.high.action}
                </p>
                <button className="w-full py-2 bg-white text-danger-500 text-body-md font-bold rounded-lg border border-danger-100 hover:bg-danger-500 hover:text-white transition-all">
                  Contact Now
                </button>
              </div>
            </Card>
          </section>

          {/* 6. Timeline / Activity Feed */}
          <section className="space-y-4">
            <h3 className="text-label-sm">Activity Feed</h3>
            <div className="relative space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
              {strategy.activityFeed.map((activity, i) => (
                <div key={i} className="relative pl-8 space-y-1">
                  <div className={`absolute left-0 top-0.5 w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 border-white ${
                    activity.type === 'ai' ? 'bg-brand-50 text-brand-500' : 
                    activity.type === 'lead' ? 'bg-danger-50 text-danger-500' : 'bg-gray-50 text-gray-500'
                  }`}>
                    {activity.iconType === 'sparkles' ? <Sparkles size={12} /> :
                     activity.iconType === 'users' ? <Users size={12} /> :
                     activity.iconType === 'instagram' ? <Instagram size={12} /> :
                     activity.iconType === 'facebook' ? <Facebook size={12} /> :
                     <Clock size={12} />}
                  </div>
                  <p className="text-body-md font-medium text-gray-700 leading-snug">{activity.text}</p>
                  <p className="text-label-sm">{activity.time}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Trust Indicators */}
          <section className="pt-4 flex flex-wrap gap-3">
            {[
              { text: 'Fair Housing Checked', icon: <ShieldCheck size={12} /> },
              { text: 'Brand Compliant', icon: <CheckCircle2 size={12} /> },
              { text: 'Auto-optimized', icon: <Zap size={12} /> },
            ].map((trust, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-100 rounded-sm">
                <span className="text-success-500">{trust.icon}</span>
                <span className="text-label-sm text-gray-500 tracking-tight">{trust.text}</span>
              </div>
            ))}
          </section>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
