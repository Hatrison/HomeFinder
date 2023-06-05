import axios from "axios";
import { Profile } from "../components";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState<any>({});

  const fetchUser = async () => {
    const user = localStorage.getItem("user");
    let currentUser;
    if (user) {
      currentUser = JSON.parse(user);
    }

    try {
      const response = await axios.get(
        `https://homefinder-0zn2.onrender.com/api/v1/users/${currentUser.userid}`
      );
      setMyProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Profile
      type="My"
      name={myProfile?.name}
      avatar={myProfile?.avatar}
      email={myProfile?.email}
      properties={myProfile?.allProperties}
    />
  );
};

export default MyProfile;
