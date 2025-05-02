"use client";

import supabase from "@/lib/supabase";
import React, { useState } from "react";

const SignUp = () => {
  const [nickName, setNickName] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            user_name: nickName,
            profile: profile,
          },
        },
      });
      if (signUpError) {
        throw signUpError;
      }
      alert("send email for signUp");
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("エラーが発生しました");
    }
  };

  return (
    <>
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-700 font-bold p-3">
            Create your account
          </p>
          <form onSubmit={onSubmit}>
            <label>NickName</label>
            <input
              placeholder="Enter Your NickName"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
            <label>Profile</label>
            <textarea
              placeholder="Enter Your NickName"
              className="rounded-md px-4 w-full py-2 my-2"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
            />
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
            <label>Password (check)</label>
            <input
              placeholder="Confirm Your Password"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
              value={passwordConf}
              onChange={(e) => setPasswordConf(e.target.value)}
            />
            <button
              type="submit"
              className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
