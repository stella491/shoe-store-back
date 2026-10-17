import type { JwtPayload } from "jsonwebtoken";

export interface AuthTokenPayload {
  id: string;
  role: "user" | "admin";
}

export function isAuthTokenPayload(
  decoded: string | JwtPayload,
): decoded is AuthTokenPayload {
  return (
    typeof decoded === "object" &&
    decoded !== null &&
    typeof (decoded as Record<string, unknown>).id === "string" &&
    ((decoded as Record<string, unknown>).role === "user" ||
      (decoded as Record<string, unknown>).role === "admin")
  );
}
