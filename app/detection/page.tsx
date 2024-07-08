"use client";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Image1 from "../assets/myPhoto.jpeg";
import Image2 from "../assets/myPhoto2.jpeg";
import Image from "next/image";

// type FaceDetection = faceapi.WithFaceDescriptor<
//   faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>
// > | null;

// const Detector = () => {
//   const [image1Detection, setImage1Detection] = useState<FaceDetection>(null);
//   const [image2Detection, setImage2Detection] = useState<FaceDetection>(null); // Type should be the same as image1Detection
//   const image1Ref = useRef<HTMLImageElement | null>(null);
//   const image2Ref = useRef<HTMLImageElement | null>(null);
//   const isFirstRender = useRef(true);

//   const renderFace = async (
//     image: HTMLImageElement,
//     x: number,
//     y: number,
//     width: number,
//     height: number
//   ) => {
//     const canvas = document.createElement("canvas");
//     canvas.width = width;
//     canvas.height = height;
//     const context = canvas.getContext("2d");

//     if (context) {
//       context.drawImage(image, x, y, width, height, 0, 0, width, height);
//       canvas.toBlob((blob) => {
//         if (blob) {
//           image.src = URL.createObjectURL(blob);
//         }
//       }, "image/jpeg");
//     }
//   };

//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       return;
//     }

//     (async () => {
//       await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
//       await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//       await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
//       await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
//       await faceapi.nets.faceExpressionNet.loadFromUri("/models");

//       const image1 = image2Ref.current;
//       const image2 = image2Ref.current;

//       if (image1) {
//         const image1Detection = await faceapi
//           .detectSingleFace(image1, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks()
//           .withFaceDescriptor();

//         if (image1Detection) {
//           setImage1Detection(image1Detection);
//         }
//       }

//       if (image2) {
//         const image2Detection = await faceapi
//           .detectSingleFace(image2, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks()
//           .withFaceDescriptor();

//         if (image2Detection) {
//           setImage2Detection(image2Detection);
//         }
//       }
//     })();
//   }, []);

//   if (image1Detection && image2Detection) {
//     // Using Euclidean distance to comapare face descriptions
//     const distance = faceapi.euclideanDistance(
//       image1Detection.descriptor,
//       image2Detection.descriptor
//     );
//     return (
//       <div>
//         <div className="border-green-400">
//           <Image ref={image1Ref} src={Image1} alt="ID card" />
//         </div>
//         <div className="gallery">
//           <Image ref={image2Ref} src={Image2} alt="Selfie" />
//         </div>
//         <p className="text-green-300"> Distance : {distance}</p>
//         <p>testing</p>
//       </div>
//     );
//   }
// };

function App() {
  const allImages = [
    "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg",
    // "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg",
    // "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg",
  ];

  allImages.forEach((image) => {});
  const idCardRef = useRef();
  const selfieRef = useRef();
  const isFirstRender = useRef(true);
  const renderFace = async (image, x, y, width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    context?.drawImage(image, x, y, width, height, 0, 0, width, height);
    canvas.toBlob((blob) => {
      image.src = URL.createObjectURL(blob);
    }, "image/jpeg");
  };

  useEffect(() => {
    // Prevent the function from executing on the first render
    if (isFirstRender.current) {
      isFirstRender.current = false; // toggle flag after first render/mounting
      return;
    }

    (async () => {
      // loading the models
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");

      // detect a single face from the ID card image
      const idCardFacedetection = await faceapi
        .detectSingleFace(
          idCardRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      // detect a single face from the selfie image
      const selfieFacedetection = await faceapi
        .detectSingleFace(
          selfieRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      /**
       * Do face comparison only when faces were detected
       */
      if (idCardFacedetection && selfieFacedetection) {
        // Using Euclidean distance to comapare face descriptions
        const distance = faceapi.euclideanDistance(
          idCardFacedetection.descriptor,
          selfieFacedetection.descriptor
        );
        console.log(distance);
        console.log(idCardRef.current);
      }
    })();
  }, []);

  return (
    <>
      <div className="gallery">
        <Image
          ref={idCardRef}
          src={Image1}
          alt="ID card"
          height={100}
          width={100}
        />
      </div>
      <div className="gallery">
        <Image
          ref={selfieRef}
          src={Image2}
          alt="Selfie"
          width={100}
          height={100}
        />
      </div>
    </>
  );
}

export default App;
