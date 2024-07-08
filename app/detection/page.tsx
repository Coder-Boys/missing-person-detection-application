"use client";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Image1 from "../assets/myPhoto.jpeg";
import Image2 from "../assets/myPhoto2.jpeg";
import Image3 from "../assets/rionImage.jpg";
import Image4 from "../assets/whiteShirt.jpeg";
import Image from "next/image";

function App() {
  const allImages = [Image2, Image3, Image4];
  const idCardRef = useRef();
  const selfieRef = useRef();
  const isFirstRender = useRef(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({
    idCard: false,
    selfie: false,
  });
  const [matchFound, setMatchFound] = useState(false);
  const [matchedImageSrc, setMatchedImageSrc] = useState(null);

  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]);
  };

  const detectFaces = async () => {
    if (idCardRef.current && selfieRef.current) {
      // Detect a single face from the ID card image
      const idCardFacedetection = await faceapi
        .detectSingleFace(
          idCardRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      // Detect a single face from the selfie image
      const selfieFacedetection = await faceapi
        .detectSingleFace(
          selfieRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (idCardFacedetection && selfieFacedetection) {
        // Using Euclidean distance to compare face descriptors
        const distance = faceapi.euclideanDistance(
          idCardFacedetection.descriptor,
          selfieFacedetection.descriptor
        );
        console.log(`Distance for image ${currentImageIndex}:`, distance);

        if (distance < 0.6) {
          console.log("Face match found with distance:", distance);
          setMatchFound(true);
          setMatchedImageSrc(allImages[currentImageIndex]);
        } else {
          setMatchFound(false);
          setMatchedImageSrc(null);
        }
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadModels();
      detectFaces();
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      init();
      return;
    }

    if (imagesLoaded.idCard && imagesLoaded.selfie) {
      detectFaces();
    }
  }, [currentImageIndex, imagesLoaded]);

  useEffect(() => {
    if (!isFirstRender.current && currentImageIndex < allImages.length) {
      const timer = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      }, 3000); // Wait for 3 seconds before moving to the next image
      return () => clearTimeout(timer);
    }
  }, [currentImageIndex, allImages.length]);

  const handleImageLoad = (imageType) => {
    setImagesLoaded((prevState) => ({
      ...prevState,
      [imageType]: true,
    }));
  };

  return (
    <>
      <div className="gallery">
        <Image
          ref={idCardRef}
          src={Image1}
          alt="ID card"
          onLoad={() => handleImageLoad("idCard")}
        />
      </div>
      <div className="gallery">
        <Image
          ref={selfieRef}
          src={allImages[currentImageIndex]}
          alt={`Selfie ${currentImageIndex}`}
          onLoad={() => handleImageLoad("selfie")}
          style={{ display: "none" }} // Always hide the selfie image
        />
      </div>
      <div className="result">
        {matchFound ? (
          <Image src={matchedImageSrc} alt="Matched Selfie" />
        ) : (
          <p>No match found</p>
        )}
      </div>
    </>
  );
}

export default App;
