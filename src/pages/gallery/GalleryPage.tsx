// src/pages/gallery/GalleryPage.tsx
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import SidePanel from "@/components/SidePanel";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const GalleryPage: React.FC = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [slideTimer, setSlideTimer] = useState<number>(10000);

  const menuItems = useSelector((state: RootState) => state.menuItems.items);

  // Initialize selectedItems with all items set to true on page load
  useEffect(() => {
    const initialSelections: Record<string, boolean> = {};
    menuItems.forEach((item) => {
      initialSelections[item._id] = true;
    });
    setSelectedItems(initialSelections);
  }, [menuItems]);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  // Filter items based on selection
  const selectedMenuItems = menuItems.filter((item) => selectedItems[item._id]);

  // Duplicate slides if needed for loop mode
  const duplicatedMenuItems =
    selectedMenuItems.length < 3
      ? [...selectedMenuItems, ...selectedMenuItems]
      : selectedMenuItems;

  return (
    <div className="relative">
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: slideTimer }}
        loop={duplicatedMenuItems.length >= 3}
        className="h-[84vh] border-b-2 border-neutral-400"
      >
        {duplicatedMenuItems.map((item, index) => (
          <SwiperSlide key={`${item._id}-${index}`}>
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-contain h-full max-h-96 w-full rounded-xl shadow-xl"
                />
                <div className="flex flex-col mt-4 bg-primary-lighter dark:bg-primary-lightest p-10 rounded-xl">
                  <h3 className="text-3xl font-semibold text-center text-primary-darkest">
                    {item.name}
                  </h3>
                  <p className="text-xl text-center text-gray-700 mt-2">
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
        className="fixed bottom-4 right-4 p-2 bg-primary text-white rounded-md shadow-lg hover:bg-primary-darker transition"
      >
        &#9776;
      </button>

      <SidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
      >
        <h2 className="text-xl text-primary-darker">תזמון הפעלה (שניות)</h2>
        <input
          className="input border-2 p-2 w-full mt-2"
          type="number"
          value={slideTimer / 1000}
          onChange={(e) => setSlideTimer(parseInt(e.target.value) * 1000)}
        />
        <h2 className="text-xl text-primary-darker">פריטים פעילים</h2>
        <div className="space-y-4 p-4">
          {menuItems.map((item) => (
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
  );
};

export default GalleryPage;
