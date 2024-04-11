import React, { useState, useEffect, useMemo } from "react";

import clsx from "clsx";

import LoadingSpinner from "@/components/LoadingSpinner";
import MenuItemsComponent from "@/components/MenuItemComponent";

import fetchMenuItems from "@/sanity/fetchMenuItems";

const MenuItemsPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate data fetching with a delay
    // setTimeout(() => {
    //   // This is where you'd fetch your data. Using mock data for now
    //   setMenuItems(mockMenuItems);
    //   setActiveCategory(mockMenuItems[0]?.category || "");
    //   setIsLoading(false); // Hide loading spinner and show menu items
    // }, 2000); // 2 seconds delay to simulate fetching
    setIsLoading(true);
    fetchMenuItems()
      .then((res) => {
        setMenuItems(res);
        setActiveCategory(res[0]?.category.name || "");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch menu items:", error);
        setIsLoading(false);
      });
  }, []);

  const activeMenuItems = useMemo(() => {
    return menuItems.filter((item) => item.category.name === activeCategory);
  }, [activeCategory, menuItems]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Extract unique categories from menuItems for tabs
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category.name))
  );

  const handleActiveCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.textContent || "";
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/4 md:bg-stone-200 md:dark:bg-stone-800 md:bg-opacity-50">
        <nav className="flex flex-col sticky top-0 md:min-h-[91.5vh]">
          {categories.map((category) => (
            <button
              key={category} // Ensure 'category' is unique across all categories
              className={clsx(
                "p-2",
                { "bg-accent-400 text-white": activeCategory === category },
                {
                  "text-accent-400 hover:bg-secondary-lighter hover:text-white bg-stone-200 dark:bg-stone-700 bg-opacity-50 dark:text-stone-6":
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
