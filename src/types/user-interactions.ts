export type Comment = {
  id: string;
  text: string;
  createdAt: string;
};

export type UserInteractionsContextType = {
  favorites: string[];
  deletedCharacters: string[];
  comments: Record<string, Comment[]>;
  toggleFavorite: (characterId: string) => void;
  deleteCharacter: (characterId: string) => void;
  addComment: (characterId: string, text: string) => void;
  editComment: (characterId: string, commentId: string, text: string) => void;
  deleteComment: (characterId: string, commentId: string) => void;
};
