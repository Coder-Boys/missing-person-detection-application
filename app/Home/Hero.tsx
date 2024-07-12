'use client'
import Link from "next/link";

import lottie from "../../components/lottieFiles/model3.json";
import LottieAnimation from "@/components/LottieAnimation";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function Hero() {
  const [text] = useTypewriter({
    words: [" Missing"],
    typeSpeed: 150,
    deleteSpeed: 200,
    loop: true,
  })

  return (
    <section className="w-full py-8 md:py-20 lg:py-28s">
      <div className="container grid place-content-center items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <h1 className="text-5xl shadow-lg p-2 font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)] sm:text-6xl md:text-6xl lg:text-[95px] drop-shadow-2xl">
            <span className="dark:text-gray-300 text-gray-600 ">
              Bringing Hope{" "}
            </span>
            Identify and{" "}
            <span className="dark:text-gray-300 text-gray-600">
              Reunite the <br />
            </span>
            {text}
           <Cursor cursorColor="violet"/>
          </h1>
        </div>
        <div className="flex flex-col justify-start items-start">
          <div className="flex flex-col items-center justify-center mb-3 ">
            <div className="">
              <LottieAnimation animate={lottie} />
            </div>
            <p className="max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed dark:text-gray-400">
              Welcome to{" "}
              <span className="text-violet-500 font-semibold">FINDER</span>, the
              app that uses cutting-edge AI and real-time data to transform
              searches. Join us in bringing our loved ones home.
            </p>
          </div>
          <Link
            href="/feed"
            className="bg-my-gradient inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            prefetch={false}
          >
            Let&apos;s Find
          </Link>
        </div>
      </div>
    </section>
  );
}
