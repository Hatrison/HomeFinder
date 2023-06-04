import { Box, Typography } from "@pankod/refine-mui";
import axios from "axios";

import { AgentCard } from "components";
import { useEffect, useState } from "react";

const Agents = () => {
  const [allAgents, setAllAgents] = useState<any>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/users");
      setAllAgents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Agents List
      </Typography>

      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          backgroundColor: "#FCFCFC",
        }}
      >
        {allAgents.length > 0 &&
          allAgents?.map((agent: any) => (
            <AgentCard
              key={agent._id}
              id={agent._id}
              name={agent.name}
              email={agent.email}
              avatar={agent.avatar}
              noOfProperties={agent.allProperties.length}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Agents;
