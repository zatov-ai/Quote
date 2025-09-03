import React from 'react';
import { BarChart3, Link, MousePointer, TrendingUp } from 'lucide-react';
import { URLStats } from '../types';

interface StatsProps {
  stats: URLStats;
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-600">Total URLs</h4>
          <Link className="w-5 h-5 text-blue-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{stats.totalUrls}</p>
        <p className="text-xs text-gray-500 mt-1">All time</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-600">Total Clicks</h4>
          <MousePointer className="w-5 h-5 text-green-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{stats.totalClicks}</p>
        <p className="text-xs text-gray-500 mt-1">All links</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-600">Active URLs</h4>
          <TrendingUp className="w-5 h-5 text-purple-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{stats.activeUrls}</p>
        <p className="text-xs text-gray-500 mt-1">Currently active</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-600">Avg. Clicks</h4>
          <BarChart3 className="w-5 h-5 text-orange-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {stats.totalUrls > 0 ? Math.round(stats.totalClicks / stats.totalUrls) : 0}
        </p>
        <p className="text-xs text-gray-500 mt-1">Per URL</p>
      </div>
    </div>
  );
}