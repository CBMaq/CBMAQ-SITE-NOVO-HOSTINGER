import { getJobApplications } from "@/app/actions/job-applications";
import { Button } from "@/components/ui/button";
import { Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { JobApplicationClient } from "@/components/admin/job-applications/JobApplicationClient";

export const dynamic = "force-dynamic";

export default async function CurriculosPage() {
  const applications = await getJobApplications();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold">Gerenciamento de Currículos</h1>
            <p className="text-muted-foreground">Visualize e gerencie os talentos interessados na CBMaq.</p>
          </div>
        </div>
      </div>

      {/* Client List Component */}
      <JobApplicationClient initialApplications={applications} />
    </div>
  );
}
