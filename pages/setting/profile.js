import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Profileform from "../../components/Profileform";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Profile() {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchUserProfile();
    }
  }, [status, session]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users?email=${session.user.email}`);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return <div>Please sign in to view your profile.</div>;
  }

  if (!userProfile) {
    return <div>Profile not found.</div>;
  }

  return (
    <Profileform
      _id={userProfile._id}
      firstname={userProfile.firstname}
      lastname={userProfile.lastname}
      email={userProfile.email}
      password={userProfile.password}
      avtar={userProfile.avtar || []}
      userRole={userProfile.userRole}
      createdAt={userProfile.createdAt}
    />
  );
}