import React from 'react';
import { Shipment } from '../types';
import { BarChart3, TrendingUp, DollarSign, Clock, Package, Truck } from 'lucide-react';

interface AnalyticsProps {
  shipments: Shipment[];
}

export function Analytics({ shipments }: AnalyticsProps) {
  const totalShipments = shipments.length;
  const totalSpent = shipments.reduce((sum, s) => sum + (s.rate?.totalRate || 0), 0);
  const avgTransitTime = shipments.length > 0 
    ? shipments.reduce((sum, s) => sum + (s.rate?.transitTime || 0), 0) / shipments.length 
    : 0;
  const deliveredShipments = shipments.filter(s => s.status === 'delivered').length;
  const deliveryRate = totalShipments > 0 ? (deliveredShipments / totalShipments) * 100 : 0;

  const stats = [
    {
      title: 'Total Shipments',
      value: totalShipments.toString(),
      icon: <Package className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent.toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Avg Transit Time',
      value: `${avgTransitTime.toFixed(1)} days`,
      icon: <Clock className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Delivery Rate',
      value: `${deliveryRate.toFixed(1)}%`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentActivity = shipments
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {recentActivity.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <span>Recent Activity</span>
          </h3>
          
          <div className="space-y-4">
            {recentActivity.map((shipment) => (
              <div
                key={shipment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {shipment.origin.city} → {shipment.destination.city}
                    </p>
                    <p className="text-sm text-gray-600">
                      {shipment.freight.weight.toLocaleString()} lbs • {shipment.freight.type.toUpperCase()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {shipment.rate ? `$${shipment.rate.totalRate.toLocaleString()}` : 'Pending'}
                  </p>
                  <p className="text-sm text-gray-600 capitalize">
                    {formatStatus(shipment.status)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function formatStatus(status: string): string {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}