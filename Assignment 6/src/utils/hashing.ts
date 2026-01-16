import bcrypt from "bcrypt";

export async function GetHash(plainData: string): Promise<string> {
  const salt: number = 10;
  return bcrypt.hash(plainData, salt);
}

export async function CompareHash(
  plainData: string,
  hashedData: string
): Promise<boolean> {
  return bcrypt.compare(plainData, hashedData);
}
