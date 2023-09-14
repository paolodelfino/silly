import { Skeleton } from "@nextui-org/react";

export default function MediaSliderSkeleton({
  titleWidth,
  seeAll,
}: {
  titleWidth: number;
  seeAll?: boolean;
}) {
  return (
    <div className="space-y-1 flex flex-col px-1">
      <div className="flex justify-between h-10">
        <Skeleton
          className="rounded-large"
          style={{
            width: titleWidth + "px",
          }}
        />
        {seeAll && <Skeleton className="w-[80px] rounded-large" />}
      </div>

      <Skeleton className="h-[180px] ml-1 rounded-large" />
    </div>
  );
}
