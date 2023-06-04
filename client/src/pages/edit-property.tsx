import { useEffect, useState } from "react";
import { FieldValues } from "@pankod/refine-react-hook-form";
import Form from "../components/common/Form";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const EditProperty = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    description: "",
    propertyType: "",
    price: 0,
    location: "",
  });

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/properties/${id}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      await axios.patch(`http://localhost:8080/api/v1/properties/${id}`, {
        ...data,
        photo: propertyImage.url,
        email: parsedUser.email,
      });

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
      {shouldRedirect && <Navigate to={`/properties/show/${id}`} replace />}
      <Form
        type="Edit"
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
        propertyImage={propertyImage}
        data={{
          title: data.title,
          description: data.description,
          propertyType: data.propertyType,
          price: data.price,
          location: data.location,
        }}
      />
    </>
  );
};

export default EditProperty;
