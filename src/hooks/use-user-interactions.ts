import { useContext } from "react";
import { UserInteractionsContext } from "../context/user-interactions-context";

export const useUserInteractions = () => {
  const context = useContext(UserInteractionsContext);
  if (!context) {
    throw new Error(
      "useUserInteractions must be used within a UserInteractionsProvider",
    );
  }
  return context;
};
