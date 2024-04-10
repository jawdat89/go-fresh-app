import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import MenuItemsPage from "@/pages/menu-items/MenuItemsPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";

import Navbar from "./components/Navbar";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuItemsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
