"use client";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
const ButtonX = ({ children }: { children: ReactNode }) => {
  return (
    <Button type="submit" className="w-full">
      {children}
    </Button>
  );
};

export default ButtonX;
