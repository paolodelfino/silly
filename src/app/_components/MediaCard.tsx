import { GenericMedia, MediaSliderProps } from "@/app/_components/MediaSlider";
import { Card, CardHeader, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

export default function MediaCard<T extends GenericMedia>({
  entry,
  type,
  actions,
  externActions,
}: {
  entry: MediaSliderProps<T>["data"]["results"][number];
  type: "movie" | "tv" | "person";
  actions?: MediaSliderProps<T>["actions"];
  externActions?: boolean;
}) {
  return (
    <div className="relative">
      <Card
        as={Link}
        href={`/display/${type}/${entry.id}`}
        className="h-[180px] w-[120px] !outline-none data-[focus-visible=true]:scale-[0.95]"
        isPressable
        isHoverable
      >
        <CardHeader className="absolute left-0 top-0 z-10 h-full w-full !items-center justify-center">
          {!entry.poster_path && !entry.profile_path && (
            <span className="line-clamp-3 text-center">
              {entry.title ?? entry.name}
            </span>
          )}
        </CardHeader>

        {!externActions && actions?.({ entry, type })}

        {(entry.poster_path || entry.profile_path) && (
          <Image
            removeWrapper
            as={NextImage}
            radius="none"
            loading="eager"
            width={120}
            height={180}
            src={`https://image.tmdb.org/t/p/original/${
              entry.poster_path || entry.profile_path
            }`}
            alt={entry.title ?? entry.name!}
            className="z-0 h-full w-full object-cover"
          />
        )}
      </Card>

      {externActions && actions?.({ entry, type })}
    </div>
  );
}
