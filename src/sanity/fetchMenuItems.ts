import { sanityClient } from "./sanityClient";

// Function to fetch menu items from the backend
export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const query = `
    *[_type == "menuItem"]{
      _id,
      name,
      description,
      recipes,
      "imageUrl": image.asset->url,
      "category": category->name,
      likes
    }
  `;
  try {
    const rawItems: RawMenuItem[] = await sanityClient.fetch(query);
    return rawItems.map((item) => ({
      _id: item._id,
      name: item.name,
      description: item.description,
      recipes: item.recipes,
      image: item.imageUrl,
      category: {
        name: item.category,
      },
      likes: item.likes || 0, // Default to 0 if likes are undefined
    }));
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw new Error("Failed to fetch menu items");
  }
};

export const updateLikes = async (itemId: string): Promise<void> => {
  const transaction = sanityClient
    .transaction()
    .patch(itemId, {
      // Use Sanity's increment function to safely increment the likes count
      inc: { likes: 1 },
    })
    .commit();

  try {
    await transaction;
  } catch (error) {
    console.error("Error incrementing likes:", error);
    throw new Error("Failed to increment likes");
  }
};
