"use client";
import { useEffect } from "react";
import * as faceapi from "face-api.js";
// import Image1 from "../assets/myPhoto.jpeg";
// import Image2 from "../assets/myPhoto2.jpeg";
// import Image3 from "../assets/rionImage.jpg";
// import Image4 from "../assets/whiteShirt.jpeg";
// import Image5 from "../assets/rionimage2.jpg";

export function Detection(allImages, image1) {
  console.log(allImages);
  // const allImage = useMemo(() => [...allImages], [allImages]);

  useEffect(() => {
    let selfieSrc = null;
    let isFirstRender = true;
    let distance = null;

    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };

    const detectAndCompareFaces = async () => {
      // Detect a single face from the ID card image
      const img = document.createElement("img");
      img.src = image1.src;
      const idCardFaceDetection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!idCardFaceDetection) {
        console.error("No face detected in ID card image");
        return;
      }

      for (const image of allImages) {
        // Create a temporary img element
        const img = document.createElement("img");
        img.src = image.src;

        // Wait for the image to load
        await new Promise((resolve) => (img.onload = resolve));

        // Detect a single face from the current selfie image
        const selfieFaceDetection = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (selfieFaceDetection) {
          // Using Euclidean distance to compare face descriptions
          const dist = faceapi.euclideanDistance(
            idCardFaceDetection.descriptor,
            selfieFaceDetection.descriptor
          );
          distance = dist;

          if (distance < 0.6) {
            selfieSrc = img.src;
            console.log(`Distance for ${image.src}:`, distance);

            // return { distance, selfieSrc };
          }
        }
      }
    };

    // Prevent the function from executing on the first render
    if (isFirstRender) {
      isFirstRender = false;
      loadModels().then(detectAndCompareFaces);
    }
  }, [allImages, image1]);
}
