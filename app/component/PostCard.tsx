import React from "react";
import { PostType } from "@/app/types";
import Link from "next/link";

interface Props {
  post: PostType;
}

const getUserData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/user?userId=${id}`, {
    method: "GET",
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = res.json()
  return data
}

const PostCard = async ({ post }: Props) => {
  const data = await getUserData(post.created_by)
  console.log(data.user.user_name)

  return (
    <div>
      <div
        key={post.id}
        className="p-4 rounded-md mx-3 my-2 bg-slate-300 flex flex-col justify-center"
      >
        <div className="flex items-center my-3">
          <div className="mr-auto">
            <h2 className="mr-auto font-semibold">{post.title}.</h2>
          </div>
          <Link
            href={`/blog/edit/${post.id}`}
            className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
          >
            編集
          </Link>
        </div>

        <div className="mr-auto my-1">
          <h2>{post.description}</h2>
        </div>

        <div className="mr-auto my-1">
          <blockquote className="text-xs font-bold text-slate-700">
            投稿者：{data.user.user_name}
          </blockquote>
        </div>

        <div className="mr-auto my-1">
          <blockquote className="text-xs font-bold text-slate-700">
            {new Date(post.date).toDateString()}
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
