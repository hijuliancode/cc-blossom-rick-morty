import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../../shared/hooks/use-debounce";

export const FilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize local state from URL params
  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [species, setSpecies] = useState(searchParams.get("species") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [filterType, setFilterType] = useState(
    searchParams.get("filter") || "all",
  );
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "");
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Sync debounced search term with URL
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

  const handleApplyFilters = () => {
    const newParams = new URLSearchParams(searchParams);

    if (status) newParams.set("status", status);
    else newParams.delete("status");

    if (species) newParams.set("species", species);
    else newParams.delete("species");

    if (gender) newParams.set("gender", gender);
    else newParams.delete("gender");

    if (filterType && filterType !== "all") newParams.set("filter", filterType);
    else newParams.delete("filter");

    if (sortOrder) newParams.set("sort", sortOrder);
    else newParams.delete("sort");

    newParams.delete("page");
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatus("");
    setSpecies("");
    setGender("");
    setFilterType("all");
    setSortOrder("");
    setSearchParams({});
  };

  return (
    <div className="flex flex-col gap-4 p-4 border-b">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name..."
            className="border p-2 rounded w-64 pr-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2 rounded border transition-colors ${
            showFilters ? "bg-gray-100 border-gray-400" : "hover:bg-gray-50"
          }`}
          title="Toggle Filters"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-wrap gap-4 items-center">
            <select
              className="border p-2 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Status: All</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>

            <select
              className="border p-2 rounded"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
            >
              <option value="">Species: All</option>
              <option value="human">Human</option>
              <option value="alien">Alien</option>
            </select>

            <select
              className="border p-2 rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gender: All</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>

            <select
              className="border p-2 rounded"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Show: All</option>
              <option value="starred">Starred Only</option>
              <option value="others">Others (Non-starred)</option>
            </select>

            <select
              className="border p-2 rounded"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort: Default</option>
              <option value="asc">Name (A-Z)</option>
              <option value="desc">Name (Z-A)</option>
            </select>
          </div>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
