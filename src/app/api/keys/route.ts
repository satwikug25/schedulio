import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

const keys = {
  groqApiKey: process.env.GROQ_API_KEY || "",
  cartesiaApiKey: process.env.CARTESIA_API_KEY || "",
};

export async function GET() {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  keys.cartesiaApiKey = "2a751372-576d-4a00-803e-3cdc5ec79b36";
  return NextResponse.json(keys);
}
