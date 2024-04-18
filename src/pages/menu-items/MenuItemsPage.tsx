import React, { useState, useEffect, useMemo } from "react";

import clsx from "clsx";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  fetchMenuItemsAsync,
  selectMenuItems,
  selectMenuItemsStatus,
} from "@/redux/features/menuItems/menuItemsSlice";

import LoadingSpinner from "@/components/LoadingSpinner";
import MenuItemsComponent from "@/components/MenuItemComponent";

const MenuItemsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const menuItems = useSelector(selectMenuItems);
  const status = useSelector(selectMenuItemsStatus);

  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMenuItemsAsync());
    }
    // This check ensures that activeCategory is set only once when the menu items are loaded and not on subsequent re-renders.
    else if (
      status === "succeeded" &&
      activeCategory === "" &&
      menuItems.length > 0
    ) {
      setActiveCategory(menuItems[0].category.name);
    }
  }, [status, dispatch, menuItems, activeCategory]);

  const activeMenuItems = useMemo(() => {
    return menuItems.filter((item) => item.category.name === activeCategory);
  }, [activeCategory, menuItems]);

  if (status === "loading") {
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
        <nav className="flex flex-col sticky top-0 md:min-h-[94.2vh]">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-6 md:gap-4 p-4">
          {activeMenuItems.map((item) => (
            <MenuItemsComponent key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItemsPage;
