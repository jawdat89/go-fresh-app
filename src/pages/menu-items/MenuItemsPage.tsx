// src/pages/menu-items/MenuItemsPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import {
  fetchMenuItemsAsync,
  selectMenuItems,
  selectMenuItemsStatus,
} from "@/app/redux/features/menuItems/menuItemsSlice";
import { clearPersistedState } from "@/app/redux/features/general/generalSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import MenuItemsComponent from "@/components/MenuItemComponent";
import useIsToday from "@/app/hooks/useIsToday";
import {
  isTablet,
  useMobileOrientation,
} from "react-device-detect";

const MenuItemsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const menuItems = useSelector(selectMenuItems);
  const status = useSelector(selectMenuItemsStatus);
  const lastFetched = useSelector(
    (state: RootState) => state.menuItems.lastFetched
  );

  const isToday = useIsToday(lastFetched);

  const [activeCategory, setActiveCategory] = useState<string>("");

  const { isLandscape } = useMobileOrientation();

  useEffect(() => {
    if (!isToday) {
      // If it's not today, clear the persisted state and fetch fresh data
      clearPersistedState().then(() => {
        dispatch(fetchMenuItemsAsync());
      });
    }
  }, [isToday, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMenuItemsAsync());
    }
    // Initialize the activeCategory once the items are loaded
    else if (
      status === "succeeded" &&
      activeCategory === "" &&
      menuItems.length > 0
    ) {
      setActiveCategory(menuItems[0].category.name);
    }
  }, [status, dispatch, menuItems, activeCategory]);

  // Compute the sorted categories
  const categoryLikes = useMemo(() => {
    return menuItems.reduce<CategoryTotals>((acc, item) => {
      const category = item.category.name;
      acc[category] = (acc[category] || 0) + item.likes;
      return acc;
    }, {});
  }, [menuItems]);

  const categories = useMemo(() => {
    return Object.keys(categoryLikes).sort(
      (a, b) => categoryLikes[b] - categoryLikes[a]
    );
  }, [categoryLikes]);

  useEffect(() => {
    if (categories.length > 0 && activeCategory === "") {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  // Filter and sort menu items by the active category
  const activeMenuItems = useMemo(() => {
    return menuItems
      .filter((item) => item.category.name === activeCategory)
      .sort((a, b) => b.likes - a.likes);
  }, [activeCategory, menuItems]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

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
              key={category}
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
        <div className={clsx(
          "grid grid-cols-1  gap-6 md:gap-4 p-4",
          isTablet && !isLandscape && "grid-cols-2",
          isTablet && isLandscape && "grid-cols-3",
          !isTablet && "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        )}>
          {activeMenuItems.map((item) => (
            <MenuItemsComponent key={`${item._id}-menu-item`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItemsPage;

interface CategoryTotals {
  [categoryName: string]: number;
}
