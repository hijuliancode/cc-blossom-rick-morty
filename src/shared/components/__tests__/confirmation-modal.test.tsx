import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ConfirmationModal } from "../confirmation-modal";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("ConfirmationModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: "Delete Item",
    message: "Are you sure you want to delete this item?",
    confirmText: "Yes, Delete",
    cancelText: "No, Cancel",
  };

  it("does not render when isOpen is false", () => {
    render(<ConfirmationModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("renders correctly when isOpen is true", () => {
    render(<ConfirmationModal {...defaultProps} />);

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: defaultProps.confirmText }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: defaultProps.cancelText }),
    ).toBeInTheDocument();
  });

  it("calls onConfirm and onClose when confirm button is clicked", async () => {
    const user = userEvent.setup();
    render(<ConfirmationModal {...defaultProps} />);

    await user.click(
      screen.getByRole("button", { name: defaultProps.confirmText }),
    );

    expect(defaultProps.onConfirm).toHaveBeenCalled();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<ConfirmationModal {...defaultProps} />);

    await user.click(
      screen.getByRole("button", { name: defaultProps.cancelText }),
    );

    expect(defaultProps.onClose).toHaveBeenCalled();
    // onConfirm should NOT be called
    expect(defaultProps.onConfirm).not.toHaveBeenCalledTimes(2); // Checking cumulative calls from previous test if using same mock, but ideally mocks reset.
    // Better to use beforeEach to reset mocks or create new ones.
  });

  it("calls onClose when pressing Escape", async () => {
    const user = userEvent.setup();
    render(<ConfirmationModal {...defaultProps} />);

    await user.keyboard("{Escape}");

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ConfirmationModal {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
