'use client';

import type { AnalyzeDemandTrendsOutput } from '@/ai/flows/analyze-demand-trends';
import type { SummarizeHighDemandOutput } from '@/ai/flows/summarize-high-demand';
import type { Route, PriceTrend, KpiData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCard } from './kpi-card';
import { PriceTrendsChart } from './price-trends-chart';
import { PopularRoutesTable } from './popular-routes-table';
import { RecommendationsCard } from './recommendations-card';
import { Plane, TrendingUp, Users, DollarSign, Lightbulb } from 'lucide-react';

interface AirDemandDashboardProps {
  analysis: AnalyzeDemandTrendsOutput;
  summary: SummarizeHighDemandOutput;
  routesData: Route[];
  priceTrendsData: PriceTrend[];
}

export function AirDemandDashboard({ analysis, summary, routesData, priceTrendsData }: AirDemandDashboardProps) {

  const totalSearches = routesData.reduce((acc, route) => acc + route.searches, 0);
  const averagePrice = priceTrendsData.reduce((acc, trend) => acc + trend['Average Price'], 0) / priceTrendsData.length;

  const kpiData: KpiData[] = [
    {
      title: 'Total Routes',
      value: routesData.length,
      description: 'Monitored routes',
      icon: Plane,
      colorClassName: 'text-sky-500',
      change: '+2 this month',
      changeType: 'up',
    },
    {
      title: 'Total Searches',
      value: totalSearches.toLocaleString(),
      description: 'Across all routes',
      icon: Users,
      colorClassName: 'text-amber-500',
      change: '+15.2%',
      changeType: 'up',
    },
    {
      title: 'Avg. Price',
      value: `$${averagePrice.toFixed(2)}`,
      description: 'Across all routes',
      icon: DollarSign,
      colorClassName: 'text-blue-500',
      change: '-1.8%',
      changeType: 'down',
    },
     {
      title: 'High Demand',
      value: 'Rising',
      description: 'Overall market demand',
      icon: TrendingUp,
      colorClassName: 'text-green-500',
      change: 'Peak Season',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your AirDemand Insights dashboard.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.title} {...kpi} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
             <Card className="lg:col-span-1">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/20 rounded-full">
                            <Lightbulb className="h-6 w-6 text-accent-foreground" />
                        </div>
                        <CardTitle className="font-headline">AI Analysis</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 text-sm">
                        <div>
                            <h4 className="font-semibold mb-1">AI Summary</h4>
                            <p className="text-muted-foreground text-xs">{summary.summary}</p>
                         </div>
                         <div>
                            <h4 className="font-semibold mb-1">Demand Trends</h4>
                            <p className="text-muted-foreground text-xs">{analysis.demandTrends}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-1">High-Demand Periods</h4>
                            <p className="text-muted-foreground text-xs">{analysis.highDemandPeriods}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <PriceTrendsChart data={priceTrendsData} />
        </div>

         <RecommendationsCard recommendations={analysis.recommendations} />

        <PopularRoutesTable data={routesData} />
    </div>
  );
}
