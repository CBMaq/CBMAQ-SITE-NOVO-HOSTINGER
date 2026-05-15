import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/rbac";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth(["ADMIN"]);
    
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status, internalNotes } = body;

    const lead = await db.lead.update({
      where: { id },
      data: {
        status,
        internalNotes,
      },
    });

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error("[LEAD_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth(["ADMIN"]);
    
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { id } = await params;

    const lead = await db.lead.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error("[LEAD_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
