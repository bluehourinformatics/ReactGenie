import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function UsageOverview() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Usage Overview</CardTitle>
        <CardDescription>
          Your current billing period: March 1 - March 31, 2026
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Credits Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Credits Used</span>
            <span className="text-sm text-muted-foreground">35 / 100</span>
          </div>
          <Progress value={35} className="h-2" />
          <p className="text-xs text-muted-foreground">
            65 credits remaining this month. Resets on April 1.
          </p>
        </div>

        {/* Projects Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Projects</span>
            <span className="text-sm text-muted-foreground">2 / 3</span>
          </div>
          <Progress value={66} className="h-2" />
          <p className="text-xs text-muted-foreground">
            1 project slot remaining on Free plan.
          </p>
        </div>

        {/* Storage Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Storage</span>
            <span className="text-sm text-muted-foreground">
              124 MB / 500 MB
            </span>
          </div>
          <Progress value={24.8} className="h-2" />
          <p className="text-xs text-muted-foreground">
            376 MB available storage.
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-sm font-medium">Need more credits?</p>
            <p className="text-xs text-muted-foreground">
              Upgrade your plan or purchase additional credits.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Buy Credits
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
