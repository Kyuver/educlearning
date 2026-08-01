import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", err?.message || err);

  const prismaStatusMap: Record<string, number> = {
    P2025: 404, // record not found
    P2002: 409, // unique constraint
    P2003: 400, // foreign key
    P2014: 409, // relation violation
  };

  const status = err?.statusCode || prismaStatusMap[err?.code] || 500;
  const message = err?.message || "Internal server error";

  return res.status(status).json({
    status: "error",
    msg: message,
  });
};
