"use client";

import supabase from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";

const getUserData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/user?userId=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data;
};

const Header = () => {
  const [userName, setUserName] = useState("guest");
  const [profile, setProfile] = useState("");

  // ログイン・ログアウトイベント監視
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        try {
          const data = await getUserData(session.user.id);
          setUserName(data.user.user_name);
          setProfile(data.user.profile);
        } catch (err) {
          console.log("user_name fetch failed after login", err);
        }
      } else if (event === "SIGNED_OUT") {
        setUserName("guest");
        setProfile("");
      }
    });

    return () => subscription.unsubscribe(); // cleanup
  }, []);

  return (
    <header className="w-full bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-extrabold">Full Stack Blog</h1>
      <div className="mr-6 group flex flex-col justify-center relative">
        <div className="text-sm font-semibold cursor-pointer">{userName}</div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-4 bg-white border border-gray-300 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Profile profile={profile} />
        </div>
      </div>
    </header>
  );
};

export default Header;
