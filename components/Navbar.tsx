import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./darkModeBtn";
import { SearchInput } from "./SearchInput";
import { signOut } from "@/auth";
import { getSession } from "@/lib/getSession";
import { CgProfile } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Navbar() {
  const session = await getSession();
  const user = session?.user;
  console.log("ami eta", user);
  return (
    <nav className="flex items-center justify-between px-2 py-2 bg-white shadow-xl dark:bg-gray-800">
      <Link
        href="/"
        className="flex items-center justify-center gap-2"
        prefetch={false}
      >
        <MountainIcon className="h-6 w-6 text-violet-500" />
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
          className="font-medium hover:border-b-4 hover:border-violet-500 hover:text-violet-500"
          prefetch={false}
        >
          Home
        </Link>

        <Link
          href="/feed"
          className="font-medium hover:border-b-4 hover:border-violet-500 hover:text-violet-500"
          prefetch={false}
        >
          Feed
        </Link>
        <Link
          href="/missing"
          className="font-medium hover:border-b-4 hover:border-violet-500 hover:text-violet-500"
          prefetch={false}
        >
          Missing
        </Link>
        {user?.role === "user" ||
          (user?.role === "admin" && (
            <Link
              href="/found"
              className="font-medium hover:border-b-4 hover:border-violet-500 hover:text-violet-500"
              prefetch={false}
            >
              Found
            </Link>
          ))}
        <Link
          href="/contact"
          className=" font-medium hover:border-b-4 hover:border-violet-500 hover:text-violet-500"
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
                  className=" font-medium tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)]"
                  size={30}
                  color="violet"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-blue-600">
                  {user?.name}
                </DropdownMenuItem>
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
                    <Button variant={"outline"} type="submit">
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
              className="font-medium hover:text-violet-500"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/feed"
              className="font-medium hover:text-violet-500"
              prefetch={false}
            >
              Feed
            </Link>
            <Link
              href="/missing"
              className="font-medium hover:text-violet-500"
              prefetch={false}
            >
              Missing
            </Link>
            {user?.role === "user" ||
              (user?.role === "admin" && (
                <Link
                  href="/found"
                  className="font-medium hover:border-b-4 hover:border-violet-500 hover:text-violet-500"
                  prefetch={false}
                >
                  Found
                </Link>
              ))}
            <Link
              href="/contact"
              className="font-medium hover:text-violet-500"
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
                      className=" font-medium tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)]"
                      size={30}
                      color="violet"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>{user?.name}</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/post">Edit post</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {" "}
                      {user?.role === "admin" && (
                        <Link
                          href="/private/settings"
                          className=" font-medium hover:border-b-4 hover:border-violet-500 hover:text-violet-500"
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
                        <Button variant={"outline"} type="submit">
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
