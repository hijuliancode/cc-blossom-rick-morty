import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Comment = {
  id: string;
  text: string;
  createdAt: string;
};

type UserInteractionsContextType = {
  favorites: string[];
  hiddenCharacters: string[];
  comments: Record<string, Comment[]>;
  toggleFavorite: (characterId: string) => void;
  hideCharacter: (characterId: string) => void;
  addComment: (characterId: string, text: string) => void;
  deleteComment: (characterId: string, commentId: string) => void;
};

const UserInteractionsContext = createContext<
  UserInteractionsContextType | undefined
>(undefined);

const STORAGE_KEY = "rick-morty-user-interactions";

type StoredData = {
  favorites: string[];
  hiddenCharacters: string[];
  comments: Record<string, Comment[]>;
};

const INITIAL_DATA: StoredData = {
  favorites: [],
  hiddenCharacters: [],
  comments: {},
};

export const UserInteractionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<StoredData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const toggleFavorite = (characterId: string) => {
    setData((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(characterId)
        ? prev.favorites.filter((id) => id !== characterId)
        : [...prev.favorites, characterId],
    }));
  };

  const hideCharacter = (characterId: string) => {
    setData((prev) => ({
      ...prev,
      hiddenCharacters: [...prev.hiddenCharacters, characterId],
    }));
  };

  const addComment = (characterId: string, text: string) => {
    const newComment: Comment = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
    };

    setData((prev) => ({
      ...prev,
      comments: {
        ...prev.comments,
        [characterId]: [...(prev.comments[characterId] || []), newComment],
      },
    }));
  };

  const deleteComment = (characterId: string, commentId: string) => {
    setData((prev) => ({
      ...prev,
      comments: {
        ...prev.comments,
        [characterId]:
          prev.comments[characterId]?.filter((c) => c.id !== commentId) || [],
      },
    }));
  };

  return (
    <UserInteractionsContext.Provider
      value={{
        ...data,
        toggleFavorite,
        hideCharacter,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </UserInteractionsContext.Provider>
  );
};

export const useUserInteractions = () => {
  const context = useContext(UserInteractionsContext);
  if (!context) {
    throw new Error(
      "useUserInteractions must be used within a UserInteractionsProvider",
    );
  }
  return context;
};
