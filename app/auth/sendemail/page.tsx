"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";

export default function Sendemail() {
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error: sendEmailError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "http://localhost:3000/passwordReset/",
        });
      if (sendEmailError) {
        throw sendEmailError;
      }
      alert("パスワード設定メールを確認してください");
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  return (
    <>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-700 font-bold p-3">
            Reset your password
          </p>
          <form onSubmit={onSubmit}>
            <label>Email</label>
            <input
              placeholder="Enter Your Email"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"
            >
              send Email
            </button>
            <div className="px-4 w-full py-2 my-2 text-blue-500"></div>
          </form>
        </div>
      </div>
    </>
  );
}
