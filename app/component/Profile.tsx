import React from "react";
import LogoutButton from "./LogoutButton";

type props = {
  profile: string;
};

const Profile = (props: props) => {
  const { profile } = props;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs p-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Profile
        </h2>
        <div className="bg-gray-50 border border-gray-300 rounded-md p-4 mb-4">
          <p className="text-black break-words">{profile}</p>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profile;
