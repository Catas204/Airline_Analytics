'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { PriceTrend } from '@/lib/types';
import { TrendingUp } from 'lucide-react';

interface PriceTrendsChartProps {
  data: PriceTrend[];
}

export function PriceTrendsChart({ data }: PriceTrendsChartProps) {
  const chartConfig = {
    'Average Price': {
      label: 'Average Price',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <Card className="lg:col-span-2 transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-full">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-headline">Price Trends</CardTitle>
        </div>
        <CardDescription>Monthly average ticket prices for the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="Average Price" fill="var(--color-Average Price)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
