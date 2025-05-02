"use client";

import supabase from "@/lib/supabase";
import React, { useEffect, useState } from "react";

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

  // ログイン・ログアウトイベント監視
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        try {
          const data = await getUserData(session.user.id);
          setUserName(data.user.user_name);
        } catch (err) {
          console.log("user_name fetch failed after login", err);
        }
      } else if (event === "SIGNED_OUT") {
        setUserName("guest");
      }
    });

    return () => subscription.unsubscribe(); // cleanup
  }, []);

  return (
    <header className="w-full bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-extrabold">Full Stack Blog</h1>
      <span className="text-sm">
        <span className="font-semibold">{userName}</span>
      </span>
    </header>
  );
};

export default Header;
