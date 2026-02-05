import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "@/shared/hooks/use-debounce";

export const useCharacterSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Sync from URL to local state (e.g. Back button)
  useEffect(() => {
    const nameFromUrl = searchParams.get("name") || "";
    // Using functional update to avoid dependency on searchTerm
    setSearchTerm((prev) => (prev !== nameFromUrl ? nameFromUrl : prev));
  }, [searchParams]);

  // Sync from local state to URL (User typing)
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

  return {
    searchTerm,
    setSearchTerm,
  };
};
