"use client";
import LottiePlayer from "react-lottie-player";

const LottieAnimation = (props: any) => {
  return (
    <LottiePlayer
      className="max-w-xs "
      animationData={props.animate}
      loop={true}
      play={true}
    />
  );
};

export default LottieAnimation;
