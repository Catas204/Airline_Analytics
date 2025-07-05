'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { PassengerData, BookingBehavior } from '@/lib/types';

interface PassengerInsightsProps {
    passengerData: PassengerData[];
    bookingBehavior: BookingBehavior[];
}

const AGE_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];
const TIER_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32", "#d1d5db"];

export function PassengerInsights({ passengerData, bookingBehavior }: PassengerInsightsProps) {
    const ageGroupData = React.useMemo(() => {
        const counts = passengerData.reduce((acc, p) => {
            acc[p.ageGroup] = (acc[p.ageGroup] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [passengerData]);

    const loyaltyTierData = React.useMemo(() => {
        const counts = passengerData.reduce((acc, p) => {
            acc[p.loyaltyTier] = (acc[p.loyaltyTier] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [passengerData]);


    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Monthly Booking Behavior</CardTitle>
                    <CardDescription>Number of bookings over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[250px] w-full">
                       <ResponsiveContainer>
                            <BarChart data={bookingBehavior}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Passenger Demographics</CardTitle>
                    <CardDescription>Breakdown by age group.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ChartContainer config={{}} className="h-[250px] w-full">
                       <ResponsiveContainer>
                            <PieChart>
                                <Pie data={ageGroupData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {ageGroupData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="lg:col-span-5">
                <CardHeader>
                    <CardTitle>Top Customers</CardTitle>
                    <CardDescription>List of high-value passengers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="hidden sm:table-cell">Age Group</TableHead>
                                    <TableHead>Loyalty Tier</TableHead>
                                    <TableHead className="text-right">Total Spent</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {passengerData.sort((a, b) => b.totalSpent - a.totalSpent).map((p) => (
                                    <TableRow key={p.name}>
                                        <TableCell className="font-medium">{p.name}</TableCell>
                                        <TableCell className="hidden sm:table-cell">{p.ageGroup}</TableCell>
                                        <TableCell>
                                            <Badge variant={p.loyaltyTier === 'Gold' ? 'default' : p.loyaltyTier === 'None' ? 'outline' : 'secondary'}>{p.loyaltyTier}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">${p.totalSpent.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
