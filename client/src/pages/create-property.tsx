import { useState } from "react";
import { FieldValues } from "@pankod/refine-react-hook-form";
import Form from "../components/common/Form";
import axios from "axios";
import { Navigate } from "react-router-dom";

const CreateProperty = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return alert("Please select an image");

    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);

      await axios.post(
        "https://homefinder-0zn2.onrender.com/api/v1/properties",
        {
          ...data,
          photo: propertyImage.url,
          email: parsedUser.email,
        }
      );

      setShouldRedirect(true);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const { title, description, propertyType, price, location } = form.elements;
    onFinishHandler({
      title: title.value,
      description: description.value,
      propertyType: propertyType.value,
      price: price.value,
      location: location.value,
    });
  };

  return (
    <>
      {shouldRedirect && <Navigate to="/properties" replace />}
      <Form
        type="Create"
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
        propertyImage={propertyImage}
      />
    </>
  );
};

export default CreateProperty;
