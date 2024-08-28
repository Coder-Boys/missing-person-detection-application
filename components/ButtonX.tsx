"use client";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
const ButtonX = ({ children }: { children: ReactNode }) => {
  return (
    <Button variant="destructive" type="submit">
      {children}
    </Button>
  );
};

export default ButtonX;
