import { FleetTable } from '@/components/dashboard/fleet-table';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Aircraft, KpiData } from '@/lib/types';
import { Plane, Wrench, CheckCircle, BarChart } from 'lucide-react';

async function getFleetData() {
  const fleetData: Aircraft[] = [
    { id: 'N123UA', model: 'Boeing 787-9', status: 'Active', location: 'SFO', capacity: 252, age: 5 },
    { id: 'N456AA', model: 'Airbus A321', status: 'Active', location: 'JFK', capacity: 188, age: 3 },
    { id: 'N789DL', model: 'Boeing 737-800', status: 'Maintenance', location: 'ATL', capacity: 160, age: 12 },
    { id: 'N111WN', model: 'Boeing 737-700', status: 'Active', location: 'DAL', capacity: 143, age: 15 },
    { id: 'N222AS', model: 'Airbus A320neo', status: 'Active', location: 'SEA', capacity: 178, age: 2 },
    { id: 'N333FR', model: 'Airbus A320', status: 'Grounded', location: 'DEN', capacity: 186, age: 8 },
    { id: 'N444JB', model: 'Embraer E190', status: 'Active', location: 'BOS', capacity: 100, age: 10 },
  ];

  const totalAircraft = fleetData.length;
  const activeAircraft = fleetData.filter(a => a.status === 'Active').length;
  const maintenanceAircraft = fleetData.filter(a => a.status === 'Maintenance').length;
  const averageAge = fleetData.reduce((sum, a) => sum + a.age, 0) / totalAircraft;

  const kpiData: KpiData[] = [
    {
      title: 'Total Aircraft',
      value: totalAircraft,
      icon: Plane,
      description: 'Total aircraft in the fleet',
      colorClassName: 'text-blue-500',
    },
    {
      title: 'Active Aircraft',
      value: `${activeAircraft} (${((activeAircraft / totalAircraft) * 100).toFixed(0)}%)`,
      icon: CheckCircle,
      description: 'Ready for service',
      colorClassName: 'text-green-500',
    },
    {
      title: 'In Maintenance',
      value: maintenanceAircraft,
      icon: Wrench,
      description: 'Currently undergoing maintenance',
      colorClassName: 'text-amber-500',
    },
    {
      title: 'Average Fleet Age',
      value: `${averageAge.toFixed(1)} years`,
      icon: BarChart,
      description: 'Average age of all aircraft',
      colorClassName: 'text-purple-500',
    },
  ];

  return { fleetData, kpiData };
}

export default async function FleetPage() {
  const { fleetData, kpiData } = await getFleetData();

  return (
    <main className="p-4 md:p-8">
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Fleet Management</h1>
        <p className="text-muted-foreground">Overview of your entire aircraft fleet.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>
      <FleetTable data={fleetData} />
    </div>
    </main>
  );
}
