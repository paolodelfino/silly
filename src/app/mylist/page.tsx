import MylistDisplay from "@/app/_components/MylistDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My List | Silly",
};

export default function MylistPage() {
  return <MylistDisplay />;
}
