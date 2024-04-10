interface MenuItemProps {
  item: MenuItem;
}

const MenuItemsComponent = ({ item }: MenuItemProps) => {
  return (
    <div
      key={item._id}
      className="border p-4 rounded-2xl shadow-lg bg-primary-lightest hover:scale-105 duration-200
        max-w-md md:max-w-sm mx-auto transition-all transform hover:shadow-xl hover:border-primary-darker
      "
    >
      <img
        src={item.image.url}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="mt-2">
        <h3 className="text-2xl font-semibold text-center text-secondary-darkest">
          {item.name}
        </h3>
        <p className="text-sm">{item.description}</p>
        <h4 className="text-sm font-semibold mt-2">רכיבים:</h4>
        <ul className="list-disc list-inside">
          {item.recipes.map((recipe) => (
            <li key={recipe}>{recipe}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuItemsComponent;
