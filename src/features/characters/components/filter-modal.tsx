import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize local state from URL params
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [species, setSpecies] = useState(searchParams.get("species") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [filterType, setFilterType] = useState(
    searchParams.get("filter") || "all",
  );
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "");

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
    onClose();
  };

  const handleClearFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("status");
    newParams.delete("species");
    newParams.delete("gender");
    newParams.delete("filter");
    newParams.delete("sort");
    setSearchParams(newParams);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className="absolute top-12 right-0 z-50 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Character Type
            </label>
            <div className="flex bg-gray-100 p-1 rounded-md">
              <button
                className={`flex-1 py-1 text-sm rounded-md transition-colors ${
                  filterType === "all" ? "bg-white shadow-sm" : "text-gray-500"
                }`}
                onClick={() => setFilterType("all")}
              >
                All
              </button>
              <button
                className={`flex-1 py-1 text-sm rounded-md transition-colors ${
                  filterType === "starred"
                    ? "bg-white shadow-sm"
                    : "text-gray-500"
                }`}
                onClick={() => setFilterType("starred")}
              >
                Starred
              </button>
              <button
                className={`flex-1 py-1 text-sm rounded-md transition-colors ${
                  filterType === "others"
                    ? "bg-white shadow-sm"
                    : "text-gray-500"
                }`}
                onClick={() => setFilterType("others")}
              >
                Others
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Species
            </label>
            <div className="flex bg-gray-100 p-1 rounded-md">
              <button
                className={`flex-1 py-1 text-sm rounded-md transition-colors ${
                  species === "" ? "bg-white shadow-sm" : "text-gray-500"
                }`}
                onClick={() => setSpecies("")}
              >
                All
              </button>
              <button
                className={`flex-1 py-1 text-sm rounded-md transition-colors ${
                  species === "human" ? "bg-white shadow-sm" : "text-gray-500"
                }`}
                onClick={() => setSpecies("human")}
              >
                Human
              </button>
              <button
                className={`flex-1 py-1 text-sm rounded-md transition-colors ${
                  species === "alien" ? "bg-white shadow-sm" : "text-gray-500"
                }`}
                onClick={() => setSpecies("alien")}
              >
                Alien
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full border p-2 rounded bg-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              className="w-full border p-2 rounded bg-white"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">All Genders</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort
            </label>
            <select
              className="w-full border p-2 rounded bg-white"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Default</option>
              <option value="asc">Name (A-Z)</option>
              <option value="desc">Name (Z-A)</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2 border-t">
            <button
              onClick={handleClearFilters}
              className="flex-1 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-3 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
