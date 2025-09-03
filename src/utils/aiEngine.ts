import { QuoteRequest, Rate, AIInsight, Carrier } from '../types';

// Simulated AI engine for freight optimization
export class FreightAI {
  static async generateQuotes(request: QuoteRequest): Promise<Rate[]> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const baseRates = this.calculateBaseRates(request);
    const optimizedRates = this.applyAIOptimization(baseRates, request);
    
    return optimizedRates.sort((a, b) => b.confidence - a.confidence);
  }

  static async getAIInsights(request: QuoteRequest): Promise<AIInsight[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const insights: AIInsight[] = [];
    
    // Cost optimization insight
    insights.push({
      type: 'cost_optimization',
      title: 'Flexible Pickup Date',
      description: 'Moving pickup 2-3 days later could save up to 15% on shipping costs',
      impact: 'medium',
      savings: 245
    });

    // Route optimization
    insights.push({
      type: 'route_optimization',
      title: 'Optimal Route Detected',
      description: 'AI identified a more efficient route through major freight corridors',
      impact: 'high',
      savings: 180
    });

    // Market trends
    insights.push({
      type: 'market_trend',
      title: 'Favorable Market Conditions',
      description: 'Current market rates are 8% below seasonal average',
      impact: 'low'
    });

    return insights;
  }

  private static calculateBaseRates(request: QuoteRequest): Rate[] {
    const distance = this.calculateDistance(request.origin, request.destination);
    const baseRatePerMile = this.getBaseRatePerMile(request.freight.type);
    
    const carriers = this.getMockCarriers();
    
    return carriers.map(carrier => {
      const baseRate = distance * baseRatePerMile * (0.8 + Math.random() * 0.4);
      const fuelSurcharge = baseRate * 0.15;
      const accessorials = this.generateAccessorials(request);
      const totalAccessorials = accessorials.reduce((sum, acc) => sum + acc.cost, 0);
      
      return {
        id: crypto.randomUUID(),
        carrierId: carrier.id,
        baseRate: Math.round(baseRate),
        fuelSurcharge: Math.round(fuelSurcharge),
        accessorials,
        totalRate: Math.round(baseRate + fuelSurcharge + totalAccessorials),
        transitTime: Math.ceil(distance / 500) + Math.floor(Math.random() * 2),
        confidence: Math.round(70 + Math.random() * 30),
        aiRecommendation: this.generateRecommendation(carrier)
      };
    });
  }

  private static applyAIOptimization(rates: Rate[], request: QuoteRequest): Rate[] {
    // AI optimization logic
    return rates.map(rate => ({
      ...rate,
      totalRate: Math.round(rate.totalRate * (0.85 + Math.random() * 0.3)),
      confidence: Math.min(95, rate.confidence + Math.floor(Math.random() * 15))
    }));
  }

  private static calculateDistance(origin: any, destination: any): number {
    // Simplified distance calculation (in reality would use mapping APIs)
    return 500 + Math.random() * 2000;
  }

  private static getBaseRatePerMile(freightType: string): number {
    const rates = {
      ltl: 2.5,
      ftl: 1.8,
      partial: 2.2,
      expedited: 3.5,
      white_glove: 4.0
    };
    return rates[freightType as keyof typeof rates] || 2.0;
  }

  private static getMockCarriers(): Carrier[] {
    return [
      {
        id: '1',
        name: 'Swift Transportation',
        mcNumber: 'MC-123456',
        dotNumber: 'DOT-789012',
        rating: 4.8,
        equipment: ['dry_van', 'refrigerated'],
        coverage: ['US', 'Canada']
      },
      {
        id: '2',
        name: 'Schneider National',
        mcNumber: 'MC-234567',
        dotNumber: 'DOT-890123',
        rating: 4.6,
        equipment: ['dry_van', 'flatbed'],
        coverage: ['US', 'Mexico']
      },
      {
        id: '3',
        name: 'J.B. Hunt',
        mcNumber: 'MC-345678',
        dotNumber: 'DOT-901234',
        rating: 4.7,
        equipment: ['container', 'dry_van'],
        coverage: ['US']
      }
    ];
  }

  private static generateAccessorials(request: QuoteRequest): any[] {
    const accessorials = [];
    
    if (request.freight.hazmat) {
      accessorials.push({
        type: 'hazmat',
        description: 'Hazardous Materials Handling',
        cost: 150
      });
    }

    if (request.freight.weight > 10000) {
      accessorials.push({
        type: 'heavy_freight',
        description: 'Heavy Freight Surcharge',
        cost: 75
      });
    }

    return accessorials;
  }

  private static generateRecommendation(carrier: Carrier): string {
    const recommendations = [
      `${carrier.name} offers excellent reliability for this route`,
      `Recommended for time-sensitive deliveries`,
      `Best value option with strong track record`,
      `Preferred carrier for this freight type`
    ];
    
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  }
}