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
import { postData } from "@/action/postData";

import { useRouter } from "next/navigation";

export default function AddMissingForm() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSubmit = async () => {
    // const post = await MissingPerson.find({ userId: id });
    // if (post.length === 1) {
    //   alert("You can add one missing person right now");
    // }
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
                onClick={handleSubmit}
                className="bg-my-gradient m-5 dark:text-black text-white "
                variant="outline"
              >
                <IoMdAdd size={20} />
                Add Missing Person
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
            <ProfileForm setOpen={setOpen} />
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
            onClick={handleSubmit}
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
          <ProfileForm setOpen={setOpen} />
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

function ProfileForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const handleSubmit = () => {
    router.refresh();
    setOpen(false);
  };
  return (
    <div
      className="px-6 rounded-lg py-2"
      style={{ backgroundImage: `url(/bg2.avif)` }}
    >
      <form action={postData} className={cn("grid items-start gap-1")}>
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
          placeholder="Type necessary info about the missing person."
        />

        <Button onClick={handleSubmit} className="bg-my-gradient" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
