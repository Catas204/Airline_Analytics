import { AirDemandDashboard } from '@/components/dashboard/air-demand-dashboard';
import { analyzeDemandTrends } from '@/ai/flows/analyze-demand-trends';
import { summarizeHighDemand } from '@/ai/flows/summarize-high-demand';
import type { Route, PriceTrend } from '@/lib/types';

// In a real-world application, this function would fetch data from a live API or a database.
// For this demo, we are using mock data to simulate the data scraping process.
async function getAirDemandData() {
  const mockScrapedData = `
    Scraped Airline Booking Data:
    - Route: New York (JFK) to Los Angeles (LAX), Price: $345, Bookings: 150/day, Trend: +5%
    - Route: San Francisco (SFO) to Chicago (ORD), Price: $280, Bookings: 120/day, Trend: -3%
    - Route: Atlanta (ATL) to Orlando (MCO), Price: $150, Bookings: 250/day, Trend: +10%
    - Route: Dallas (DFW) to Denver (DEN), Price: $210, Bookings: 180/day, Trend: stable
    - Route: London (LHR) to New York (JFK), Price: $620, Bookings: 200/day, Trend: +8%
    - Route: Tokyo (HND) to Honolulu (HNL), Price: $850, Bookings: 160/day, Trend: +12% during holidays
    - Route: Seattle (SEA) to Anchorage (ANC), Price: $310, Bookings: 90/day, Trend: -5% off-season
  `;

  const routesData: Route[] = [
    { id: 1, route: 'New York (JFK) - Los Angeles (LAX)', searches: 1287, price: 345, trend: 'up' },
    { id: 2, route: 'San Francisco (SFO) - Chicago (ORD)', searches: 1120, price: 280, trend: 'down' },
    { id: 3, route: 'Atlanta (ATL) - Orlando (MCO)', searches: 2340, price: 150, trend: 'up' },
    { id: 4, route: 'Dallas (DFW) - Denver (DEN)', searches: 980, price: 210, trend: 'stable' },
    { id: 5, route: 'London (LHR) - New York (JFK)', searches: 1950, price: 620, trend: 'up' },
    { id: 6, route: 'Tokyo (HND) - Honolulu (HNL)', searches: 1550, price: 850, trend: 'up' },
    { id: 7, route: 'Seattle (SEA) - Anchorage (ANC)', searches: 750, price: 310, trend: 'down' },
  ];

  const priceTrendsData: PriceTrend[] = [
    { month: 'Jan', 'Average Price': 320 },
    { month: 'Feb', 'Average Price': 310 },
    { month: 'Mar', 'Average Price': 330 },
    { month: 'Apr', 'Average Price': 350 },
    { month: 'May', 'Average Price': 380 },
    { month: 'Jun', 'Average Price': 420 },
  ];

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
    return {
      analysis: {
        demandTrends: 'AI-powered analysis is unavailable. Please configure your Gemini API key in the .env file.',
        pricingChanges: 'AI-powered analysis is unavailable.',
        popularRoutes: 'AI-powered analysis is unavailable.',
        highDemandPeriods: 'AI-powered analysis is unavailable. Please configure your Gemini API key in the .env file.',
      },
      summary: {
        summary: 'AI-powered summary is unavailable. Please configure your Gemini API key in the .env file to enable this feature.',
      },
      routesData,
      priceTrendsData,
    };
  }

  const analysis = await analyzeDemandTrends({ scrapedData: mockScrapedData });
  const summary = await summarizeHighDemand({ analyzedData: JSON.stringify(analysis) });

  return { analysis, summary, routesData, priceTrendsData };
}

export default async function Home() {
  const { analysis, summary, routesData, priceTrendsData } = await getAirDemandData();

  return (
    <main className="bg-background min-h-screen">
      <AirDemandDashboard
        analysis={analysis}
        summary={summary}
        routesData={routesData}
        priceTrendsData={priceTrendsData}
      />
    </main>
  );
}
