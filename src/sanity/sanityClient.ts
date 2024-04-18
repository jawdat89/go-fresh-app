import { createClient } from "@sanity/client";

const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID!,
  dataset: import.meta.env.VITE_SANITY_DATASET!,
  useCdn: true, // `false` if you want fresh data
  apiVersion: "2024-04-09", // use a specific API version
  token: import.meta.env.VITE_SANITY_TOKEN!,
};

export const sanityClient = createClient(config);
