import jsonwebtoken from "jsonwebtoken";

export function GenerateJWTToken(
  payload: string | object | Buffer<ArrayBufferLike>
): string {
  const secretKey: string = process.env.JWT_SECRET as string;
  return jsonwebtoken.sign(payload, secretKey);
}

export function CompareToken(token: string): jsonwebtoken.JwtPayload | string {
  const secretKey: string = process.env.JWT_SECRET as string;
  return jsonwebtoken.verify(token, secretKey);
}
