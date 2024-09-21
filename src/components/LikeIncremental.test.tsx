// src/components/LikeIncremental.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { createMockStore } from "@/app/test-utils";
import LikeIncremental from "./LikeIncremental";

// Mock the redux store
const mockUseSelector = vi.fn();
const mockUseDispatch = vi.fn();

// Mock the actions
const incrementLike = vi.fn();
const incrementLikesAsync = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: (...args: any) => mockUseSelector(...args),
    useDispatch: () => mockUseDispatch,
  };
});

vi.mock('@/app/redux/features/menuItems/menuItemsSlice', async (importOriginal) => {
  return {
    ...await importOriginal(),
    incrementLike: (id) => incrementLike(id),
    incrementLikesAsync: (id) => incrementLikesAsync(id),
  };
});

describe("LikeIncremental", () => {
  let mockStore: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    mockStore = createMockStore({
      menuItems: {
        items: [
          {
            _id: "04dde850-3973-4294-95bd-041bbf723df5",
            name: "Go Macy",
            description: "מאצ'ה ו תפוח",
            image: "https://cdn.sanity.io/images/nbnryam2/production/1bbc11d2ca683315ce0f62ed50fa3f25d9c77d9e-640x1138.jpg",
            likes: 0,
            category: { name: "Smoothies" },
            recipes: []
          },
        ],
        status: "idle",
        categories: ["Smoothies"],
        isIncremented: {},
        likesCount: {},
        lastFetched: null,
      },
    });

    mockUseSelector.mockImplementation((selector) => selector(mockStore.getState()));
    mockUseDispatch.mockReturnValue(vi.fn());
  });

  const renderComponent = (itemId: string) => {
    render(
      <Provider store={mockStore}>
        <LikeIncremental itemId={itemId} />
      </Provider>
    );
  };

  it("renders with initial likes and not incremented", () => {
    renderComponent("04dde850-3973-4294-95bd-041bbf723df5");
    // expect(screen.getByText(" ")).toBeInTheDocument(); // Initial likes display
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("increments likes when button is clicked", () => {
    renderComponent("04dde850-3973-4294-95bd-041bbf723df5");
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(incrementLike).toHaveBeenCalledWith("04dde850-3973-4294-95bd-041bbf723df5");
    expect(incrementLikesAsync).toHaveBeenCalledWith("04dde850-3973-4294-95bd-041bbf723df5");
  });

  it("disables button when already incremented", () => {
    mockStore = createMockStore({
      menuItems: {
        items: [
          {
            _id: "04dde850-3973-4294-95bd-041bbf723df5",
            name: "Go Macy",
            description: "מאצ'ה ו תפוח",
            image: "https://cdn.sanity.io/images/nbnryam2/production/1bbc11d2ca683315ce0f62ed50fa3f25d9c77d9e-640x1138.jpg",
            likes: 0,
            category: { name: "Smoothies" },
            recipes: []
          },
        ],
        status: "idle",
        categories: ["Smoothies"],
        likesCount: { "04dde850-3973-4294-95bd-041bbf723df5": 1 },
        isIncremented: { "04dde850-3973-4294-95bd-041bbf723df5": true },
        lastFetched: null,
      },
    });
    mockUseSelector.mockImplementation((selector) => selector(mockStore.getState()));

    renderComponent("04dde850-3973-4294-95bd-041bbf723df5");
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("formats likes count correctly", () => {
    mockStore = createMockStore({
      menuItems: {
        items: [
          {
            _id: "04dde850-3973-4294-95bd-041bbf723df5",
            name: "Go Macy",
            description: "מאצ'ה ו תפוח",
            image: "https://cdn.sanity.io/images/nbnryam2/production/1bbc11d2ca683315ce0f62ed50fa3f25d9c77d9e-640x1138.jpg",
            likes: 0,
            category: { name: "Smoothies" },
            recipes: []
          },
        ],
        status: "idle",
        categories: ["Smoothies"],
        likesCount: { "04dde850-3973-4294-95bd-041bbf723df5": 1500 },
        isIncremented: { "04dde850-3973-4294-95bd-041bbf723df5": true },
        lastFetched: null,
      },
    });
    mockUseSelector.mockImplementation((selector) => selector(mockStore.getState()));

    renderComponent("04dde850-3973-4294-95bd-041bbf723df5");
    expect(screen.getByText("1.5K")).toBeInTheDocument();
  });
});