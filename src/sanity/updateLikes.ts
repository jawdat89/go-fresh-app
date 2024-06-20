// src/sanity/updateLikes.ts
export async function updateLikes(itemId: string): Promise<void> {
  const response = await fetch(import.meta.env.VITE_UPDATE_LIKES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-functions-key": import.meta.env.VITE_FUNCTION_APP_KEY,
    },
    body: JSON.stringify({ itemId }),
  });

  if (!response.ok) {
    throw new Error("Failed to increment likes");
  }
}
