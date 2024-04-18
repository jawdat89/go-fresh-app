import { PiBowlFoodFill } from "react-icons/pi";

interface MenuItemProps {
  item: MenuItem;
}

const MenuItemsComponent = ({ item }: MenuItemProps) => {
  return (
    <div
      key={item._id}
      className="border p-4 my-4 rounded-2xl shadow-lg bg-primary-lightest hover:scale-105 duration-200
        max-w-md md:max-w-sm mx-auto transition-all transform hover:shadow-xl hover:border-primary-darker min-w-[350px]
      "
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[525px] object-scale-down rounded-xl shadow-lg shadow-accent-300"
      />
      <div className="mt-4">
        <h3 className="text-3xl font-semibold text-center text-secondary-darkest">
          {item.name}
        </h3>
        <p className="text-md">{item.description}</p>
        <h4 className="text-lg font-semibold mt-2">רכיבים:</h4>
        <ul className="list-none list-inside">
          {item.recipes.map((recipe) => (
            <li className="flex" key={recipe}>
              <PiBowlFoodFill
                fill="var(--primary-darker)"
                size={18}
                className="mt-1"
              />{" "}
              <span className="mr-1 text-md">{recipe}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuItemsComponent;
