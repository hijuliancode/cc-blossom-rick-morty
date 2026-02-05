import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FilterModal } from "./filter-modal";
import { MemoryRouter } from "react-router";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("FilterModal", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("does not render when isOpen is false", () => {
    render(
      <MemoryRouter>
        <FilterModal isOpen={false} onClose={mockOnClose} />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders correctly when isOpen is true", () => {
    render(
      <MemoryRouter>
        <FilterModal isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Character")).toBeInTheDocument();
    expect(screen.getByText("Specie")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Sort")).toBeInTheDocument();
  });

  it("calls onClose when pressing Escape", async () => {
    // Escape key listener is on window, userEvent.keyboard works on document/active element
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <FilterModal isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>,
    );

    await user.keyboard("{Escape}");

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("renders filter buttons correctly", () => {
    render(
      <MemoryRouter>
        <FilterModal isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>,
    );

    // Check for some specific filter buttons
    expect(screen.getByRole("button", { name: "Starred" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Human" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Alive" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <FilterModal isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
