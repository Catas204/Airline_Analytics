import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, CheckCircle } from 'lucide-react';

interface RecommendationsCardProps {
  recommendations: string;
}

export function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
    // Simple split, in a real app would be more robust
    const recommendationItems = recommendations.split(/\d+\./).filter(item => item.trim() !== '');

    return (
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-full">
                <Bot className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="font-headline">AI-Powered Recommendations</CardTitle>
            </div>
            <CardDescription>Actionable insights to optimize operations and pricing.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
                {recommendationItems.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 mt-0.5 text-green-500 shrink-0" />
                        <span className="text-sm text-muted-foreground">{rec.trim()}</span>
                    </li>
                ))}
            </ul>
          </CardContent>
        </Card>
    );
}
