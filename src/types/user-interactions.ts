export type Comment = {
  id: string;
  text: string;
  createdAt: string;
};

export type UserInteractionsContextType = {
  favorites: string[];
  hiddenCharacters: string[];
  comments: Record<string, Comment[]>;
  toggleFavorite: (characterId: string) => void;
  hideCharacter: (characterId: string) => void;
  addComment: (characterId: string, text: string) => void;
  deleteComment: (characterId: string, commentId: string) => void;
};
