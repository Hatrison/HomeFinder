import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
} from "@pankod/refine-mui";
import { FormProps } from "../../interfaces/common";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";

const Form = ({
  type,
  handleSubmit,
  handleImageChange,
  onFinishHandler,
  propertyImage,
  data = {
    title: "",
    description: "",
    propertyType: "",
    price: 0,
    location: "",
  },
}: FormProps) => {
  const [fields, setFields] = useState(data);

  useEffect(() => {
    if (data?.title !== "") setFields(data);
  }, [data]);

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a Property
      </Typography>
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form
          data-testid="form"
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter property name
            </FormHelperText>
            <TextField
              data-testid="title"
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              name="title"
              value={fields?.title}
              onChange={(e) => {
                const value = e.target.value;
                setFields((prevState: any) => {
                  return {
                    ...prevState,
                    title: value,
                  };
                });
              }}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter description
            </FormHelperText>
            <TextareaAutosize
              data-testid="description"
              minRows={5}
              required
              placeholder="Write description"
              color="info"
              name="description"
              value={fields?.description}
              onChange={(e) => {
                const value = e.target.value;
                setFields((prevState: any) => {
                  return {
                    ...prevState,
                    description: value,
                  };
                });
              }}
              style={{
                width: "100%",
                background: "transparent",
                fontSize: "16px",
                borderColor: "rgba(0, 0, 0, 0.23)",
                borderRadius: 6,
                padding: 10,
                color: "#919191",
              }}
            />
          </FormControl>

          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Select property type
              </FormHelperText>
              <Select
                data-testid="propertyType"
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                name="propertyType"
                value={fields?.propertyType}
                onChange={(e) => {
                  const value = e.target.value;
                  setFields((prevState: any) => {
                    return {
                      ...prevState,
                      propertyType: value,
                    };
                  });
                }}
              >
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
                <MenuItem value="farmhouse">Farmhouse</MenuItem>
                <MenuItem value="condos">Condos</MenuItem>
                <MenuItem value="townhouse">Townhouse</MenuItem>
                <MenuItem value="duplex">Duplex</MenuItem>
                <MenuItem value="studio">Studio</MenuItem>
                <MenuItem value="chalet">Chalet</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Enter property price
              </FormHelperText>
              <TextField
                data-testid="price"
                fullWidth
                required
                id="outlined-basic"
                color="info"
                type="number"
                variant="outlined"
                name="price"
                value={fields?.price}
                onChange={(e) => {
                  const value = e.target.value;
                  setFields((prevState: any) => {
                    return {
                      ...prevState,
                      price: value,
                    };
                  });
                }}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter location
            </FormHelperText>
            <TextField
              data-testid="location"
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              name="location"
              value={fields?.location}
              onChange={(e) => {
                const value = e.target.value;
                setFields((prevState: any) => {
                  return {
                    ...prevState,
                    location: value,
                  };
                });
              }}
            />
          </FormControl>
          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography
                color="#11142d"
                fontSize={16}
                fontWeight={500}
                my="10px"
              >
                Property Photo
              </Typography>
              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2e4d80",
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    // @ts-ignore
                    handleImageChange(e.target.files[0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color="#808191"
              sx={{ wordBreak: "break-all" }}
            >
              {propertyImage?.name}
            </Typography>
          </Stack>
          <CustomButton
            type="submit"
            title={"Submit"}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
