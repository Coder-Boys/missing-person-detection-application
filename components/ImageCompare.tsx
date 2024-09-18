"use client";
import React from "react";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import lottie from "../components/lottieFiles/model1.json";
import lottie2 from "../components/lottieFiles/not-found.json";
import { RxCross1 } from "react-icons/rx";
import MatchingImage from "next/image";
import LottieAnimation from "@/components/LottieAnimation";
import { MissingPerson } from "@prisma/client";

const ImageCompare = () => {
  const editMissingInfo = async (id) => {
    try {
      console.log(id);
      const res = await fetch(
        `http://localhost:3000/api/missingPeopleRoute/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ missing: "false" }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const editPersonInfo = async (id) => {
    try {
      console.log(id);
      const res = await fetch(
        `http://localhost:3000/api/missingPeopleRoute/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ missing: "false" }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

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

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 20000);
  }, []);
  const isFirstRender = useRef(true);
  const [foundInfo, setFoundInfo] = useState<MissingPerson>();
  const [distance, setDistance] = useState(null);

  const loadImage = async (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Set the crossOrigin attribute
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };
  // const [chngImg, setChanginImg] = useState([]);

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

      const mainImg1 = await loadImage(myImage);

      console.log("compare detecting", mainImg1);

      const sourceImages = await faceapi
        .detectSingleFace(mainImg1, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!sourceImages) {
        console.error("No face detected in ID card image");
        return;
      }

      for (const info of arrImg) {
        // const allImages = arrImg.map((obj) => obj.imageUrl);
        const mainImg2 = await loadImage(info.imageUrl);
        console.log(mainImg2);

        // Detect a single face from the current selfie image
        const personImage = await faceapi
          .detectSingleFace(mainImg2, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (personImage) {
          // Using Euclidean distance to compare face descriptions
          const dist = faceapi.euclideanDistance(
            sourceImages.descriptor,
            personImage.descriptor
          );

          if (dist < 0.6) {
            setFoundInfo(info);
            console.log(info);
            setDistance(dist);

            editMissingInfo(info.id);
            editPersonInfo(image1.id);

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
      {loading ? (
        <div className="w-full flex justify-center items-center min-h-screen">
          {" "}
          <LottieAnimation animate={lottie} />
        </div>
      ) : (
        <div>
          {distance < 0.6 ? (
            <div>
              <p className="my-5 ms-4 text-green-500 text-2xl font-bold flex gap-2">
                <IoCheckmarkCircleOutline size={30} />
                Missing Person has been found{" "}
              </p>
              <p className="text-gray-400 text-2xl font-bold ms-7">
                Here is the person
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center min-h-screen justify-center">
              <LottieAnimation animate={lottie2} />
              <p className="text-red-600 font-mono font-bold text-5xl flex gap-2 my-5 ms-4">
                <RxCross1 size={40} /> Missing Person has not been found
              </p>
            </div>
          )}
          {foundInfo && (
            <div>
              <div
                key={foundInfo.id}
                className=" bg-gray-900 h-full rounded-xl pb-3 shadow-lg my-5  shadow-[rgb(156,39,176)]/60"
              >
                <figure className="px-10 pt-10 flex justify-center items-center">
                  <MatchingImage
                    src={foundInfo.imageUrl}
                    alt="Shoes"
                    className="rounded-xl object-cover h-[400px] hover:scale-110 hover:duration-200 hover:ease-in-out"
                    width={450}
                    height={350}
                  />
                </figure>
                <div className="my-8 text-gray-400 mx-10 space-y-1">
                  <h2 className="font-bold text-4xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)] my-5">
                    {foundInfo.name}
                  </h2>

                  <h2 className="">Age: {foundInfo.age} years</h2>
                  <h2 className="">Location: {foundInfo.location}</h2>
                  <h2 className="">Contact Info: {foundInfo.contact}</h2>
                  <h2 className="">Details: {foundInfo.textarea}</h2>
                </div>
              </div>

              <div></div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default ImageCompare;
