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
  _createdAt?: string;
  _updatedAt?: string;
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
  _createdAt?: string;
  _updatedAt?: string;
};

type SanityImageAsset = {
  _ref: string;
  _type: string;
};

type RootState = ReturnType<typeof store.getState>;
