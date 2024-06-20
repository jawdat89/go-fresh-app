// src/sanity/sanityClient.ts
import { createClient } from "@sanity/client";

// Dynamically select the API token based on the environment
const getApiToken = () => {
  switch (import.meta.env.MODE) {
    case "production":
      return import.meta.env.VITE_VERCEL_SANITY_TOKEN;
    case "development":
      return import.meta.env.VITE_SANITY_TOKEN;
    default:
      return import.meta.env.VITE_SANITY_TOKEN;
  }
};

const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true, // `false` if you want fresh data
  apiVersion: "2024-04-09", // use a specific API version
  token: getApiToken(), // Use the function to get the token based on environment
};

export const sanityClient = createClient(config);
