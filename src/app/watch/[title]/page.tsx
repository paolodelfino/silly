import MediaWatch from "@/app/_components/MediaWatch";

export default function WatchPage({
  params: { title },
}: {
  params: {
    title: string;
  };
}) {
  return <MediaWatch title={decodeURIComponent(title)} />;
}
