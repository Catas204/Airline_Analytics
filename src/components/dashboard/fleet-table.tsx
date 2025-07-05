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
import { Badge } from '@/components/ui/badge';
import type { Aircraft } from '@/lib/types';
import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';


interface FleetTableProps {
  data: Aircraft[];
}

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
    Active: 'default',
    Maintenance: 'secondary',
    Grounded: 'destructive',
}


export function FleetTable({ data }: FleetTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aircraft Details</CardTitle>
        <CardDescription>A detailed list of all aircraft in the fleet.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID / Tail Number</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden md:table-cell text-right">Capacity</TableHead>
                <TableHead className="hidden md:table-cell text-right">Age (years)</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((aircraft) => (
                <TableRow key={aircraft.id}>
                  <TableCell className="font-medium">{aircraft.id}</TableCell>
                  <TableCell>{aircraft.model}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[aircraft.status]}>{aircraft.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{aircraft.location}</TableCell>
                  <TableCell className="hidden md:table-cell text-right">{aircraft.capacity}</TableCell>
                  <TableCell className="hidden md:table-cell text-right">{aircraft.age}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
