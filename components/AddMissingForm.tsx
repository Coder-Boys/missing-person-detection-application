"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IoMdAdd } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postData } from "@/action/postData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddMissingForm() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const session = useSession();

  const onSubmit = () => {
    const status = session?.status;
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  };
  if (isDesktop) {
    return (
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <div className="flex justify-end">
            <DialogTrigger
              className="hover:ease-in hover:scale-110 hover:duration-150"
              asChild
            >
              <Button
                onClick={onSubmit}
                className="bg-my-gradient m-5 dark:text-black text-white "
                variant="outline"
              >
                <IoMdAdd size={20} /> Add Missing Person
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DrawerTitle className="text-center mb-2 text-2xl">
                Details About Missing Person
              </DrawerTitle>
              <DialogDescription>
                Please fill up the form with appropriate details about the
                missing person
              </DialogDescription>
            </DialogHeader>
            <ProfileForm />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="flex justify-center">
        <DialogTrigger
          className="hover:ease-in hover:scale-110 hover:duration-150"
          asChild
        >
          <Button
            className="bg-my-gradient m-5 dark:text-black text-white "
            variant="outline"
          >
            <IoMdAdd size={20} /> Add Missing Person
          </Button>
        </DialogTrigger>
      </div>
      <div style={{ backgroundImage: `url(/bg2.avif)` }}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle className="uppercase">
              Details About Missing Person
            </DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you re done.
            </DrawerDescription>
          </DrawerHeader>
          <ProfileForm className="px-4" />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </div>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <div
      className="px-6 rounded-lg py-2"
      style={{ backgroundImage: `url(/bg2.avif)` }}
    >
      <form
        action={postData}
        className={cn("grid items-start gap-1", className)}
      >
        <div className="grid gap-1 text-white">
          <Label htmlFor="username">Name</Label>
          <Input type="text" id="name" name="name" placeholder="Type Here" />
        </div>
        <div className="grid gap-1 text-white">
          <Label htmlFor="username">Age</Label>
          <Input type="number" id="age" name="age" placeholder="Type Here" />
        </div>
        <div className="grid gap-1 text-white">
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            id="location"
            name="location"
            placeholder="Type Here"
          />
        </div>
        <div className="grid gap-1 text-white">
          <Label htmlFor="contact">Contact</Label>
          <Input
            type="text"
            id="contact"
            name="contact"
            placeholder="Type Here"
          />
        </div>
        {/* <div className="grid gap-1">
          <div className="text-white">
            <Label htmlFor="username">Gender</Label>
          </div>
          <Select name="gender">
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>

        </div> */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image">Picture</Label>
          <Input
            type="file"
            id="image"
            name="image"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            required
          />
        </div>
        <Textarea
          name="textarea"
          className="my-1"
          placeholder="Type necessary info about the missin person."
        />

        <Button className="bg-my-gradient" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
