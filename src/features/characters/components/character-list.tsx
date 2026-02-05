import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET_CHARACTERS } from "../../../graphql/queries/get-characters";
import type { GetCharactersQuery } from "../../../types/__generated__/graphql";
import { ErrorBanner } from "../../../shared/components/error-banner";
import { LoadingSpinner } from "../../../shared/components/loading-spinner";
import { CharacterListItem } from "./character-list-item";
import { FilterModal } from "./filter-modal";
import { useUserInteractions } from "../../../hooks/use-user-interactions";
import { useDebounce } from "../../../shared/hooks/use-debounce";

export const CharacterList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { hiddenCharacters, favorites } = useUserInteractions();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const currentName = searchParams.get("name") || "";
    if (debouncedSearchTerm !== currentName) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (debouncedSearchTerm) {
          newParams.set("name", debouncedSearchTerm);
        } else {
          newParams.delete("name");
        }
        newParams.delete("page");
        return newParams;
      });
    }
  }, [debouncedSearchTerm, searchParams, setSearchParams]);

  const name = searchParams.get("name") || undefined;
  const status = searchParams.get("status") || undefined;
  const species = searchParams.get("species") || undefined;
  const gender = searchParams.get("gender") || undefined;
  const filterType = searchParams.get("filter") || "all";
  const sortOrder = searchParams.get("sort");

  const { loading, error, data } = useQuery<GetCharactersQuery>(
    GET_CHARACTERS,
    {
      variables: {
        filter: {
          name,
          status,
          species,
          gender,
        },
      },
    },
  );

  if (error) {
    return (
      <div className="p-4">
        <ErrorBanner
          title="Error loading characters"
          description={error.message}
        />
      </div>
    );
  }

  // Filter and Sort Logic
  const characters =
    data?.characters?.results?.filter(
      (char) => char && !hiddenCharacters.includes(char.id || ""),
    ) || [];

  const starredCharacters = characters.filter(
    (char) => char?.id && favorites.includes(char.id),
  );

  const otherCharacters = characters.filter(
    (char) => char?.id && !favorites.includes(char.id),
  );

  // Sorting
  const sortFn = (
    a: { name?: string | null } | null,
    b: { name?: string | null } | null,
  ) => {
    if (sortOrder === "asc")
      return (a?.name || "").localeCompare(b?.name || "");
    if (sortOrder === "desc")
      return (b?.name || "").localeCompare(a?.name || "");
    return 0;
  };

  if (sortOrder) {
    starredCharacters.sort(sortFn);
    otherCharacters.sort(sortFn);
  }

  // Determine what to render
  const renderList = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      );
    }

    if (characters.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-center px-4">
          <div className="w-24 h-24 mb-4 opacity-30 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No characters found
          </h3>
          <p className="text-gray-500 mt-1 text-sm">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
        </div>
      );
    }

    if (filterType === "starred") {
      if (starredCharacters.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center py-10 text-center px-4">
            <div className="w-24 h-24 mb-4 opacity-30 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">💔</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No favorites yet
            </h3>
            <p className="text-gray-500 mt-1 text-sm">
              Mark characters as favorites to see them here.
            </p>
          </div>
        );
      }
      return (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Starred Characters ({starredCharacters.length})
          </h3>
          {starredCharacters.map(
            (char) =>
              char && <CharacterListItem key={char.id} character={char} />,
          )}
        </div>
      );
    }

    if (filterType === "others") {
      return (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Characters ({otherCharacters.length})
          </h3>
          {otherCharacters.map(
            (char) =>
              char && <CharacterListItem key={char.id} character={char} />,
          )}
        </div>
      );
    }

    // Default: All (Grouped)
    return (
      <div className="space-y-6">
        {starredCharacters.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Starred Characters ({starredCharacters.length})
            </h3>
            {starredCharacters.map(
              (char) =>
                char && <CharacterListItem key={char.id} character={char} />,
            )}
          </div>
        )}

        {otherCharacters.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Characters ({otherCharacters.length})
            </h3>
            {otherCharacters.map(
              (char) =>
                char && <CharacterListItem key={char.id} character={char} />,
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* Search Header */}
      <div className="p-4 bg-gray-50/50 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Rick and Morty list
        </h1>
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <label htmlFor="search-input" className="sr-only">
              Search characters
            </label>
            <input
              id="search-input"
              type="text"
              placeholder="Search or filter results"
              className="w-full bg-gray-100 border-none rounded-lg py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-200 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search characters"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="relative">
            {(filterType !== "all" ||
              status ||
              species ||
              gender ||
              sortOrder) && (
              <span className="absolute inset-0 rounded-lg bg-purple-600 opacity-75 animate-ping" />
            )}
            <button
              onClick={() => setIsFilterOpen(true)}
              className={`relative p-3 rounded-lg transition-colors ${
                filterType !== "all" || status || species || gender || sortOrder
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-purple-600 hover:bg-gray-200"
              }`}
              aria-label="Open filters"
              aria-expanded={isFilterOpen}
              aria-haspopup="dialog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
            </button>
          </div>

          <FilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
        </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">{renderList()}</div>
    </div>
  );
};
