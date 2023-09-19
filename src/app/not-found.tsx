"use client";
import WithLayout from "@/app/_components/pages/WithLayout";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <WithLayout>
      <div className="p-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-danger">404</h1>
          <p className="mb-5 mt-3 text-xl">Oops! Page not found.</p>
          <Button as={Link} href="/" fullWidth className="max-w-sm">
            Browse
          </Button>
        </div>
      </div>
    </WithLayout>
  );
}
