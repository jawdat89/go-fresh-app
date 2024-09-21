// src/pages/home/HomePage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomePage from "./HomePage";

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("HomePage", () => {
  it("renders the HeroSection with the correct text", () => {
    render(<HomePage />);
    expect(screen.getByText("אמץ את האותנטיות שלך")).toBeInTheDocument();
    expect(screen.getByText(/גלה את הטעם הטבעי של רעננות/i)).toBeInTheDocument();
  });

  it("renders the ModernContentSection with the correct items", () => {
    render(<HomePage />);
    expect(screen.getByText(/מקור האנרגיה הטבעי שלך/i)).toBeInTheDocument();
    expect(screen.getByText(/פתוח כל ימי השבוע/i)).toBeInTheDocument();
    expect(screen.getByText(/להזמנות ובירורים/i)).toBeInTheDocument();
  });

  it("renders the SocialMediaLinks with icons", () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /tiktok/i })).toBeInTheDocument();
  });

  it("renders the ContactInfo section with Google Maps link", () => {
    render(<HomePage />);
    expect(screen.getByText(/מצא אותנו במפות Google/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /place/i })).toBeInTheDocument();
  });

  it("navigates to the menu page when the menu button is clicked", () => {
    render(<HomePage />);

    const menuButton = screen.getByText(/לתפריט/i);
    fireEvent.click(menuButton);

    expect(mockNavigate).toHaveBeenCalledWith('/menu');
  });

  it("navigates to the gallery page when the gallery button is clicked", () => {
    render(<HomePage />);

    const galleryButton = screen.getByText(/הצג את הגלריה/i);
    fireEvent.click(galleryButton);

    expect(mockNavigate).toHaveBeenCalledWith('/gallery');
  });
});