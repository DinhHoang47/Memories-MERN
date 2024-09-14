import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export const useUser = () => {
  // Local state
  const [userProfile, setUserProfile] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  //   Check and sync state with global state
  const profile = useSelector((state) => state.profile);
  useEffect(() => {
    if (Object.keys(profile).length === 0) {
      setIsUserLoggedIn(false);
    } else {
      setUserProfile(profile);
      setIsUserLoggedIn(true);
    }
  }, [profile]);
  return { userProfile, isUserLoggedIn };
};
