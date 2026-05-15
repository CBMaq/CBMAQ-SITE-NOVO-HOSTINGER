export class AppError extends Error {
  public code: string;
  public details?: any;

  constructor(message: string, code: string = 'INTERNAL_ERROR', details?: any) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    return Response.json(
      { error: { code: error.code, message: error.message, details: error.details } },
      { status: getStatusCode(error.code) }
    );
  }

  // Handle Zod Errors
  if (typeof error === 'object' && error !== null && 'name' in error && (error as any).name === 'ZodError') {
    return Response.json(
      { error: { code: 'VALIDATION_ERROR', message: 'Invalid input data', details: (error as any).issues } },
      { status: 400 }
    );
  }

  // Fallback
  console.error("Unhandled Error: ", error);
  return Response.json(
    { error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } },
    { status: 500 }
  );
};

const getStatusCode = (code: string) => {
  switch (code) {
    case 'BAD_REQUEST':
    case 'VALIDATION_ERROR':
      return 400;
    case 'UNAUTHORIZED':
      return 401;
    case 'FORBIDDEN':
      return 403;
    case 'NOT_FOUND':
      return 404;
    case 'CONFLICT':
      return 409;
    case 'RATE_LIMITED':
      return 429;
    default:
      return 500;
  }
};
