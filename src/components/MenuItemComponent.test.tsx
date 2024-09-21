// src/components/MenuItemComponent.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { createMockStore } from "@/app/test-utils";
import MenuItemsComponent from "./MenuItemComponent";
import Dialog from "./Dialog";
import LikeIncremental from "./LikeIncremental"; // Import LikeIncremental for testing

describe("MenuItemsComponent", () => {
  let mockStore: ReturnType<typeof createMockStore>;
  const mockItem = {
    _id: "04dde850-3973-4294-95bd-041bbf723df5",
    name: "Go Macy",
    description: "מאצ'ה ו תפוח",
    image: "https://cdn.sanity.io/images/nbnryam2/production/1bbc11d2ca683315ce0f62ed50fa3f25d9c77d9e-640x1138.jpg",
    recipes: ["Recipe 1", "Recipe 2"],
  };

  beforeEach(() => {
    mockStore = createMockStore({
      menuItems: {
        items: [],
        status: "idle",
        categories: [],
        isIncremented: {},
        likesCount: {},
        lastFetched: null,
      },
    });
  });

  const renderComponent = () => {
    render(
      <Provider store={mockStore}>
        <MenuItemsComponent item={mockItem} />
      </Provider>
    );
  };

  it("renders the menu item correctly", () => {
    renderComponent();
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(mockItem.description)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: mockItem.name })).toHaveAttribute("src", mockItem.image);
    expect(screen.getByText("רכיבים:")).toBeInTheDocument();
    expect(screen.getByText("Recipe 1")).toBeInTheDocument();
    expect(screen.getByText("Recipe 2")).toBeInTheDocument();
  });

  it("opens the dialog when the image is clicked", () => {
    renderComponent();
    const image = screen.getByRole("img", { name: mockItem.name });
    fireEvent.click(image);
    expect(screen.getByLabelText("Close dialog")).toBeInTheDocument(); // Check if the dialog is open
  });

  it("closes the dialog when the close button is clicked", () => {
    renderComponent();
    const image = screen.getByRole("img", { name: mockItem.name });
    fireEvent.click(image); // Open the dialog
    const closeButton = screen.getByLabelText("Close dialog"); // Use the correct aria-label
    fireEvent.click(closeButton); // Close the dialog
    expect(closeButton).not.toBeInTheDocument(); // Check if the dialog is closed
  });

  it("renders the LikeIncremental component", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: /like/i })).toBeInTheDocument(); // Assuming the LikeIncremental button has a role
  });
});