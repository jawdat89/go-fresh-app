// src/sanity/fetchMenuItems.ts
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
      likes,
      _createdAt,
      _updatedAt
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
      likes: item.likes || 0,
      _createdAt: item._createdAt,
      _updatedAt: item._updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw new Error("Failed to fetch menu items");
  }
};
