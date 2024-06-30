// src/components/MenuItemComponent.tsx
import { useState } from "react";
import { PiBowlFoodFill } from "react-icons/pi";
import LikeIncremental from "./LikeIncremental";
import Dialog from "./Dialog";

interface MenuItemProps {
  item: MenuItem;
}

const MenuItemsComponent = ({ item }: MenuItemProps) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const ImageDialogContent = () => <img src={item.image} alt={item.name} className="w-[80vw] md:w-[50vw] 2xl:w-[20vw] object-contain rounded-3xl drop-shadow-2xl border-2 border-secondary-darkest" />;

  return (
    <>
    <div
      key={item._id}
      className="flex flex-col border p-4 my-4 rounded-2xl shadow-lg bg-white hover:scale-105 duration-200 max-w-md md:max-w-sm max-h-100 md:max-h-max mx-auto transition-all transform hover:shadow-xl hover:border-primary-darker"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[200px] md:h-[100px] 2xl:h-fit object-cover rounded-xl shadow-md"
        onClick={() => setIsDialogOpen(true)}
      />
      <div className="mt-4 flex-grow">
        <h3 className="text-xl 2xl:text-3xl font-semibold text-center text-primary-darkest">
          {item.name}
        </h3>
        <p className="text-md text-gray-700 mt-2">{item.description}</p>
        <h4 className="text-lg font-semibold mt-4 text-primary-darker">
          רכיבים:
        </h4>
        <ul className="list-none list-inside">
          {item.recipes.map((recipe) => (
            <li className="flex items-center mt-2" key={recipe}>
              <PiBowlFoodFill
                fill="var(--primary-darker)"
                size={18}
                className="mr-2"
              />
              <span className="text-md text-gray-600">{recipe}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center mt-4">
        {/* <span className="text-sm text-gray-500">
          {item.price ? `${item.price} ₪` : "Price not available"}
        </span> */}
        <LikeIncremental itemId={item._id} />
      </div>


    </div>
          <Dialog
          open={isDialogOpen}
          allowClose={true}
          contents={<ImageDialogContent/>}
          dialogStateChange={(open) => setIsDialogOpen(open)}
        />
        </>
  );
};

export default MenuItemsComponent;
