// src/pages/menu-items/MenuItemsPage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MenuItemsPage from "./MenuItemsPage";
import { createMockStore } from "@/app/test-utils";

// Mock the redux store
const mockUseSelector = vi.fn();
const mockUseDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: (...args: any) => mockUseSelector(...args),
    useDispatch: () => mockUseDispatch,
  };
});

// Mock react-device-detect
vi.mock("react-device-detect", () => ({
  isTablet: false,
  useMobileOrientation: () => ({ isLandscape: false }),
}));

// Mock the useIsToday hook
vi.mock("@/app/hooks/useIsToday", () => ({
  default: () => true,
}));

// Shared mock data for menu items
const mockMenuItems = [
  {
    _id: "04dde850-3973-4294-95bd-041bbf723df5",
    name: "Go Macy",
    description: "מאצ'ה ו תפוח",
    image: "https://cdn.sanity.io/images/nbnryam2/production/1bbc11d2ca683315ce0f62ed50fa3f25d9c77d9e-640x1138.jpg",
    likes: 10,
    category: { name: "Smoothies" },
    recipes: [],
  },
  {
    _id: "06df1ff0-7226-444b-b700-982414ce4013",
    name: "Go Nutella",
    description: "שוקולד נוטלה ובננה",
    image: "https://cdn.sanity.io/images/nbnryam2/production/a247e1860ced0035e0507f747f4526fca3c052a3-640x1138.jpg",
    likes: 5,
    category: { name: "Smoothies" },
    recipes: [],
  },
  {
    _id: "0fec79e7-dc54-4da8-a603-aef66cf3f7bc",
    name: "Go Tory",
    description: "תות בננה",
    image: "https://cdn.sanity.io/images/nbnryam2/production/da78eef5cf1592ca02558b9b90d02b647b1bcf66-640x1138.jpg",
    likes: 8,
    category: { name: "Smoothies" },
    recipes: [],
  },
  {
    _id: "1a2b3c4d-5678-9101-1121-314151617181",
    name: "Go Berry",
    description: "Mixed Berries",
    image: "https://cdn.sanity.io/images/nbnryam2/production/berry-image.jpg",
    likes: 12,
    category: { name: "Juices" },
    recipes: [],
  },
];

describe("MenuItemsPage", () => {
  let mockStore: ReturnType<typeof createMockStore>;
  let mockDispatch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockStore = createMockStore({
      menuItems: {
        items: mockMenuItems,
        status: "succeeded",
        categories: ["Smoothies", "Juices"],
        isIncremented: {},
        likesCount: {},
        lastFetched: new Date().toISOString(),
      },
    });

    mockDispatch = vi.fn();
    mockUseSelector.mockImplementation((selector) => selector(mockStore.getState()));
    mockUseDispatch.mockReturnValue(mockDispatch);
  });

  it("renders the MenuItemsPage with categories and menu items", () => {
    render(<MenuItemsPage />);
    expect(screen.getByText("Smoothies")).toBeInTheDocument();
    expect(screen.getByText("Juices")).toBeInTheDocument();
    expect(screen.getByText("Go Macy")).toBeInTheDocument();
    expect(screen.getByText("Go Nutella")).toBeInTheDocument();
    expect(screen.getByText("Go Tory")).toBeInTheDocument();
  });

  it("changes active category when a category button is clicked", () => {
    render(<MenuItemsPage />);
    const categoryButton = screen.getByText("Juices");
    fireEvent.click(categoryButton);
    expect(screen.getByText("Go Berry")).toBeInTheDocument();
    expect(screen.queryByText("Go Macy")).not.toBeInTheDocument();
    expect(screen.queryByText("Go Nutella")).not.toBeInTheDocument();
    expect(screen.queryByText("Go Tory")).not.toBeInTheDocument();
  });

  it("filters items by category", () => {
    render(<MenuItemsPage />);
    const categoryButton = screen.getByText("Juices");
    fireEvent.click(categoryButton);
    expect(screen.getByText("Go Berry")).toBeInTheDocument();
    expect(screen.queryByText("Go Macy")).not.toBeInTheDocument();
  });
});