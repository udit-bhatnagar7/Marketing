import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AIStrategyResponse } from '../services/ai';

interface ListingData {
  address: string;
  price: string;
  description: string;
}

interface StrategyContextType {
  listingData: ListingData;
  setListingData: (data: ListingData) => void;
  strategy: AIStrategyResponse | null;
  setStrategy: (strategy: AIStrategyResponse | null) => void;
}

const StrategyContext = createContext<StrategyContextType | undefined>(undefined);

export const StrategyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listingData, setListingData] = useState<ListingData>({ 
    address: '124 Oakwood Avenue, Austin TX', 
    price: '$850,000', 
    description: '4 beds, 3 baths, pool, modern farmhouse style, open kitchen...' 
  });
  
  const [strategy, setStrategy] = useState<AIStrategyResponse | null>({
    confidence: 94,
    reasons: [
      "High demand for modern farmhouse styles in Austin",
      "Pool adds significant value for mid-summer buyers",
      "Open kitchen layout is a top search filter"
    ],
    detailedReasoning: "Based on current market trends in Austin, properties with these specific features are seeing 24% faster closing times. Our AI has optimized the targeting for young families and relocation buyers.",
    actions: [
      { title: "Boost Instagram Reel", reason: "Video content is outperforming static images by 3x", impact: "Estimated +2,400 views", type: 'boost' },
      { title: "Refresh Facebook Ad", reason: "Ad fatigue detected after 7 days", impact: "Maintain 4.2% CTR", type: 'refresh' },
      { title: "Schedule Open House", reason: "Peak interest predicted for next Saturday", impact: "Expected 15+ attendees", type: 'event' }
    ],
    leads: {
      high: { count: 3, summary: "High-intent buyers", action: "3 visitors have viewed the virtual tour 5+ times." },
      medium: { count: 12, summary: "Active searchers" },
      low: { count: 45, summary: "Browsing" }
    },
    performanceInsight: "Performing 28% better than similar listings",
    marketPosition: "Top 15% in Austin market",
    performanceMetrics: [
      { label: 'Impressions', expected: 12000, actual: 15420, suffix: '', color: 'text-brand-600' },
      { label: 'Engagement', expected: 450, actual: 612, suffix: '', color: 'text-success-600' },
      { label: 'Leads', expected: 15, actual: 18, suffix: '', color: 'text-brand-600' }
    ],
    topContent: [
      { platform: 'instagram', stats: '4.2k views • 128 likes', badge: 'Viral', insight: 'Video walk-through is driving 60% of traffic', imageUrl: 'https://picsum.photos/seed/house1/400/400' },
      { platform: 'facebook', stats: '1.8k reach • 45 shares', badge: 'High Share', insight: 'Neighborhood group shares are peaking', imageUrl: 'https://picsum.photos/seed/house2/400/400' }
    ],
    activityFeed: [
      { time: '2 mins ago', text: 'AI optimized Instagram targeting for relocation buyers', type: 'ai', iconType: 'sparkles' },
      { time: '1 hour ago', text: 'New high-intent lead from Zillow integration', type: 'lead', iconType: 'users' },
      { time: '4 hours ago', text: 'Weekly performance report generated', type: 'system', iconType: 'clock' }
    ],
    listingDuration: "Active for 12 days"
  });

  return (
    <StrategyContext.Provider value={{ listingData, setListingData, strategy, setStrategy }}>
      {children}
    </StrategyContext.Provider>
  );
};

export const useStrategy = () => {
  const context = useContext(StrategyContext);
  if (context === undefined) {
    throw new Error('useStrategy must be used within a StrategyProvider');
  }
  return context;
};
