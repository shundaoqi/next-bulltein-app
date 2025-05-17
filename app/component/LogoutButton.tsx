import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();
  const logout = async (e) => {
    e.preventDefault();
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) {
        throw logoutError;
      }
      router.push("/auth/login");
    } catch {
      alert("error has occured");
    }
  };

  return (
    <button
      type="button"
      className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100 cursor-pointer"
      onClick={logout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
