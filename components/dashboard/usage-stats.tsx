import { Coins, FolderKanban, Rocket } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";

const stats = [
  {
    name: "Credits Used",
    value: "35",
    total: "100",
    icon: Coins,
    progress: 35,
  },
  {
    name: "Total Projects",
    value: "12",
    total: null,
    icon: FolderKanban,
    progress: null,
  },
  {
    name: "Deployments",
    value: "8",
    total: null,
    icon: Rocket,
    progress: null,
  },
];

export default function UsageStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.name} className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <p className="text-2xl font-bold">
                  {stat.value}
                  {stat.total && (
                    <span className="text-sm font-normal text-muted-foreground">
                      {" "}
                      / {stat.total}
                    </span>
                  )}
                </p>
              </div>
            </div>
            {stat.progress !== null && (
              <Progress value={stat.progress} className="mt-3 h-1.5" />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
