"use client";
import * as React from "react";
import { useState } from "react";
// interface ImageUrl {
//   url: string;
// }
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoMdAdd } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postData } from "@/action/postData";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function AddMissingForm() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
                className="bg-my-gradient m-5 dark:text-black text-white "
                variant="outline"
              >
                <IoMdAdd size={20} /> Add Missing Person
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DrawerTitle className="text-center mb-5 text-2xl">
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
  const img_hosting_token = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_TOKEN;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const { register, handleSubmit, reset } = useForm();
  const [image, setImage] = useState(" ");

  console.log(img_hosting_token);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    console.log(data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        if (imageResponse.success) {
          alert("successfully added");
          const imgUrl = imageResponse.data.display_url
          const {name,age,height,gender} = data;
          const formData = {
            name:name,
            age:age,
            height:height,
            gender:gender,
            imageUrl:imgUrl,
          }
        }
        
      });
    
  };
  console.log(image);

  return (
    <div
      className="px-4 rounded-lg py-4"
      style={{ backgroundImage: `url(/bg2.avif)` }}
    >
      <form
       
        onSubmit={handleSubmit(onSubmit)}
        action={postData}
        className={cn("grid items-start gap-4", className)}
      >
        <div className="grid gap-3 text-white">
          <Label htmlFor="username">Name</Label>
          <Input {...register("name", { required: true, maxLength: 120 })} type="text" id="name" name="name" placeholder="Type Here" />
        </div>
        <div className="grid gap-3 text-white">
          <Label htmlFor="username">Age</Label>
          <Input {...register("age", { required: true, maxLength: 120 })} type="number" id="age" name="age" placeholder="Type Here" />
        </div>
        <div className="grid gap-3 text-white">
          <Label htmlFor="username">Height (in Meter)</Label>
          <Input
          {...register("height", { required: true, maxLength: 120 })}
            type="number"
            id="height"
            name="height"
            placeholder="Type Here"
          />
        </div>
        <div className="grid gap-3">
          <div className="text-white">
            <Label htmlFor="username">Gender</Label>
          </div>
          <Select  {...register("gender", { required: true, maxLength: 120 })} name="gender">
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input
            {...register("image", { required: true, maxLength: 120 })}
            id="picture"
            type="file"
          />
        </div>
      
        <Button className="bg-my-gradient" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
