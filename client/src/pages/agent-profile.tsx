import axios from "axios";
import { Profile } from "components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const AgentProfile = () => {
  const [profile, setProfile] = useState<any>({});
  const { id } = useParams();

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/${id}`
      );
      setProfile(response.data);
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
      type="Agent Profile"
      name={profile?.name}
      avatar={profile?.avatar}
      email={profile?.email}
      properties={profile?.allProperties}
    />
  );
};

export default AgentProfile;
