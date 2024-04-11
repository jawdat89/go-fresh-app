import { sanityClient } from "./sanityClient";

const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const query = `
    *[_type == "menuItem"]{
      _id,
      name,
      description,
      recipes,
      "imageUrl": image.asset->url,
      "category": category->name
    }
  `;
  const result: RawMenuItem[] = await sanityClient.fetch(query);

  // Transform the raw data to fit the MenuItem interface
  const transformed: MenuItem[] = result.map((item) => ({
    _id: item._id,
    name: item.name,
    description: item.description,
    recipes: item.recipes,
    image: item.imageUrl,
    category: {
      name: item.category,
    },
  }));

  return transformed;
};

export default fetchMenuItems;
