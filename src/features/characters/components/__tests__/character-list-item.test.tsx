import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { CharacterListItem } from "../character-list-item";
import { MemoryRouter } from "react-router";
import * as UserInteractionsHook from "@/hooks/use-user-interactions";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Mock the custom hook
vi.mock("@/hooks/use-user-interactions");

const mockCharacter = {
  id: "1",
  name: "Rick Sanchez",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

describe("CharacterListItem", () => {
  const mockToggleFavorite = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (UserInteractionsHook.useUserInteractions as Mock).mockReturnValue({
      favorites: [],
      toggleFavorite: mockToggleFavorite,
    });
  });

  it("renders character information correctly", () => {
    render(
      <MemoryRouter>
        <CharacterListItem character={mockCharacter} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockCharacter.image);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Rick Sanchez");
  });

  it("shows empty heart when not favorited", () => {
    render(
      <MemoryRouter>
        <CharacterListItem character={mockCharacter} />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText("Add to favorites")).toBeInTheDocument();
    expect(screen.getByText("♡")).toBeInTheDocument();
  });

  it("shows filled heart when favorited", () => {
    (UserInteractionsHook.useUserInteractions as Mock).mockReturnValue({
      favorites: ["1"],
      toggleFavorite: mockToggleFavorite,
    });

    render(
      <MemoryRouter>
        <CharacterListItem character={mockCharacter} />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText("Remove from favorites")).toBeInTheDocument();
    expect(screen.getByText("♥")).toBeInTheDocument();
  });

  it("calls toggleFavorite when favorite button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CharacterListItem character={mockCharacter} />
      </MemoryRouter>,
    );

    const button = screen.getByLabelText("Add to favorites");
    await user.click(button);

    expect(mockToggleFavorite).toHaveBeenCalledWith("1");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <CharacterListItem character={mockCharacter} />
      </MemoryRouter>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
