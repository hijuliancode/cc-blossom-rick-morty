import { Skeleton } from "@/shared/components/skeleton";

export const CharacterDetailSkeleton = () => {
  return (
    <div className="h-full bg-white p-8 overflow-hidden">
      <div className="max-w-2xl mx-auto animate-pulse">
        {/* Header with Avatar and Actions */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-start justify-between">
            {/* Avatar Skeleton */}
            <div className="relative w-32 h-32">
              <Skeleton className="w-full h-full rounded-full" />
              {/* Heart Icon Skeleton */}
              <div className="absolute bottom-0 right-0">
                <Skeleton className="w-10 h-10 rounded-full border-4 border-white" />
              </div>
            </div>

            {/* Action Button Skeleton */}
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>

          {/* Name and Basic Info Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/3" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-6" />

        {/* Detail Items Grid */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-full max-w-md" />
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-full max-w-md" />
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-full max-w-md" />
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-full max-w-md" />
          </div>
        </div>
      </div>
    </div>
  );
};
