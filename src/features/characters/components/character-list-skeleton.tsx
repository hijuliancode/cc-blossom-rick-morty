import { Skeleton } from "@/shared/components/skeleton";

export const CharacterListSkeleton = () => {
  return (
    <div className="space-y-2 p-4">
      {/* Section Header Skeleton */}
      <Skeleton className="h-4 w-32 mb-4 bg-gray-200" />

      {/* List Items Skeletons */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-100"
        >
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
      ))}
    </div>
  );
};
