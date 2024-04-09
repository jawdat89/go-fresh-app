import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/home/Home";
import MenuItems from "@/pages/menu-items/MenuItems";
import NotFound from "@/pages/not-found/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuItems />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
