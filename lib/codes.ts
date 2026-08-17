import { customAlphabet } from "nanoid";
import { prisma } from "./db";

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const make = customAlphabet(alphabet, 6);

export async function uniqueCode() {
  for (let i = 0; i < 12; i++) {
    const code = make();
    const exists = await prisma.session.findUnique({ where: { code } });
    if (!exists) return code;
  }
  throw new Error("Could not generate a unique join code");
}
