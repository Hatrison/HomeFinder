/* eslint-disable no-restricted-globals */
import { Typography, Box, Stack } from "@pankod/refine-mui";
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
} from "@mui/icons-material";
import { Navigate, useParams } from "react-router-dom";
import { CustomButton } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";

interface PropertyData {
  creator: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    allProperties: Array<string>;
  };
  description: string;
  location: string;
  photo: string;
  price: number;
  propertyType: string;
  title: string;
  _id: string;
}

const PropertyDetails = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [data, setData] = useState<PropertyData>({
    creator: {
      _id: "",
      name: "",
      email: "",
      avatar: "",
      allProperties: [],
    },
    description: "",
    location: "",
    photo: "",
    price: 0,
    propertyType: "",
    title: "",
    _id: "",
  });
  const { id } = useParams();

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `https://homefinder-0zn2.onrender.com/api/v1/properties/${id}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      await axios.delete(
        `https://homefinder-0zn2.onrender.com/api/v1/properties/${id}`
      );
      setShouldRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsCurrentUser(parsedUser.email === data.creator.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleDeleteProperty = () => {
    const response = confirm("Are you sure you want to delete this property?");
    if (response) {
      deleteProperty(id as string);
    }
  };

  return (
    <>
      {shouldRedirect && <Navigate to="/properties" replace />}
      {JSON.stringify(data) !== "{}" && (
        <Box
          borderRadius="15px"
          padding="20px"
          bgcolor="#FCFCFC"
          width="fit-content"
        >
          <Typography fontSize={25} fontWeight={700} color="#11142D">
            Details
          </Typography>

          <Box
            mt="20px"
            display="flex"
            flexDirection={{ xs: "column", lg: "row" }}
            gap={4}
          >
            <Box flex={1} maxWidth={764}>
              <img
                src={data.photo}
                alt="property_details-img"
                width="100%"
                height={546}
                style={{ objectFit: "cover", borderRadius: "10px" }}
                className="property_details-img"
              />

              <Box mt="15px">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  alignItems="center"
                >
                  <Typography
                    fontSize={18}
                    fontWeight={500}
                    color="#11142D"
                    textTransform="capitalize"
                  >
                    {data.propertyType}
                  </Typography>
                  <Box>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Star key={`star-${item}`} sx={{ color: "#F2C94C" }} />
                    ))}
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={2}
                >
                  <Box>
                    <Typography
                      fontSize={22}
                      fontWeight={600}
                      mt="10px"
                      color="#11142D"
                    >
                      {data.title}
                    </Typography>
                    <Stack
                      mt={0.5}
                      direction="row"
                      alignItems="center"
                      gap={0.5}
                    >
                      <Place sx={{ color: "#808191" }} />
                      <Typography fontSize={14} color="#808191">
                        {data.location}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography
                      fontSize={16}
                      fontWeight={600}
                      mt="10px"
                      color="#11142D"
                    >
                      Price
                    </Typography>
                    <Stack direction="row" alignItems="flex-end" gap={1}>
                      <Typography
                        fontSize={25}
                        fontWeight={700}
                        color="#475BE8"
                      >
                        ${data.price}
                      </Typography>
                      <Typography fontSize={14} color="#808191" mb={0.5}>
                        for one day
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                <Stack mt="25px" direction="column" gap="10px">
                  <Typography fontSize={18} color="#11142D">
                    Description
                  </Typography>
                  <Typography fontSize={14} color="#808191">
                    {data.description}
                  </Typography>
                </Stack>
              </Box>
            </Box>

            <Box
              width="100%"
              flex={1}
              maxWidth={326}
              display="flex"
              flexDirection="column"
              gap="20px"
            >
              <Stack
                width="100%"
                p={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
                border="1px solid #E4E4E4"
                borderRadius={2}
              >
                <Stack
                  mt={2}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                >
                  <img
                    src={data.creator.avatar}
                    width={90}
                    height={90}
                    style={{ borderRadius: "100%", objectFit: "cover" }}
                    alt=""
                  />

                  <Box mt="15px">
                    <Typography fontSize={18} fontWeight={600} color="#11142D">
                      {data.creator.name}
                    </Typography>
                    <Typography
                      mt="5px"
                      fontSize={14}
                      fontWeight={400}
                      color="#808191"
                    >
                      Agent
                    </Typography>
                  </Box>

                  <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                    <Place sx={{ color: "#808191" }} />
                    <Typography fontSize={14} fontWeight={400} color="#808191">
                      North Carolina, USA
                    </Typography>
                  </Stack>

                  <Typography
                    mt={1}
                    fontSize={16}
                    fontWeight={600}
                    color="#11142D"
                  >
                    {data.creator.allProperties.length} Properties
                  </Typography>
                </Stack>

                <Stack
                  width="100%"
                  mt="25px"
                  direction="row"
                  flexWrap="wrap"
                  gap={2}
                >
                  <CustomButton
                    title={!isCurrentUser ? "Message" : "Edit"}
                    backgroundColor="#475BE8"
                    color="#FCFCFC"
                    fullWidth
                    icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                    path={isCurrentUser ? `/properties/edit/${data._id}` : ""}
                  />
                  <CustomButton
                    title={!isCurrentUser ? "Call" : "Delete"}
                    backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
                    color="#FCFCFC"
                    fullWidth
                    icon={!isCurrentUser ? <Phone /> : <Delete />}
                    handleClick={() => {
                      if (isCurrentUser) handleDeleteProperty();
                    }}
                  />
                </Stack>
              </Stack>

              <Stack>
                <img
                  src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
                  width="100%"
                  height={306}
                  style={{ borderRadius: 10, objectFit: "cover" }}
                  alt=""
                />
              </Stack>

              <Box>
                <CustomButton
                  title="Book Now"
                  backgroundColor="#475BE8"
                  color="#FCFCFC"
                  fullWidth
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PropertyDetails;
