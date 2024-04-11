import { sanityClient } from "./sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

const urlFor = (source: SanityImageAsset): string => {
  return builder.image(source).url(); // Ensure this returns a string URL
};

export default urlFor;
