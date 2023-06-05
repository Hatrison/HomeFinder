import { Add } from "@mui/icons-material";
import { Box, Stack, Typography } from "@pankod/refine-mui";
import axios from "axios";
import { CustomButton, PropertyCard } from "../components";
import { useEffect, useState } from "react";

const AllProperties = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "https://homefinder-0zn2.onrender.com/api/v1/properties"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          All Properties
        </Typography>
        <CustomButton
          title="Add Property"
          backgroundColor="#475be8"
          path="/properties/create"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {data.map((property: any) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.price}
            location={property.location}
            photo={property.photo}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllProperties;
