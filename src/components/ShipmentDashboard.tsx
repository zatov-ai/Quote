import React from 'react';
import { Shipment } from '../types';
import { Package, MapPin, Clock, Truck, CheckCircle, AlertTriangle, Lightbulb, TrendingDown, Route, Award } from 'lucide-react';

interface ShipmentDashboardProps {
  shipments: Shipment[];
}

export function ShipmentDashboard({ shipments }: ShipmentDashboardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_transit': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'booked': return <Package className="w-5 h-5 text-purple-600" />;
      case 'quoted': return <Clock className="w-5 h-5 text-yellow-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'booked': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'quoted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (shipments.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Shipments Yet</h3>
        <p className="text-gray-600">Create your first quote to get started with AI-powered freight booking</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Recent Shipments</h2>
        <span className="text-sm text-gray-500">{shipments.length} total shipments</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {shipments.map((shipment) => (
          <div
            key={shipment.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(shipment.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Shipment #{shipment.id.slice(0, 8)}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(shipment.status)}`}>
                    {formatStatus(shipment.status)}
                  </span>
                </div>
              </div>
              
              {shipment.rate && (
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    ${shipment.rate.totalRate.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Total Cost</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">From</p>
                  <p className="text-sm text-gray-600 truncate">
                    {shipment.origin.city}, {shipment.origin.state} {shipment.origin.zipCode}, {shipment.origin.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">To</p>
                  <p className="text-sm text-gray-600 truncate">
                    {shipment.destination.city}, {shipment.destination.state} {shipment.destination.zipCode}, {shipment.destination.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{shipment.freight.weight.toLocaleString()} lbs</span>
                  <span>{shipment.freight.pieces} pieces</span>
                  <span className="capitalize">{shipment.freight.type}</span>
                </div>
                
                {shipment.carrier && (
                  <div className="text-sm text-gray-600">
                    {shipment.carrier.name}
                  </div>
                )}
              </div>
            </div>

            {shipment.trackingNumber && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Tracking:</strong> {shipment.trackingNumber}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}