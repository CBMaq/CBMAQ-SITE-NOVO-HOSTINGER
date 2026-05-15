import { RegisterUserSchema } from "@/lib/register-schema";
import { handleError } from "@/lib/errors";
import { authService } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = RegisterUserSchema.parse(body);

    const result = await authService.register(data);

    return Response.json(
      { success: true, data: result },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}
