import ContinueWatchingDisplay from "@/app/_components/pages/ContinueWatchingDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Continue Watching | Silly",
  description: "See what movies and tv shows you began",
};

export default function ContinueWatchingPage() {
  return <ContinueWatchingDisplay />;
}
