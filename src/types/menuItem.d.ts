type SanityReference = {
  _ref: string;
  _type: string;
};

type RawMenuItem = {
  _id: string;
  name: string;
  description: string;
  recipes: string[];
  imageUrl: string;
  category: string;
  likes: number;
};

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  recipes: string[];
  image: string;
  category: {
    name: string;
  };
  likes: number;
};

type SanityImageAsset = {
  _ref: string;
  _type: string;
};

type RootState = ReturnType<typeof store.getState>;
