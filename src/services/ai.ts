import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface AIStrategyResponse {
  confidence: number;
  reasons: string[];
  detailedReasoning: string;
  actions: {
    title: string;
    reason: string;
    impact: string;
    type: 'boost' | 'refresh' | 'event';
  }[];
  leads: {
    high: { count: number; summary: string; action: string };
    medium: { count: number; summary: string };
    low: { count: number; summary: string };
  };
  performanceInsight: string;
  marketPosition: string;
  performanceMetrics: {
    label: string;
    expected: number;
    actual: number;
    suffix: string;
    color: string;
  }[];
  topContent: {
    platform: 'instagram' | 'facebook' | 'tiktok' | 'linkedin';
    stats: string;
    badge: string;
    insight: string;
    imageUrl: string;
  }[];
  activityFeed: {
    time: string;
    text: string;
    type: 'ai' | 'lead' | 'system';
    iconType: 'sparkles' | 'users' | 'instagram' | 'facebook' | 'clock';
  }[];
  listingDuration: string;
}

export async function generateMarketingStrategy(listingDetails: string): Promise<AIStrategyResponse> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this real estate listing and generate a marketing strategy dashboard data. 
    Listing Details: ${listingDetails}
    
    Provide the response in JSON format matching the requested schema.
    The tone should be professional, human, and helpful (assistant-like).
    Confidence should be between 80 and 98.
    Reasons should be 3-4 bullet points.
    Detailed reasoning should be a short paragraph explaining the data-driven "why".
    Actions should be 3 specific next steps.
    Leads should be a realistic breakdown (High: 1-5, Medium: 5-20, Low: 20-100). High intent leads should include a specific 'action' string like "They've visited the virtual tour 3+ times."
    Performance insight should be a one-liner like "Performing 28% better than similar listings".
    Market position should be a string like "Top 15% in your market".
    Performance metrics should include Impressions, Engagement, and Leads.
    Top content should include 2 items with realistic stats and insights.
    Activity feed should include 3 recent events.
    Listing duration should be a string like "Active for 14 days".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          confidence: { type: Type.NUMBER },
          reasons: { type: Type.ARRAY, items: { type: Type.STRING } },
          detailedReasoning: { type: Type.STRING },
          actions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                reason: { type: Type.STRING },
                impact: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['boost', 'refresh', 'event'] }
              },
              required: ['title', 'reason', 'impact', 'type']
            }
          },
          leads: {
            type: Type.OBJECT,
            properties: {
              high: { 
                type: Type.OBJECT, 
                properties: { 
                  count: { type: Type.NUMBER }, 
                  summary: { type: Type.STRING },
                  action: { type: Type.STRING }
                },
                required: ['count', 'summary', 'action']
              },
              medium: { 
                type: Type.OBJECT, 
                properties: { count: { type: Type.NUMBER }, summary: { type: Type.STRING } },
                required: ['count', 'summary']
              },
              low: { 
                type: Type.OBJECT, 
                properties: { count: { type: Type.NUMBER }, summary: { type: Type.STRING } },
                required: ['count', 'summary']
              }
            },
            required: ['high', 'medium', 'low']
          },
          performanceInsight: { type: Type.STRING },
          marketPosition: { type: Type.STRING },
          performanceMetrics: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                expected: { type: Type.NUMBER },
                actual: { type: Type.NUMBER },
                suffix: { type: Type.STRING },
                color: { type: Type.STRING }
              },
              required: ['label', 'expected', 'actual', 'suffix', 'color']
            }
          },
          topContent: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING, enum: ['instagram', 'facebook', 'tiktok', 'linkedin'] },
                stats: { type: Type.STRING },
                badge: { type: Type.STRING },
                insight: { type: Type.STRING },
                imageUrl: { type: Type.STRING }
              },
              required: ['platform', 'stats', 'badge', 'insight', 'imageUrl']
            }
          },
          activityFeed: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                text: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['ai', 'lead', 'system'] },
                iconType: { type: Type.STRING, enum: ['sparkles', 'users', 'instagram', 'facebook', 'clock'] }
              },
              required: ['time', 'text', 'type', 'iconType']
            }
          },
          listingDuration: { type: Type.STRING }
        },
        required: ['confidence', 'reasons', 'detailedReasoning', 'actions', 'leads', 'performanceInsight', 'performanceMetrics', 'topContent', 'activityFeed', 'listingDuration']
      }
    }
  });

  return JSON.parse(response.text);
}
