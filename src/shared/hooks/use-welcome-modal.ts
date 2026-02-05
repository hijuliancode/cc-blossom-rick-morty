import { useState } from "react";
import { WELCOME_MODAL_STORAGE_KEY } from "@/shared/constants/local-storage";

export const useWelcomeModal = () => {
  // Initialize state based on localStorage (lazy initialization)
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem(WELCOME_MODAL_STORAGE_KEY);
  });

  const closeModal = () => {
    localStorage.setItem(WELCOME_MODAL_STORAGE_KEY, "true");
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    closeModal,
    openModal,
  };
};
