import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { KpiData } from '@/lib/types';
import { ArrowUp, ArrowDown } from 'lucide-react';

export function KpiCard({ title, value, icon: Icon, description, colorClassName, change, changeType }: KpiData) {
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn('h-5 w-5 text-muted-foreground', colorClassName)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl sm:text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {change && (
            <div className="mt-2 flex items-center text-xs">
                {changeType && (
                    changeType === 'up' ?
                    <ArrowUp className="h-4 w-4 text-green-500" /> :
                    <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span className={cn("ml-1", changeType === 'up' ? 'text-green-600' : changeType === 'down' ? 'text-red-600' : 'text-muted-foreground')}>{change}</span>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
