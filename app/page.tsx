"use client";

import supabase from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Home = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (signInError) {
        throw signInError;
      }
      await router.push("/blog/all");
    } catch {
      alert("Error occured");
    }
  };

  return (
    <div className="w-full m-auto flex my-4">
      <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-700 font-bold p-3">Get Started !!</p>
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input
            placeholder="Enter Your Email"
            type="text"
            className="rounded-md px-4 w-full py-2 my-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            placeholder="Enter Your Password"
            type="text"
            className="rounded-md px-4 w-full py-2 my-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"
          >
            Login
          </button>
          <button
            type="button"
            className="font-bold px-4 py-2 bg-blue-200 rounded-lg mx-3 hover:bg-blue-100"
            onClick={() => {
              router.push("/auth/signup");
            }}
          >
            Sign Up
          </button>
          <div className="px-4 w-full py-2 my-10 text-center">
            <Link
              href="/auth/sendemail"
              className="text-blue-500 underline hover:text-blue-700 transition"
            >
              パスワードをお忘れの方はこちら
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
