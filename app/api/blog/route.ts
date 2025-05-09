import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const main = async () => {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("fail to connect DB");
  }
};

// ブログ全記事取得用API
export const GET = async () => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ブログ投稿用API
export const POST = async (req: Request) => {
  try {
    const { title, description, created_by } = await req.json();

    await main();
    const post = await prisma.post.create({ data: { title, description, created_by } });
    return NextResponse.json({ message: "success", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
