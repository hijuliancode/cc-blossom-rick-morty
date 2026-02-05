import { Skeleton } from "@/shared/components/skeleton";

export const CharacterListSkeleton = () => {
  return (
    <div className="space-y-1">
      {/* Section Header Skeleton */}
      <div className="px-4 pt-4 mb-2">
        <Skeleton className="h-4 w-32 bg-gray-200" />
      </div>

      {/* List Items Skeletons */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          <div className="h-px bg-gray-200 mx-4 my-1" />
          <div className="px-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
              {/* Avatar Skeleton */}
              <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />

              {/* Text Content Skeleton */}
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>

              {/* Favorite Button Skeleton */}
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
