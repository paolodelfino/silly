import MylistDisplay from "@/app/_components/pages/MylistDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My List | Silly",
  description: "See what movies you saved in your list",
};

export default function MylistPage() {
  return <MylistDisplay />;
}
