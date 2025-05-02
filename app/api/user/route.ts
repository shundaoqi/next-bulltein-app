import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const main = async () => {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("fail to connect DB", err || "unknown");
  }
};

// user情報取得API
export const GET = async (req: Request) => {
  try {
    await main();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    return NextResponse.json({ message: "success", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
