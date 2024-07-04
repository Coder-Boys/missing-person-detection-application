import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";

export default function LoginForm() {
  return (
    <Card
      style={{ backgroundImage: `url(/bg2.avif)` }}
      className="mx-auto max-w-sm mt-20"
    >
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription className="text-gray-200">
          Enter your email & password below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            "use server";
            await signIn("credentials", formData);
          }}
          className="grid gap-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="pr@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input name="password" id="password" type="password" required />
          </div>

          <Button type="submit" className="w-full bg-my-gradient">
            Login
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-white">
          Don&apos;t have an account?
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
