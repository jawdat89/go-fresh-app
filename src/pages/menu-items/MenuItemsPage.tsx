import React, { useState, useEffect, useMemo } from "react";

import clsx from "clsx";

import LoadingSpinner from "@/components/LoadingSpinner";
import MenuItemsComponent from "@/components/MenuItemComponent";

import itemImage from "@/assets/item-1.jpg";

// Assuming MenuItem type is defined elsewhere and imported
const mockMenuItems: MenuItem[] = [
  {
    _id: "1",
    name: "Strawberry Shake",
    description: "A delicious strawberry shake made with fresh strawberries.",
    recipes: ["Fruit", "Dairy"],
    image: { url: itemImage },
    category: "Shakes",
  },
  {
    _id: "3",
    name: "Strawberry Shake2",
    description: "A delicious strawberry shake made with fresh strawberries.",
    recipes: ["Fruit", "Dairy"],
    image: { url: itemImage },
    category: "Shakes",
  },
  {
    _id: "4",
    name: "Strawberry Shake4",
    description: "A delicious strawberry shake made with fresh strawberries.",
    recipes: ["Fruit", "Dairy"],
    image: { url: itemImage },
    category: "Shakes",
  },
  {
    _id: "11",
    name: "Strawberry Shake",
    description: "A delicious strawberry shake made with fresh strawberries.",
    recipes: ["Fruit", "Dairy"],
    image: { url: itemImage },
    category: "Shakes",
  },
  {
    _id: "5",
    name: "Strawberry Shake2",
    description: "A delicious strawberry shake made with fresh strawberries.",
    recipes: ["Fruit", "Dairy"],
    image: { url: itemImage },
    category: "Shakes",
  },
  {
    _id: "6",
    name: "Strawberry Shake4",
    description: "A delicious strawberry shake made with fresh strawberries.",
    recipes: ["Fruit", "Dairy"],
    image: { url: itemImage },
    category: "Shakes",
  },
  {
    _id: "7",
    name: "Strawberry Shake",
    description: "A delicious strawberry shake made with fresh strawberries.",
    recipes: ["Fruit", "Dairy"],
    image: { url: itemImage },
    category: "Shakes",
  },
  {
    _id: "8",
    name: "Strawberry Shake2",
    description: "A delicious strawberry shake made with fresh strawberries.",
    recipes: ["Fruit", "Dairy"],
    image: { url: itemImage },
    category: "Shakes",
  },
  {
    _id: "9",
    name: "Strawberry Shake4",
    description: "A delicious strawberry shake made with fresh strawberries.",
    recipes: ["Fruit", "Dairy"],
    image: { url: itemImage },
    category: "Shakes",
  },
  {
    _id: "2",
    name: "Chocolate Ice Cream",
    description: "Rich and creamy chocolate ice cream.",
    recipes: ["Dairy", "Chocolate"],
    image: { url: itemImage },
    category: "Ice Cream",
  },
  // More items...
];

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  recipes: string[];
  image: { url: string };
  category: string;
};

const MenuItemsPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate data fetching with a delay
    setTimeout(() => {
      // This is where you'd fetch your data. Using mock data for now
      setMenuItems(mockMenuItems);
      setActiveCategory(mockMenuItems[0]?.category || "");
      setIsLoading(false); // Hide loading spinner and show menu items
    }, 2000); // 2 seconds delay to simulate fetching
  }, []);

  const activeMenuItems = useMemo(() => {
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Extract unique categories from menuItems for tabs
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category))
  );

  const handleActiveCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.textContent || "";
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/4">
        <nav className="flex flex-col sticky top-0 z-10">
          {categories.map((category) => (
            <button
              key={category}
              className={clsx(
                "p-2",
                { "bg-accent-400 text-white": activeCategory === category },
                {
                  "text-accent-400 hover:bg-secondary-lighter hover:text-white":
                    activeCategory !== category,
                }
              )}
              onClick={handleActiveCategory}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
      <div className="w-full md:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-4 p-4">
          {activeMenuItems.map((item) => (
            <MenuItemsComponent key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItemsPage;
