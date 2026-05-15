import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDashboard() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-9 w-32 bg-muted rounded-lg mb-2" />
        <div className="h-4 w-64 bg-muted rounded-lg" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-3xl bg-background border border-border shadow-sm h-40" />
        ))}
      </div>

      <div className="bg-muted/30 rounded-3xl p-12 h-64 border-2 border-dashed border-border/50" />
    </div>
  );
}
