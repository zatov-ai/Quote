import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <div className="py-20 bg-gradient-to-r from-purple-600 to-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold">
            <Sparkles className="w-4 h-4 mr-2" />
            Ready to Transform Your Logistics?
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Start Shipping Smarter Today
          </h2>
          
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Join thousands of businesses already using Zatov AI to optimize their freight operations. 
            Get started in minutes, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="group px-8 py-4 bg-white text-purple-600 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold text-lg flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 transition-all duration-200 font-semibold text-lg">
              Schedule Demo
            </button>
          </div>

          <div className="flex items-center justify-center space-x-8 pt-8 text-purple-100">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Free 30-day trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}