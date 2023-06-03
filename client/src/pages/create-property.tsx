import { useState } from "react";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import Form from "components/common/Form";
import axios from "axios";

const CreateProperty = () => {
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
  } = useForm();

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

      await axios.post("http://localhost:8080/api/v1/properties", {
        ...data,
        photo: propertyImage.url,
        email: parsedUser.email,
      });
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
    <Form
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default CreateProperty;
