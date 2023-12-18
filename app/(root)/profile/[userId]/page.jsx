"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = ({ params }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = params.userId;
  console.log(userId);
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [receivedPosts, setReceivedPosts] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      await console.log(data);
      setPosts(data);
      setReceivedPosts(data ? true : false);
    };

    const fetchProfile = async () => {
      const response = await fetch(`/api/users/${userId}/profile`);
      const data = await response.json();
      await console.log(data);
      setUserProfile(data);
      setReceivedPosts(data ? true : false);
    };

    if (session?.user.id && session?.user.id === userId) {
      router.push("/profile");
    } else {
      fetchProfile();
      fetchPosts();
    }
  }, [userId, session?.user.id]);

  if (status === "loading" || !receivedPosts) {
    console.log("data loaded.");
    return (
      <h1 className="head_text text-left">
        <span className="blue_gradient">Loading...</span>
      </h1>
    );
  }
  return (
    <Profile
      name={`${userProfile.username || "User"}'s`}
      desc={`welcome to ${userProfile.username || "User"}'s profile page`}
      data={posts}
    />
  );
};

export default MyProfile;
