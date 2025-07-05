'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Plane, Users, Bot, LineChart, Activity, CreditCard, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LineChart },
    { href: '/fleet', label: 'Fleet Management', icon: Plane },
    { href: '/passengers', label: 'Passenger Insights', icon: Users },
    { href: '/operations', label: 'Operations', icon: Activity, disabled: true },
    { href: '/finance', label: 'Finance', icon: CreditCard, disabled: true },
    { href: '/reports', label: 'Reports', icon: Bot, disabled: true },
    { href: '/settings', label: 'Settings', icon: Settings, disabled: true },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Plane className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold tracking-tight font-headline">AirDemand</h2>
            <p className="text-xs text-muted-foreground">Insights Platform</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                isActive={pathname === item.href}
                disabled={item.disabled}
                tooltip={{ children: item.label, side: 'right', align: 'center' }}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        <div className="flex items-center gap-3 p-2 rounded-md bg-sidebar-accent">
           <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium">Aviator</p>
            <p className="text-xs text-muted-foreground">aviator@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
