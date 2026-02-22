import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "react-router";
import { useState } from "react";
import { GET_CHARACTERS } from "@/graphql/queries/get-characters";
import type { GetCharactersQuery } from "@/types/__generated__/graphql";
import { ErrorBanner } from "@/shared/components/error-banner";
import { FilterModal } from "./filter-modal";
import { CharacterListSkeleton } from "./character-list-skeleton";
import { useUserInteractions } from "@/hooks/use-user-interactions";
import { WelcomeModal } from "@/shared/components/welcome-modal";
import { useWelcomeModal } from "@/shared/hooks/use-welcome-modal";
import { useCharacterSearch } from "../hooks/use-character-search";
import { useCharacterProcessing } from "../hooks/use-character-processing";
import { cn } from "@/shared/utils/cn";
import { CharacterListGrouped } from "./character-list-grouped";

export const CharacterList = () => {
  const [searchParams] = useSearchParams();
  const { deletedCharacters, favorites } = useUserInteractions();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    isOpen: isWelcomeModalOpen,
    closeModal: closeWelcomeModal,
    openModal: openWelcomeModal,
  } = useWelcomeModal();

  const { searchTerm, setSearchTerm } = useCharacterSearch();

  const name = searchParams.get("name") || undefined;
  const status = searchParams.get("status") || undefined;
  const species = searchParams.get("species") || undefined;
  const gender = searchParams.get("gender") || undefined;
  const filterType = searchParams.get("filter") || "all";
  const sortOrder = searchParams.get("sort");

  const hasActiveFilters =
    filterType !== "all" ||
    !!status ||
    !!species ||
    !!gender ||
    !!sortOrder ||
    !!name;

  const activeFiltersCount = [
    status,
    species,
    gender,
    filterType !== "all" ? true : null,
  ].filter(Boolean).length;

  const {
    loading: loadingFiltered,
    error: errorFiltered,
    data: dataFiltered,
  } = useQuery<GetCharactersQuery>(GET_CHARACTERS, {
    variables: {
      filter: {
        name,
        status,
        species,
        gender,
      },
    },
  });

  const {
    filteredCharacters: rawResults,
    starredCharacters: starredResults,
    otherCharacters: otherResults,
  } = useCharacterProcessing({
    data: dataFiltered,
    deletedCharacters,
    favorites,
    sortOrder,
  });

  let results = rawResults;
  if (filterType === "starred") results = starredResults;
  if (filterType === "others") results = otherResults;

  const displayStarred = results.filter((char) =>
    favorites.includes(char.id || ""),
  );
  const displayOthers = results.filter(
    (char) => !favorites.includes(char.id || ""),
  );

  if (errorFiltered) {
    return (
      <div className="p-4">
        <ErrorBanner
          title="Error loading characters"
          description={errorFiltered?.message || "Unknown error"}
        />
      </div>
    );
  }

  const renderList = () => {
    if (loadingFiltered && !dataFiltered) {
      return <CharacterListSkeleton />;
    }

    if (results.length === 0) {
      if (loadingFiltered) return <CharacterListSkeleton />;
      // No matches found
      if (hasActiveFilters) {
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-4 py-2 mb-2">
              <h2 className="text-blue-600 font-bold text-lg">0 Results</h2>
              {activeFiltersCount > 0 && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {activeFiltersCount} Filter
                </span>
              )}
            </div>
            <div className="text-center py-8 bg-gray-50 rounded-xl mx-4">
              <p className="text-gray-500">No matches found for this filter.</p>
            </div>
          </div>
        );
      }

      return (
        <div className="flex flex-col items-center justify-center py-10 text-center px-4">
          <div className="w-24 h-24 mb-4 opacity-30 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">�</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No characters found
          </h3>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {hasActiveFilters && (
          <div className="flex justify-between items-center px-4 py-2 mb-2">
            <h2 className="text-blue-600 font-bold text-lg">
              {results.length} Results
            </h2>
            {activeFiltersCount > 0 && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {activeFiltersCount} Filter
              </span>
            )}
          </div>
        )}
        <CharacterListGrouped
          starredCharacters={displayStarred}
          otherCharacters={displayOthers}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full ">
      <div className="p-4  sticky top-0 z-10">
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Rick and Morty list
          </h1>
          <button
            onClick={openWelcomeModal}
            className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
            title="About this project"
            aria-label="About this project"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div className="relative flex gap-2 bg-gray-100 rounded-lg">
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
            {hasActiveFilters && (
              <span className="absolute inset-0 rounded-lg bg-purple-200 opacity-75 animate-ping" />
            )}
            <button
              onClick={() => setIsFilterOpen(true)}
              className={cn(
                "relative p-3 rounded-lg transition-colors",
                hasActiveFilters
                  ? "bg-purple-200 text-purple-800 shadow-lg"
                  : "bg-gray-100 text-purple-600 hover:bg-gray-200",
              )}
              aria-label="Open filters"
              aria-expanded={isFilterOpen}
              aria-haspopup="dialog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
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
            <FilterModal
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">{renderList()}</div>

      <WelcomeModal isOpen={isWelcomeModalOpen} onClose={closeWelcomeModal} />
    </div>
  );
};
