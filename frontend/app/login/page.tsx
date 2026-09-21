"use client";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="flex flex-col min-h-auto min-w-auto border border-gray-200 rounded-sm p-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <Input className="rounded-sm" placeholder="Username" />
        <Input className="rounded-sm" placeholder="Password" type="password" />
        <Button className="rounded-sm">Login</Button>
        {/* <Link href="/register">Register</Link> */}
      </Card>
    </div>
  );
}
