import { PassengerInsights } from '@/components/dashboard/passenger-insights';
import type { PassengerData, BookingBehavior } from '@/lib/types';

async function getPassengerData() {
    const passengerData: PassengerData[] = [
        { name: "John Doe", ageGroup: '25-34', loyaltyTier: 'Gold', totalSpent: 12500 },
        { name: "Jane Smith", ageGroup: '35-44', loyaltyTier: 'Silver', totalSpent: 8200 },
        { name: "Emily Jones", ageGroup: '18-24', loyaltyTier: 'None', totalSpent: 500 },
        { name: "Michael Brown", ageGroup: '45-54', loyaltyTier: 'Gold', totalSpent: 25000 },
        { name: "Chris Wilson", ageGroup: '25-34', loyaltyTier: 'Bronze', totalSpent: 2100 },
        { name: "Jessica Garcia", ageGroup: '55+', loyaltyTier: 'Silver', totalSpent: 11000 },
        { name: "David Miller", ageGroup: '35-44', loyaltyTier: 'None', totalSpent: 1200 },
    ];

    const bookingBehavior: BookingBehavior[] = [
        { month: 'Jan', bookings: 4000 },
        { month: 'Feb', bookings: 3000 },
        { month: 'Mar', bookings: 5000 },
        { month: 'Apr', bookings: 4500 },
        { month: 'May', bookings: 6000 },
        { month: 'Jun', bookings: 7500 },
    ];

    return { passengerData, bookingBehavior };
}

export default async function PassengersPage() {
    const { passengerData, bookingBehavior } = await getPassengerData();

    return (
        <main className="p-4 md:p-8">
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Passenger Insights</h1>
                <p className="text-muted-foreground">Understanding your customer demographics and behavior.</p>
            </div>
            <PassengerInsights passengerData={passengerData} bookingBehavior={bookingBehavior} />
        </div>
        </main>
    );
}
