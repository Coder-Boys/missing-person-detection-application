import Link from "next/link";

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid place-content-center items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div>

          
          <h1 className="text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)] sm:text-6xl md:text-6xl lg:text-[90px] drop-shadow-2xl">
          <span className="dark:text-gray-300 text-gray-600">Bringing Hope</span> Identify and <span className="dark:text-gray-300 text-gray-600">Reunite the</span> Missing
          </h1>
        </div>
        <div className="flex flex-col items-start space-y-4">
          <p className="max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed dark:text-gray-400">
          Imagine a world where every missing person is swiftly found. Welcome to <span className="text-violet-500 font-semibold">FINDER</span>, the app that uses cutting-edge AI and real-time data to transform searches. By harnessing technology and community vigilance, we turn uncertainty into action and hope. Join us in bringing our loved ones home.
          </p>
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
