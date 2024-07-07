"use client";
import { CldUploadWidget, CldUploadButton } from "next-cloudinary";
import { useState } from "react";
interface ImageUrl {
  url: string;
}
const UploadImage = () => {
  const [imgUrl, setImgUrl] = useState("");
  console.log(imgUrl);
  return (
    <CldUploadButton
      options={{}}
      onUpload={({ info }) => {
        const img = info as ImageUrl;
        setImgUrl(img.url);
      }}
      uploadPreset="MissingPersonImage"
    ></CldUploadButton>
  );
};

export default UploadImage;
