import { prisma } from "@/lib/prisma";
import { main } from "../route";
import { NextResponse } from "next/server";

// ブログ詳細記事取得用API
export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    // params.id をそのまま使い、idを数値に変換
    const id = parseInt((await params).id);

    await main();
    // Prismaを使ってデータベースから投稿を取得
    const post = await prisma.post.findFirst({ where: { id } });

    // 結果を返す
    return NextResponse.json({ message: "success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    // Prismaの接続を終了
    await prisma.$disconnect();
  }
};

//ブログ記事編集用API
export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
  res: NextResponse
) => {
  try {
    const id: number = parseInt((await params).id);
    const { title, description } = await req.json();
    await main();

    const put = await prisma.post.update({
      data: { title, description },
      where: { id },
    });
    return NextResponse.json({ message: "success", put }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};

//ブログ記事削除用API
export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
  res: NextResponse
) => {
  try {
    const id: number = parseInt((await params).id);
    await main();

    const put = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({ message: "success", put }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};
