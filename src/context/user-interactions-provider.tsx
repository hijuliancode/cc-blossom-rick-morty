import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { UserInteractionsContext } from "./user-interactions-context";
import type { Comment } from "@/types/user-interactions";
import { USER_INTERACTIONS_STORAGE_KEY } from "@/shared/constants/local-storage";

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
      const stored = localStorage.getItem(USER_INTERACTIONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });

  useEffect(() => {
    localStorage.setItem(USER_INTERACTIONS_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const toggleFavorite = useCallback((characterId: string) => {
    setData((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(characterId)
        ? prev.favorites.filter((id) => id !== characterId)
        : [...prev.favorites, characterId],
    }));
  }, []);

  const hideCharacter = useCallback((characterId: string) => {
    setData((prev) => ({
      ...prev,
      hiddenCharacters: [...prev.hiddenCharacters, characterId],
    }));
  }, []);

  const addComment = useCallback((characterId: string, text: string) => {
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
  }, []);

  const deleteComment = useCallback(
    (characterId: string, commentId: string) => {
      setData((prev) => ({
        ...prev,
        comments: {
          ...prev.comments,
          [characterId]:
            prev.comments[characterId]?.filter((c) => c.id !== commentId) || [],
        },
      }));
    },
    [],
  );

  const editComment = useCallback(
    (characterId: string, commentId: string, text: string) => {
      setData((prev) => ({
        ...prev,
        comments: {
          ...prev.comments,
          [characterId]:
            prev.comments[characterId]?.map((c) =>
              c.id === commentId ? { ...c, text } : c,
            ) || [],
        },
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      ...data,
      toggleFavorite,
      hideCharacter,
      addComment,
      deleteComment,
      editComment,
    }),
    [
      data,
      toggleFavorite,
      hideCharacter,
      addComment,
      deleteComment,
      editComment,
    ],
  );

  return (
    <UserInteractionsContext.Provider value={value}>
      {children}
    </UserInteractionsContext.Provider>
  );
};
