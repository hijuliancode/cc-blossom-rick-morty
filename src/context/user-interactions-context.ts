import { createContext } from "react";
import type { UserInteractionsContextType } from "@/types/user-interactions";

export const UserInteractionsContext = createContext<
  UserInteractionsContextType | undefined
>(undefined);
