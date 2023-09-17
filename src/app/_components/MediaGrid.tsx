import { Card, CardHeader, Image, Skeleton, Spinner } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

export function MediaGridSkeleton({ titleWidth }: { titleWidth: number }) {
  return (
    <div>
      <Skeleton
        className="h-7 rounded-large"
        style={{
          width: titleWidth + "px",
        }}
      />
      <center>
        <Spinner />
      </center>
    </div>
  );
}

export default function MediaGrid<
  T extends {
    page: number;
    results: {
      id: number;
      title?: string;
      name?: string;
      backdrop_path: string | null;
      overview: string;
    }[];
    total_pages: number;
    total_results: number;
  }
>({ data, title }: { data: T; title?: string }) {
  return (
    <div>
      {title && (
        <h1 className="text-lg font-medium mb-1 ml-1 w-max">{title}</h1>
      )}
      {data.total_results == 0 && (
        <span className="text-slate-400 ml-2">No results</span>
      )}
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-6 w-full p-3 pb-6">
        {data.results.map((entry, i) => {
          const isMovie = "title" in entry;
          const title = isMovie ? entry.title : entry.name;

          return (
            <div className="flex flex-col gap-3" key={`${i}-${title}`}>
              <div className="flex gap-4">
                <Card
                  className="w-[185px] h-[104px] shrink-0"
                  radius="md"
                  isPressable
                  isHoverable
                  as={Link}
                  href={`/display/${isMovie ? "movie" : "tv"}/${entry.id}`}
                >
                  <CardHeader className="absolute z-10 w-full h-full left-0 top-0 !items-center justify-center">
                    <div className="bg-background/40 rounded-full pl-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="fill-white h-8 w-8"
                      >
                        <path d="M7 6v12l10-6z"></path>
                      </svg>
                    </div>
                  </CardHeader>

                  {entry.backdrop_path && (
                    <Image
                      radius="none"
                      as={NextImage}
                      removeWrapper
                      width={185}
                      height={104}
                      src={`https://image.tmdb.org/t/p/w185/${entry.backdrop_path}`}
                      alt={title}
                      className="object-cover w-full h-full z-0"
                    />
                  )}
                </Card>

                <div className="flex flex-col justify-center">
                  <h4 className="text-medium font-semibold">{title}</h4>

                  <span className="text-slate-400 line-clamp-3 text-small">
                    {entry.overview}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
