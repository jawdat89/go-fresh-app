// src/pages/gallery/GalleryPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import SidePanel from "@/components/SidePanel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchMenuItemsAsync, selectMenuItems, selectMenuItemsStatus } from "@/redux/features/menuItems/menuItemsSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import Dialog from "@/components/Dialog";
import clsx from "clsx";
import {
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
    menuItems.forEach((item) => {
      initialSelections[item._id] = true;
    });
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
    return menuItems.filter(
      (item) =>
        selectedItems[item._id] &&
        (selectedCategory === "all" || item.category.name === selectedCategory)
    );
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
          className="h-[78vh] md:h-[83.5vh] 2xl:h-[84vh] border-b-2 border-neutral-400"
        >
          {duplicatedMenuItems.map((item, index) => (
            <SwiperSlide key={`${item._id}-${index}`}>
              <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain h-[300px] md:h-[250px] 2xl:h-fit max-h-96 w-full rounded-xl shadow-xl"
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
          className="block 2xl:fixed 2xl:bottom-4 mt-2 2xl:mt-0 mr-4 2xl:mr-0 right-4 p-2 bg-primary text-white rounded-md shadow-lg hover:bg-primary-darker transition"
        >
          &#9776;
        </button>

        <SidePanel
          isOpen={isSidePanelOpen}
          onClose={() => setIsSidePanelOpen(false)}
        >
          <h2 className="text-md 2xl:text-xl text-primary-darker">תזמון הפעלה (שניות)</h2>
          <input
            className="input border-2 p-2 w-full mt-2"
            type="number"
            value={slideTimer / 1000}
            onChange={(e) => setSlideTimer(parseInt(e.target.value) * 1000)}
          />

          <h2 className="text-xl text-primary-darker">קטגוריות</h2>
          <select
            className="input border-2 p-2 w-full mt-2"
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

          <h2 className="text-xl text-primary-darker">פריטים פעילים</h2>
          <div className="space-y-4 p-4">
            {menuItems
              .filter((item) => selectedCategory === "all" || item.category.name === selectedCategory)
              .map((item) => (
                <div key={item._id} className="grid grid-cols-2">
                  <input
                    type="checkbox"
                    checked={selectedItems[item._id] || false}
                    onChange={() => toggleItemSelection(item._id)}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                  <span className="text-gray-700 dark:text-gray-300 text-left">
                    {item.name}
                  </span>
                </div>
              ))}
          </div>
        </SidePanel>
      </div>
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
