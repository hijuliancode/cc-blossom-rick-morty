import type { FC, MouseEvent } from "react";
import { cn } from "@/shared/utils/cn";

type ButtonFavoriteProps = {
  isFavorite: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  iconClassName?: string;
};

export const ButtonFavorite: FC<ButtonFavoriteProps> = ({
  isFavorite,
  onClick,
  className,
  iconClassName = "w-6 h-6",
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={cn(className)}
    >
      {isFavorite ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cn("text-green-500", iconClassName)}
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.691c0-3.44 2.133-6.028 5.166-6.651 2.05-.421 4.298.243 5.584 1.879.973-1.467 3.033-2.3 5.09-2.022 3.238.452 5.66 3.036 5.66 6.577 0 3.655-2.613 6.942-5.748 9.38-1.577 1.226-3.218 2.22-4.475 2.803a12.656 12.656 0 01-.86.353c-.013.004-.025.008-.035.011l-.002.001h-.002z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={cn("text-gray-400", iconClassName)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      )}
    </button>
  );
};
