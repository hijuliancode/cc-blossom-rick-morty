import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { UserInteractionsProvider } from "./user-interactions-provider";
import { useUserInteractions } from "../hooks/use-user-interactions";
import type { ReactNode } from "react";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <UserInteractionsProvider>{children}</UserInteractionsProvider>
);

describe("UserInteractionsContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should toggle favorites", () => {
    const { result } = renderHook(() => useUserInteractions(), { wrapper });

    act(() => {
      result.current.toggleFavorite("1");
    });

    expect(result.current.favorites).toContain("1");

    act(() => {
      result.current.toggleFavorite("1");
    });

    expect(result.current.favorites).not.toContain("1");
  });

  it("should hide characters", () => {
    const { result } = renderHook(() => useUserInteractions(), { wrapper });

    act(() => {
      result.current.hideCharacter("1");
    });

    expect(result.current.hiddenCharacters).toContain("1");
  });

  it("should add, edit and delete comments", () => {
    const { result } = renderHook(() => useUserInteractions(), { wrapper });

    // Add
    act(() => {
      result.current.addComment("1", "Test comment");
    });

    expect(result.current.comments["1"]).toHaveLength(1);
    expect(result.current.comments["1"][0].text).toBe("Test comment");

    const commentId = result.current.comments["1"][0].id;

    // Edit
    act(() => {
      result.current.editComment("1", commentId, "Updated comment");
    });

    expect(result.current.comments["1"][0].text).toBe("Updated comment");

    // Delete
    act(() => {
      result.current.deleteComment("1", commentId);
    });

    expect(result.current.comments["1"]).toHaveLength(0);
  });
});
