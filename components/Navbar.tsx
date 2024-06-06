import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./darkModeBtn";

export default function Component() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-xl dark:bg-gray-800">
      <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">FINDER</span>
      </Link>
      <nav className="hidden justify-center items-center md:flex space-x-6 font-semibold text-sm uppercase">
        <Link
          href="#"
          className="font-medium hover:border-b-4 hover:border-violet-500 hover:text-violet-500"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="#"
          
          className="font-medium hover:border-b-4 hover:border-violet-500 hover:text-violet-500"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="#"
          className="font-medium hover:border-b-4 hover:border-violet-500 hover:text-violet-500"
          prefetch={false}
        >
          Services
        </Link>
        <Link
          href="#"
          className="font-medium hover:border-b-4 hover:border-violet-500 hover:text-violet-500"
          prefetch={false}
        >
          Portfolio
        </Link>
        <Link
          href="#"
          className=" font-medium hover:border-b-4 hover:border-violet-500 hover:text-violet-500"
          prefetch={false}
        >
          Contact
        </Link>
        <Link
              href="#"
              className="bg-my-gradient inline-flex h-9 items-center w-16 justify-center rounded-md bg-gray-900 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              Login
            </Link>
        <ModeToggle />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid w-[200px] p-4 space-y-4 text-sm uppercase ">
            <Link
              href="#"
              className="font-medium hover:text-violet-500"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="font-medium hover:text-violet-500"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="font-medium hover:text-violet-500"
              prefetch={false}
            >
              Services
            </Link>
            <Link
              href="#"
              className="font-medium hover:text-violet-500"
              prefetch={false}
            >
              Portfolio
            </Link>
            <Link
              href="#"
              className="font-medium hover:text-violet-500"
              prefetch={false}
            >
              Contact
            </Link>
            <Link
              href="#"
              className="bg-my-gradient inline-flex h-10 items-center justify-center rounded-md bg-gray-900 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              Login
            </Link>
            <ModeToggle />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
