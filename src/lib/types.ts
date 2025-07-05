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
  value: string | number;
  icon: React.ElementType;
  description: string;
  colorClassName: string;
  change?: string;
  changeType?: 'up' | 'down';
};

export type Aircraft = {
  id: string;
  model: string;
  status: 'Active' | 'Maintenance' | 'Grounded';
  location: string;
  capacity: number;
  age: number; // in years
};

export type PassengerData = {
  name: string;
  ageGroup: '18-24' | '25-34' | '35-44' | '45-54' | '55+';
  loyaltyTier: 'Gold' | 'Silver' | 'Bronze' | 'None';
  totalSpent: number;
};

export type BookingBehavior = {
  month: string;
  bookings: number;
};
