import PostCard from "@/app/component/PostCard";
import { PostType } from "@/app/types";
import Link from "next/link";
import React from "react";

const fetchAllBlogs = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store", //SSR
  });

  const data = await res.json();
  return data.posts;
};

const AllBlogs = async () => {
  const posts = await fetchAllBlogs();

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-blue-900 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold">
          Full Stack Blog 📝
        </h1>
      </div>
      {/* Link */}
      <div className="flex my-5">
        <Link
          href={"/blog/add"}
          className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-300 font-semibold"
        >
          ブログ新規作成
        </Link>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {posts.map((post: PostType) => (
          <PostCard key={post.id} post={post}/>
        ))}
      </div>
    </main>
  );
};

export default AllBlogs;
