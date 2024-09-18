import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./darkModeBtn";
import { SearchInput } from "./SearchInput";
import { signOut } from "@/auth";
import { getSession } from "@/lib/getSession";
import { CgProfile } from "react-icons/cg";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { MissingPerson } from "@/library/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

export default async function Navbar() {
  const session = await getSession();
  const user = session?.user;
  const prisma = new PrismaClient();

  const id = session?.user?.id;
  // console.log("ami eta", user);

  const persons = await prisma.missingPerson.findMany({
    where: { userId: id },
  });
  // console.log(persons);
  return (
    <nav className="flex items-center justify-between px-2 py-2 bg-white shadow-xl dark:bg-gray-800">
      <Link
        href="/"
        className="flex items-center justify-center gap-2"
        prefetch={false}
      >
        <MountainIcon className="h-6 w-6 text-violet-600" />
        <span className="text-lg font-semibold">FINDER</span>
      </Link>
      <nav>
        <div className="flex w-full max-w-sm items-center space-x-2 px-2">
          <SearchInput />
        </div>
      </nav>
      <nav className="hidden justify-center items-center md:flex space-x-6 font-semibold text-sm uppercase">
        <Link
          href="/"
          className="font-medium hover:transition hover:ease-in hover:duration-150 hover:scale-125 hover:text-violet-500"
          prefetch={false}
        >
          Home
        </Link>

        <Link
          href="/feed"
          className="font-medium hover:transition hover:ease-in hover:duration-150 hover:scale-125 hover:text-violet-500"
          prefetch={false}
        >
          Feed
        </Link>
        <Link
          href="/missing"
          className="font-medium hover:transition hover:ease-in hover:duration-150 hover:scale-125 hover:text-violet-500"
          prefetch={false}
        >
          Missing
        </Link>
        {user && persons.length !== 0 && (
          <Link
            href="/found"
            className="font-medium text-violet-500 hover:transition hover:ease-in hover:duration-150 hover:scale-125 hover:text-violet-600"
            prefetch={false}
          >
            <Badge className="bg-green-400">Found</Badge>
          </Link>
        )}
        <Link
          href="/contact"
          className="font-medium hover:transition hover:ease-in hover:duration-150 hover:scale-125 hover:text-violet-500"
          prefetch={false}
        >
          Contact
        </Link>

        {!user ? (
          <>
            <Link
              href="/auth/signin"
              className="bg-my-gradient inline-flex h-9 items-center w-16 justify-center rounded-md bg-gray-900 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="">
                {" "}
                <CgProfile
                  className="font-medium hover:transition hover:ease-in hover:duration-150 hover:scale-125 hover:text-violet-500"
                  size={30}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {" "}
                  <span className="text-violet-600">{user?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/post">Edit post</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  {user?.role === "admin" && (
                    <Link
                      href="/private/settings"
                      className=""
                      prefetch={false}
                    >
                      Admin
                    </Link>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <Button
                      className="bg-my-gradient"
                      variant={"outline"}
                      type="submit"
                    >
                      Sign Out
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

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
              href="/"
              className="font-medium hover:transition hover:ease-in hover:duration-150 hover:scale-125 hover:text-violet-500"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/feed"
              className="font-medium hover:transition hover:ease-in hover:duration-150 hover:scale-125 hover:text-violet-500"
              prefetch={false}
            >
              Feed
            </Link>
            <Link
              href="/missing"
              className="font-medium hover:transition hover:ease-in hover:duration-150 hover:scale-125 hover:text-violet-500"
              prefetch={false}
            >
              Missing
            </Link>
            {user && persons.length !== 0 && (
              <Link
                href="/found"
                className="font-medium text-violet-500 hover:transition hover:ease-in hover:duration-150 hover:scale-125 hover:text-violet-600"
                prefetch={false}
              >
                <Badge className="bg-green-400">Found</Badge>
              </Link>
            )}

            <Link
              href="/contact"
              className="font-medium hover:transition hover:ease-in hover:duration-150 hover:scale-125 hover:text-violet-500"
              prefetch={false}
            >
              Contact
            </Link>
            {!user ? (
              <>
                <Link
                  href="/auth/signin"
                  className="bg-my-gradient inline-flex h-9 items-center w-16 justify-center rounded-md bg-gray-900 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {" "}
                    <CgProfile
                      className="font-medium hover:transition hover:ease-in hover:duration-150 hover:scale-125 hover:text-violet-600"
                      size={30}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      {" "}
                      <span className="text-violet-600">{user?.email}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <Link href="/post">Edit post</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {" "}
                      {user?.role === "admin" && (
                        <Link
                          href="/private/settings"
                          className=""
                          prefetch={false}
                        >
                          Admin
                        </Link>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {" "}
                      <form
                        action={async () => {
                          "use server";
                          await signOut();
                        }}
                      >
                        <Button
                          className="bg-my-gradient"
                          variant={"outline"}
                          type="submit"
                        >
                          Sign Out
                        </Button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            <ModeToggle />
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
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
