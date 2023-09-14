import { Skeleton } from "@nextui-org/react";

export default function MediaSliderSkeleton({ seeAll }: { seeAll?: boolean }) {
  return (
    <div className="gap-1 flex flex-col px-1">
      <div className="flex justify-between h-10">
        <Skeleton className="w-[50px] rounded-large" />
        {seeAll && <Skeleton className="w-[80px] rounded-large" />}
      </div>

      <Skeleton className="h-[180px] ml-1 rounded-large" />
    </div>
  );
}
