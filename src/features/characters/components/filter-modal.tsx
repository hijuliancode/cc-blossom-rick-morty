import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";

import { cn } from "@/shared/utils/cn";

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FilterButton = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex-1 px-4 py-2 text-sm font-medium rounded-lg border transition-all",
      isSelected
        ? "bg-purple-100 border-purple-100 text-purple-700"
        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50",
    )}
  >
    {label}
  </button>
);

export const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.style.transform = "";
    }
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;

    if (deltaY > 0 && modalRef.current) {
      modalRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.changedTouches[0].clientY;
    const deltaY = currentY - touchStartY.current;

    if (deltaY > 100) {
      onClose();
    } else if (modalRef.current) {
      modalRef.current.style.transition = "transform 0.3s ease-out";
      modalRef.current.style.transform = "";
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.style.transition = "";
        }
      }, 300);
    }
    touchStartY.current = null;
  };

  // Initialize local state from URL params
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [species, setSpecies] = useState(searchParams.get("species") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [filterType, setFilterType] = useState(
    searchParams.get("filter") || "all",
  );
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "");

  const hasFilters =
    status !== "" ||
    species !== "" ||
    gender !== "" ||
    filterType !== "all" ||
    sortOrder !== "";

  const hasUrlFilters =
    searchParams.has("status") ||
    searchParams.has("species") ||
    searchParams.has("gender") ||
    (searchParams.has("filter") && searchParams.get("filter") !== "all") ||
    searchParams.has("sort");

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
    setStatus("");
    setSpecies("");
    setGender("");
    setFilterType("all");
    setSortOrder("");
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className={cn(
          "z-50 bg-white shadow-xl overflow-y-auto p-6 animate-in fade-in duration-200",
          // Mobile: Action Sheet
          "fixed inset-x-0 bottom-0 w-full max-h-[85vh] rounded-t-2xl slide-in-from-bottom-10",
          // Desktop: Popover
          "md:absolute md:top-12 md:right-0 md:bottom-auto md:left-auto md:w-80 md:max-h-[80vh] md:rounded-xl md:border md:border-gray-100 md:slide-in-from-bottom-0 md:zoom-in-95",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-modal-title"
      >
        <h2 id="filter-modal-title" className="sr-only">
          Filters
        </h2>

        <div
          className="md:hidden flex flex-col items-center mb-6 cursor-pointer touch-none"
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-4" />
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-gray-500 font-medium mb-3">Character</h3>
            <div className="flex gap-3">
              <FilterButton
                label="All"
                isSelected={filterType === "all"}
                onClick={() => setFilterType("all")}
              />
              <FilterButton
                label="Starred"
                isSelected={filterType === "starred"}
                onClick={() => setFilterType("starred")}
              />
              <FilterButton
                label="Others"
                isSelected={filterType === "others"}
                onClick={() => setFilterType("others")}
              />
            </div>
          </div>

          <div>
            <h3 className="text-gray-500 font-medium mb-3">Specie</h3>
            <div className="flex gap-3">
              <FilterButton
                label="All"
                isSelected={species === ""}
                onClick={() => setSpecies("")}
              />
              <FilterButton
                label="Human"
                isSelected={species === "human"}
                onClick={() => setSpecies("human")}
              />
              <FilterButton
                label="Alien"
                isSelected={species === "alien"}
                onClick={() => setSpecies("alien")}
              />
            </div>
          </div>

          <div>
            <h3 className="text-gray-500 font-medium mb-3">Status</h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                label="All"
                isSelected={status === ""}
                onClick={() => setStatus("")}
              />
              <FilterButton
                label="Alive"
                isSelected={status === "alive"}
                onClick={() => setStatus("alive")}
              />
              <FilterButton
                label="Dead"
                isSelected={status === "dead"}
                onClick={() => setStatus("dead")}
              />
              <FilterButton
                label="Unknown"
                isSelected={status === "unknown"}
                onClick={() => setStatus("unknown")}
              />
            </div>
          </div>

          <div>
            <h3 className="text-gray-500 font-medium mb-3">Gender</h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                label="All"
                isSelected={gender === ""}
                onClick={() => setGender("")}
              />
              <FilterButton
                label="Female"
                isSelected={gender === "female"}
                onClick={() => setGender("female")}
              />
              <FilterButton
                label="Male"
                isSelected={gender === "male"}
                onClick={() => setGender("male")}
              />
              <FilterButton
                label="Genderless"
                isSelected={gender === "genderless"}
                onClick={() => setGender("genderless")}
              />
              <FilterButton
                label="Unknown"
                isSelected={gender === "unknown"}
                onClick={() => setGender("unknown")}
              />
            </div>
          </div>

          <div>
            <h3 className="text-gray-500 font-medium mb-3">Sort</h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                label="Default"
                isSelected={sortOrder === ""}
                onClick={() => setSortOrder("")}
              />
              <FilterButton
                label="A-Z"
                isSelected={sortOrder === "asc"}
                onClick={() => setSortOrder("asc")}
              />
              <FilterButton
                label="Z-A"
                isSelected={sortOrder === "desc"}
                onClick={() => setSortOrder("desc")}
              />
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <div className="relative">
              {(hasFilters || hasUrlFilters) && (
                <span className="absolute inset-0 rounded-lg bg-purple-200 opacity-75 animate-ping" />
              )}
              <button
                onClick={handleApplyFilters}
                className={cn(
                  "relative w-full py-3 font-medium rounded-lg transition-all",
                  hasFilters || hasUrlFilters
                    ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200",
                )}
              >
                Filter
              </button>
            </div>
            {hasFilters && (
              <button
                onClick={handleClearFilters}
                className="w-full py-3 text-gray-500 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
