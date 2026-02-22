import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { useMediaQuery } from "@/shared/hooks/use-media-query";

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

const FilterModalContent = ({ onClose }: { onClose: () => void }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const dragControls = useDragControls();

  // Initialize local state from URL params
  // Since this component is conditionally rendered, it will re-initialize
  // every time it opens, eliminating the need for a sync useEffect.
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [species, setSpecies] = useState(searchParams.get("species") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [filterType, setFilterType] = useState(
    searchParams.get("filter") || "all",
  );
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

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

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        initial={isDesktop ? { opacity: 0, scale: 0.95 } : { y: "100%" }}
        animate={isDesktop ? { opacity: 1, scale: 1 } : { y: 0 }}
        exit={isDesktop ? { opacity: 0, scale: 0.95 } : { y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        drag={isDesktop ? false : "y"}
        dragControls={dragControls}
        dragListener={false} // Only drag via controls (handle)
        dragConstraints={{ top: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={handleDragEnd}
        className={cn(
          "z-50 bg-white shadow-xl overflow-hidden flex flex-col",
          // Mobile: Action Sheet
          "fixed inset-x-0 bottom-0 w-full max-h-[85vh] rounded-t-2xl",
          // Desktop: Popover
          "md:absolute md:top-12 md:right-0 md:bottom-auto md:left-auto md:w-80 md:max-h-[80vh] md:rounded-xl md:border md:border-gray-100",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-modal-title"
      >
        <h2 id="filter-modal-title" className="sr-only">
          Filters
        </h2>

        {/* Mobile Drag Handle & Header */}
        <div
          className="md:hidden flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none shrink-0"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-4" />
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-2">
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
                  isSelected={species === "Human"}
                  onClick={() => setSpecies("Human")}
                />
                <FilterButton
                  label="Alien"
                  isSelected={species === "Alien"}
                  onClick={() => setSpecies("Alien")}
                />
              </div>
            </div>

            <div>
              <h3 className="text-gray-500 font-medium mb-3">Gender</h3>
              <div className="flex gap-3">
                <FilterButton
                  label="All"
                  isSelected={gender === ""}
                  onClick={() => setGender("")}
                />
                <FilterButton
                  label="Male"
                  isSelected={gender === "Male"}
                  onClick={() => setGender("Male")}
                />
                <FilterButton
                  label="Female"
                  isSelected={gender === "Female"}
                  onClick={() => setGender("Female")}
                />
              </div>
            </div>

            <div>
              <h3 className="text-gray-500 font-medium mb-3">Status</h3>
              <div className="flex gap-3">
                <FilterButton
                  label="All"
                  isSelected={status === ""}
                  onClick={() => setStatus("")}
                />
                <FilterButton
                  label="Alive"
                  isSelected={status === "Alive"}
                  onClick={() => setStatus("Alive")}
                />
                <FilterButton
                  label="Dead"
                  isSelected={status === "Dead"}
                  onClick={() => setStatus("Dead")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3 shrink-0">
          <button
            onClick={handleClearFilters}
            className="flex-1 px-4 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
          >
            Clear all
          </button>
          <button
            onClick={handleApplyFilters}
            className="flex-1 px-4 py-2.5 bg-purple-600 text-white font-medium hover:bg-purple-700 rounded-xl transition-colors shadow-sm"
          >
            Filter
          </button>
        </div>
      </motion.div>
    </>
  );
};

export const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && <FilterModalContent onClose={onClose} />}
    </AnimatePresence>
  );
};
