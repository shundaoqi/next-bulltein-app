"use client";

import supabase from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
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
    <>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">ログイン画面</p>
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
            <div className="px-4 w-full py-2 my-2 text-blue-500">
              <Link href="/auth/sendemail">forgot your password ?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
