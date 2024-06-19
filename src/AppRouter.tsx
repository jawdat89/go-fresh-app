// src/AppRouter.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import MenuItemsPage from "@/pages/menu-items/MenuItemsPage";
import GalleryPage from "@/pages/gallery/GalleryPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";

import Navbar from "./components/Navbar";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuItemsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
