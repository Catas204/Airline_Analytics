export type Route = {
  id: number;
  route: string;
  searches: number;
  price: number;
  trend: 'up' | 'down' | 'stable';
};

export type PriceTrend = {
  month: string;
  'Average Price': number;
};

export type KpiData = {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  colorClassName: string;
};
