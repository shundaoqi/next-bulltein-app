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

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);
    await main();
    const post = await prisma.post.findFirst({ where: { id } }); //http://localhost:3000/api/blog/3
    return NextResponse.json({ message: "success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
