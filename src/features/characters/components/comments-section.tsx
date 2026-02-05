import { useState } from "react";
import { useUserInteractions } from "@/hooks/use-user-interactions";
import { ConfirmationModal } from "@/shared/components/confirmation-modal";

type CommentsSectionProps = {
  characterId: string;
};

export const CommentsSection = ({ characterId }: CommentsSectionProps) => {
  const { comments, addComment, editComment, deleteComment } =
    useUserInteractions();
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);

  const characterComments = comments[characterId] || [];

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(characterId, newComment.trim());
    setNewComment("");
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleUpdateComment = (id: string) => {
    if (!editText.trim()) return;
    editComment(characterId, id, editText.trim());
    setEditingId(null);
    setEditText("");
  };

  const confirmDeleteComment = () => {
    if (deleteCommentId) {
      deleteComment(characterId, deleteCommentId);
      setDeleteCommentId(null);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="mb-6">
        <div className="flex gap-2">
          <label htmlFor="new-comment" className="sr-only">
            Add a comment
          </label>
          <input
            id="new-comment"
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border bg-white text-gray-900 placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4" role="list">
        {characterComments.length === 0 ? (
          <p className="text-gray-500 italic text-sm">No comments yet.</p>
        ) : (
          characterComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 rounded-lg p-4"
              role="listitem"
            >
              {editingId === comment.id ? (
                <div className="space-y-2">
                  <label
                    htmlFor={`edit-comment-${comment.id}`}
                    className="sr-only"
                  >
                    Edit comment
                  </label>
                  <input
                    id={`edit-comment-${comment.id}`}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border bg-white text-gray-900"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateComment(comment.id)}
                      className="text-sm text-purple-600 hover:text-purple-900 font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-900 text-sm mb-2">{comment.text}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEditing(comment.id, comment.text)}
                        className="hover:text-purple-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteCommentId(comment.id)}
                        className="hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      <ConfirmationModal
        isOpen={!!deleteCommentId}
        onClose={() => setDeleteCommentId(null)}
        onConfirm={confirmDeleteComment}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};
