"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
const ButtonX = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const handleDelete = () => {
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };
  return (
    <Button variant="destructive" onClick={handleDelete}>
      {children}
    </Button>
  );
};

export default ButtonX;
