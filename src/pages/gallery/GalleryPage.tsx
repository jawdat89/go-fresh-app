// src/pages/gallery/GalleryPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import SidePanel from "@/components/SidePanel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchMenuItemsAsync, selectMenuItems, selectMenuItemsStatus } from "@/app/redux/features/menuItems/menuItemsSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import Dialog from "@/components/Dialog";
import clsx from "clsx";
import {
  isMobile,
  isTablet,
  useMobileOrientation,
} from "react-device-detect";

const GalleryPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const menuItems = useSelector(selectMenuItems);
  const status = useSelector(selectMenuItemsStatus);
  const categories = useSelector((state: RootState) => state.menuItems.categories);

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [slideTimer, setSlideTimer] = useState<number>(10000);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentSlideMenuItem, setCurrentSlideMenuItem] = useState<MenuItem | undefined>();
  const [isTabletLandscape, setIsTabletLandscape] = useState<boolean>(false);

  const { isLandscape } = useMobileOrientation();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMenuItemsAsync());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const initialSelections: Record<string, boolean> = {};
    if (menuItems) {
      menuItems.forEach((item) => {
        initialSelections[item._id] = true;
      });
    }
    setSelectedItems(initialSelections);
  }, [menuItems]);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletLandscape(isTablet && isLandscape);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it on mount to set the initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLandscape]);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const selectedMenuItems = useMemo(() => {
    return menuItems ? menuItems.filter(
      (item) =>
        selectedItems[item._id] &&
        (selectedCategory === "all" || item.category.name === selectedCategory)
    ) : [];
  }, [selectedItems, selectedCategory, menuItems]);

  const duplicatedMenuItems =
    selectedMenuItems.length < 3
      ? [...selectedMenuItems, ...selectedMenuItems]
      : selectedMenuItems;

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const DialogContent = () => (
    <img
      src={currentSlideMenuItem?.image}
      alt={currentSlideMenuItem?.name}
      className={clsx(
        "object-contain rounded-3xl drop-shadow-2xl border-2 border-secondary-darkest",
        {
          "w-[20vw]": !isTabletLandscape && window.innerWidth > window.innerHeight, // Wide-screen landscape
          "w-[50vw]": isTabletLandscape, // Tablet landscape
          "w-[80vw]": !isTabletLandscape && window.innerWidth <= window.innerHeight, // Portrait or narrow landscape
        }
      )}
    />
  );

  return (
    <>
      <div className="relative">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: slideTimer }}
          loop={duplicatedMenuItems.length >= 3}
          onSlideChange={(swiper) => setCurrentSlideMenuItem(selectedMenuItems[swiper.realIndex])}
          onChange={() => setCurrentSlideMenuItem(selectedMenuItems[0])}
          className="h-[85vh] md:h-[90vh]"
        >
          {duplicatedMenuItems.map((item, index) => (
            <SwiperSlide key={`${item._id}-${index}`}>
              <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={clsx("object-cover h-[70vh] md:h-[60vh] max-h-full w-full rounded-xl shadow-xl",
                      isMobile && !isLandscape && "h-[50vh] w-[70vw]", // Mobile
                    )}
                    onClick={() => setIsDialogOpen(true)}
                  />
                  <div className="flex flex-col mt-4 bg-primary-lighter dark:bg-primary-lightest p-10 rounded-xl">
                    <h3 className="text-xl 2xl:text-3xl font-semibold text-center text-primary-darkest">
                      {item.name}
                    </h3>
                    <p className="text-md 2xl:text-xl text-center text-gray-700 mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => setIsSidePanelOpen(true)}
          className="block fixed bottom-4 right-4 p-2 bg-primary text-white rounded-md shadow-lg hover:bg-primary-darker transition z-50"
        >
          &#9776;
        </button>
      </div>
      <SidePanel
          isOpen={isSidePanelOpen}
          onClose={() => setIsSidePanelOpen(false)}
          className="bg-neutral-100"
        >
          <div className="sticky z-10 ">
            <h2 className="text-lg text-primary-darker dark:text-primary-lighter mb-2">תזמון הפעלה (שניות)</h2>
            <input
              className="input border-2 p-1 w-full mb-4"
              type="number"
              value={slideTimer / 1000}
              onChange={(e) => setSlideTimer(parseInt(e.target.value) * 1000)}
            />

            <h2 className="text-lg text-primary-darker dark:text-primary-lighter mb-4">קטגוריות</h2>
            <select
              className="input border-2 p-1 w-full mb-4"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">כל הקטגוריות</option>
              {categories && categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <h2 className="text-lg text-primary-darker dark:text-primary-lighter mb-4">פריטים פעילים</h2>
          </div>
          <div className="overflow-auto h-[calc(100vh-300px)] p-4">
            {menuItems && menuItems
              .filter((item) => selectedCategory === "all" || item.category.name === selectedCategory)
              .map((item) => (
                <div key={item._id} className="flex items-center justify-between mb-4">
                  <input
                    type="checkbox"
                    checked={selectedItems[item._id] || false}
                    onChange={() => toggleItemSelection(item._id)}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>
                </div>
              ))}
          </div>
        </SidePanel>
      <Dialog
        open={isDialogOpen}
        allowClose={true}
        contents={<DialogContent />}
        dialogStateChange={(open) => setIsDialogOpen(open)}
      />
    </>
  );
};

export default GalleryPage;
