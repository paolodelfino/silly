"use client";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const router = useRouter();

  function action(formData: FormData) {
    if (isInvalid) return;

    const query = formData.get("query")!.toString().trim();
    router.push(`/search/${query}`);
  }

  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <form action={action} className="w-full">
      <Input
        fullWidth
        autoFocus
        isInvalid={isInvalid}
        onValueChange={(value) => {
          if (value.length > 0 && !value.trim()) {
            setIsInvalid(true);
          } else {
            setIsInvalid(false);
          }
        }}
        color={isInvalid ? "danger" : "default"}
        isRequired
        isClearable
        startContent={
          <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
          >
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M22 22L20 20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        }
        name="query"
        label="Search"
        aria-label="Search"
        placeholder="Search for titles, people"
      ></Input>
    </form>
  );
}
