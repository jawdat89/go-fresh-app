// src/pages/gallery/GalleryPage.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import GalleryPage from "./GalleryPage";
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

// Mock Swiper
vi.mock("swiper/react", () => ({
  Swiper: ({ children }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="swiper-slide">{children}</div>,
}));

// Mock react-device-detect
vi.mock("react-device-detect", () => ({
  isMobile: false,
  isTablet: false,
  useMobileOrientation: () => ({ isLandscape: false }),
}));

describe("GalleryPage", () => {
  let mockStore: ReturnType<typeof createMockStore>;
  let mockDispatch: ReturnType<typeof vi.fn>;

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
          {
            _id: "06df1ff0-7226-444b-b700-982414ce4013",
            name: "Go Nutella",
            description: "שוקולד נוטלה ובננה",
            image: "https://cdn.sanity.io/images/nbnryam2/production/a247e1860ced0035e0507f747f4526fca3c052a3-640x1138.jpg",
            likes: 0,
            category: { name: "Smoothies" },
            recipes: []
          },
          {
            _id: "0fec79e7-dc54-4da8-a603-aef66cf3f7bc",
            name: "Go Tory",
            description: "תות בננה",
            image: "https://cdn.sanity.io/images/nbnryam2/production/da78eef5cf1592ca02558b9b90d02b647b1bcf66-640x1138.jpg",
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

    mockDispatch = vi.fn();
    mockUseSelector.mockImplementation((selector) => selector(mockStore.getState()));
    mockUseDispatch.mockReturnValue(mockDispatch);

    render(<GalleryPage />);
  });

  it("renders the GalleryPage with menu items and their descriptions", () => {
    expect(screen.getAllByText("Go Macy").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Go Nutella").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Go Tory").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("מאצ'ה ו תפוח")).toBeInTheDocument();
    expect(screen.getByText("שוקולד נוטלה ובננה")).toBeInTheDocument();
    expect(screen.getByText("תות בננה")).toBeInTheDocument();
  });

  it("opens the side panel and displays correct information", () => {
    const menuButton = screen.getByText("☰");
    fireEvent.click(menuButton);
    expect(screen.getByText("תזמון הפעלה (שניות)")).toBeInTheDocument();
    expect(screen.getByText("Smoothies")).toBeInTheDocument();
  });

  it("changes the slide timer when input is changed", () => {
    const menuButton = screen.getByText("☰");
    fireEvent.click(menuButton);
    const timerInput = screen.getByRole("spinbutton");
    fireEvent.change(timerInput, { target: { value: "5" } });
    expect(timerInput).toHaveValue(5);
  });

  it("toggles item selection when checkbox is clicked", () => {
    const menuButton = screen.getByText("☰");
    fireEvent.click(menuButton);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked();
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).not.toBeChecked();
  });

  // it("opens the dialog when an image is clicked", async () => {
  //   const images = screen.getAllByRole("img");
  //   const menuItemImage = images.find(img => img.getAttribute('alt') === 'Go Macy');
  //   expect(menuItemImage).toBeTruthy();
  //   if (menuItemImage) {
  //     await act(async () => {
  //       fireEvent.click(menuItemImage);
  //     });
  //     expect(screen.getByRole("dialog")).toBeInTheDocument();
  //   }
  // });
});