import { Prisma } from "@prisma/client";

export function parsePrisma(json: Prisma.JsonValue) {
    return JSON.parse(json as string) as Object;
  }