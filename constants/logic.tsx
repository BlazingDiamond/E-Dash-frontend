import { useState } from "react";

export function useSelectedId() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Export both items inside an object
  return { selectedId, setSelectedId };
}

// NOTE: if you're navigating with Expo Router (recommended), you don't
// actually need this hook to carry the id across screens — pass it as a
// route param instead, e.g. router.push(`/restaurant/${id}`) and read it
// on the other side with useLocalSearchParams(). This hook only shares
// state within a single component tree unless it's lifted into a Context.

export type FoodItem = {
  id: string;
  restaurantId: string; // <-- links this item to restaurant.id
  name: string;
  category: string;
  categorylabel: string;
  price: number;
  description: string;
  img: string;
  imgalt: string;
  badge?: string;
  soldout: boolean;
};

export type Restaurant = {
  id: string;
  name: string;
  img: string;
  description: string;
  distance: string;
  reviews: string;
};

export const restaurant: Restaurant[] = [
  {
    id: "1",
    name: "Smitswinkel",
    img: "@/assets/images/Frame 76.png",
    description: "good food and all that, will fill in later",
    distance: "once we have the google map keys this will be replaced",
    reviews: "4 stars trust",
  },
  {
    id: "2",
    name: "Karoo pot",
    img: "@/assets/images/Frame 76.png",
    description: "good food and all that, will fill in later",
    distance: "once we have the google map keys this will be replaced",
    reviews: "4 stars trust",
  },
];

export const food: FoodItem[] = [
  {
    id: "cheese",
    restaurantId: "2", // karoopot -> Karoo pot
    name: "fancy Cheese",
    category: "starters",
    categorylabel: "Starters",
    price: 100,
    description: "work on a description later",
    img: "@/assets/images/react-logo.png",
    imgalt: "cheeeezy",
    badge: "sold out",
    soldout: true,
  },
  {
    id: "beefstirfry",
    restaurantId: "2",
    name: "Beef Stir Fry",
    category: "bestsellers", // was "best seller" — normalized
    categorylabel: "Best sellers",
    price: 100,
    description: "work on a description later",
    img: "@/assets/images/react-logo.png",
    imgalt: "beefy",
    badge: "sold out",
    soldout: true,
  },
  {
    id: "porkribs-bestseller", // was duplicate "porkribs"
    restaurantId: "2",
    name: "Pork Ribs",
    category: "bestsellers",
    categorylabel: "Best sellers",
    price: 185,
    description: "work on a description later",
    img: "@/assets/images/react-logo.png",
    imgalt: "porky",
    badge: "sold out",
    soldout: true,
  },
  {
    id: "grilledchicken",
    restaurantId: "2",
    name: "Grilled Chicken",
    category: "bestsellers",
    categorylabel: "Best sellers",
    price: 100,
    description: "work on a description later",
    img: "@/assets/images/react-logo.png",
    imgalt: "chickchick",
    badge: "sold out",
    soldout: true,
  },
  {
    id: "mushroomnuggets",
    restaurantId: "2",
    name: "Mushroom Nuggets",
    category: "starters",
    categorylabel: "Starters",
    price: 100,
    description: "work on a description later",
    img: "@/assets/images/react-logo.png",
    imgalt: "not nugget",
    badge: "sold out",
    soldout: true,
  },
  {
    id: "porkribs-coals", // was duplicate "porkribs"
    restaurantId: "2",
    name: "Pork Ribs",
    category: "fromthecoals",
    categorylabel: "From the coals",
    price: 100,
    description: "work on a description later",
    img: "@/assets/images/react-logo.png",
    imgalt: "porky",
    badge: "sold out",
    soldout: true,
  },
  {
    id: "porkribs-sea", // was duplicate "porkribs"
    restaurantId: "2",
    name: "Pork Ribs",
    category: "fromthesea",
    categorylabel: "From the sea",
    price: 100,
    description: "work on a description later",
    img: "@/assets/images/react-logo.png",
    imgalt: "porky",
    badge: "sold out",
    soldout: true,
  },
  // Smitswinkel (id: "1") has no menu items yet — add some with
  // restaurantId: "1" whenever that menu is ready.
];
