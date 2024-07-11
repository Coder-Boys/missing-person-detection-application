"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import * as faceapi from "face-api.js";

import MatchingImage from "next/image";
interface FoundPersonInfo {
  _id: string;
  name: string;
  age: string;
  location: string;
  imageUrl: string;
  gender: string;
  textarea: string;
}
const getImageData = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/missingPeopleRoute/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.log("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log("datar moddhe error", error);
  }
};

function App() {
  const loadImage = async (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Set the crossOrigin attribute
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };
  const [foundInfo, setFoundInfo] = useState<FoundPersonInfo>();
  const [distance, setDistance] = useState(null);
  // const [chngImg, setChanginImg] = useState([]);
  const isFirstRender = useRef(true);

  // const ChangingImg = useMemo(() => chngImg, [chngImg]);
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };

    const detectAndCompareFaces = async () => {
      const { image1, arrImg } = await getImageData();
      // const allImages = arrImg.map((obj) => obj.imageUrl);
      // setChanginImg(allImages);

      const myImage = image1.imageUrl;
      // console.log(myImage, allImages);
      const mainImg1 = await loadImage(myImage);

      console.log("compare detecting", mainImg1);

      const idCardFaceDetection = await faceapi
        .detectSingleFace(mainImg1, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!idCardFaceDetection) {
        console.error("No face detected in ID card image");
        return;
      }

      for (const info of arrImg) {
        // const allImages = arrImg.map((obj) => obj.imageUrl);
        const mainImg2 = await loadImage(info.imageUrl);
        console.log(mainImg2);

        // Detect a single face from the current selfie image
        const selfieFaceDetection = await faceapi
          .detectSingleFace(mainImg2, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (selfieFaceDetection) {
          // Using Euclidean distance to compare face descriptions
          const dist = faceapi.euclideanDistance(
            idCardFaceDetection.descriptor,
            selfieFaceDetection.descriptor
          );

          if (dist < 0.6) {
            setFoundInfo(info);
            console.log(info);
            setDistance(dist);
            break;
          } else {
            setDistance(dist);
          }
        }
      }
    };

    if (isFirstRender.current) {
      isFirstRender.current = false; // toggle flag after first render/mounting
      loadModels().then(detectAndCompareFaces);
    }
  }, []);

  return (
    <>
      {distance < 0.6 ? <p>Match Found, Here it is</p> : <p>Match not found</p>}
      {foundInfo && (
        <div>
          <div
            key={foundInfo._id}
            className="card bg-gray-900 w-[650px] shadow-lg my-5  shadow-[rgb(156,39,176)]/60"
          >
            <div className="flex gap-4">
              <figure className="px-10 pt-10">
                <MatchingImage
                  src={foundInfo.imageUrl}
                  alt="Shoes"
                  className="rounded-xl object-cover h-[300px] hover:scale-110 hover:duration-200 hover:ease-in-out"
                  width={450}
                  height={350}
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Name: {foundInfo.name} </h2>
                <p>Age: {foundInfo.age} </p>
                {/* <p>Location:{foundInfo.location} </p> */}
                <p>Gender: {foundInfo.gender} </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
