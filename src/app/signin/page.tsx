"use client";
import { Button, Spacer, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getProviders, signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["providers"],
    queryFn: () => getProviders(),
  });

  const callbackUrl = searchParams.callbackUrl;
  const { status } = useSession();

  useEffect(() => {
    if (status == "authenticated" && callbackUrl) {
      redirect(Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl);
    }
  }, [status, callbackUrl]);

  return (
    <center className="max-w-lg mx-auto">
      <Spacer y={20} />

      <h1 className="text-white text-2xl tracking-wide font-bold leading-relaxed">
        Welcome Back!
      </h1>
      <h4 className="text-slate-400 text-base tracking-wide">
        Please sign in to your account
      </h4>

      <Spacer y={20} />

      {isLoading && <Spinner />}

      {isError && <span className="text-danger">Something bad happend</span>}

      {data &&
        Object.values(data).map((provider) => {
          if (!provider) return null;

          return (
            <Button
              fullWidth
              onPress={() => signIn(provider.id)}
              key={provider.id}
              className="max-w-xs"
              startContent={
                provider.id == "google" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                ) : null
              }
            >
              {provider.name}
            </Button>
          );
        })}
    </center>
  );
}
