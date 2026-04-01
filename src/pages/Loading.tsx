import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Skeleton from '../components/ui/Skeleton';

const Loading: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8 min-h-screen flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto"
          >
            <Sparkles className="text-brand-500 w-8 h-8" />
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-display-md">Analyzing market trends...</h2>
            <p className="text-body-md text-gray-400">I'm comparing your listing with 1,200+ similar properties to find the perfect strategy.</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-label-sm">
              <span className="text-brand-600 font-bold">Building Strategy</span>
              <span className="text-brand-600 font-bold">65%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                className="h-full bg-brand-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg md:col-span-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
