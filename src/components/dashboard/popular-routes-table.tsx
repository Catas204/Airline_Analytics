'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Minus, Plane, Search } from 'lucide-react';
import type { Route } from '@/lib/types';

interface PopularRoutesTableProps {
  data: Route[];
}

export function PopularRoutesTable({ data }: PopularRoutesTableProps) {
  const [filter, setFilter] = React.useState('');

  const filteredData = data.filter((route) =>
    route.route.toLowerCase().includes(filter.toLowerCase())
  );

  const TrendIcon = ({ trend }: { trend: Route['trend'] }) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-full">
                <Plane className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Popular Routes</CardTitle>
            </div>
            <CardDescription>A list of the most in-demand routes based on searches.</CardDescription>
          </div>
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter routes..."
              className="pl-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Route</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Searches</TableHead>
                <TableHead className="text-right">Avg. Price</TableHead>
                <TableHead className="text-center">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.route}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right">{item.searches.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">${item.price}</Badge>
                    </TableCell>
                    <TableCell className="flex justify-center items-center">
                      <TrendIcon trend={item.trend} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No routes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
