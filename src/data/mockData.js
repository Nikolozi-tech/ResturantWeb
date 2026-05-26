export const categories = ["Appetizers", "Mains", "Desserts", "Drinks"];

export const menuItems = [
  {
    id: "pkhali-trio",
    category: "Appetizers",
    name: { en: "Pkhali Trio", ge: "ფხალის ტრიო" },
    description: {
      en: "Spinach, beetroot, and walnut spreads with pomegranate and mchadi.",
      ge: "ისპანახის, ჭარხლისა და ნიგვზის ფხალი ბროწეულით და მჭადით.",
    },
    price: 18,
    imageTone: "from-emerald-800 via-lime-700 to-amber-500",
    inStock: true,
  },
  {
    id: "badrijani",
    category: "Appetizers",
    name: { en: "Badrijani Nigvzit", ge: "ბადრიჯანი ნიგვზით" },
    description: {
      en: "Silky eggplant rolls filled with spiced walnut paste.",
      ge: "ბადრიჯნის რულეტები სანელებლიანი ნიგვზის გულსართით.",
    },
    price: 16,
    imageTone: "from-violet-950 via-purple-800 to-amber-500",
    inStock: true,
  },
  {
    id: "khinkali",
    category: "Mains",
    name: { en: "Mountain Khinkali", ge: "მთის ხინკალი" },
    description: {
      en: "Hand-folded dumplings with beef, herbs, black pepper, and rich broth.",
      ge: "ხელით დაკეცილი ხინკალი საქონლის ხორცით, მწვანილებით და წვენით.",
    },
    price: 24,
    imageTone: "from-stone-800 via-zinc-600 to-amber-300",
    inStock: true,
  },
  {
    id: "acharuli-khachapuri",
    category: "Mains",
    name: { en: "Acharuli Khachapuri", ge: "აჭარული ხაჭაპური" },
    description: {
      en: "Boat-shaped cheese bread finished with egg yolk and mountain butter.",
      ge: "ნავის ფორმის ყველიანი პური კვერცხის გულით და კარაქით.",
    },
    price: 22,
    imageTone: "from-yellow-900 via-orange-600 to-yellow-300",
    inStock: true,
  },
  {
    id: "chakapuli",
    category: "Mains",
    name: { en: "Lamb Chakapuli", ge: "ჩაქაფული" },
    description: {
      en: "Slow-simmered lamb with tarragon, green plum, white wine, and herbs.",
      ge: "ცხვრის ხორცი ტარხუნით, ტყემლით, თეთრი ღვინით და მწვანილებით.",
    },
    price: 34,
    imageTone: "from-green-950 via-emerald-700 to-lime-400",
    inStock: false,
  },
  {
    id: "churchkhela-mousse",
    category: "Desserts",
    name: { en: "Churchkhela Mousse", ge: "ჩურჩხელის მუსი" },
    description: {
      en: "Walnut, grape must, and honey cream inspired by Georgia's classic sweet.",
      ge: "ნიგვზის, თათარისა და თაფლის კრემი ქართული ტკბილეულის მოტივით.",
    },
    price: 15,
    imageTone: "from-red-950 via-rose-700 to-amber-400",
    inStock: true,
  },
  {
    id: "matsoni-honey",
    category: "Desserts",
    name: { en: "Matsoni & Wild Honey", ge: "მაწონი და თაფლი" },
    description: {
      en: "Chilled Georgian yogurt with wildflower honey and toasted walnuts.",
      ge: "გაგრილებული მაწონი ველური თაფლით და მოხალული ნიგვზით.",
    },
    price: 13,
    imageTone: "from-sky-950 via-slate-600 to-yellow-200",
    inStock: true,
  },
  {
    id: "saperavi",
    category: "Drinks",
    name: { en: "Saperavi Reserve", ge: "საფერავი რეზერვი" },
    description: {
      en: "Bold Kakhetian red wine with dark cherry and clay qvevri notes.",
      ge: "კახური წითელი ღვინო მუქი ალუბლისა და ქვევრის ტონებით.",
    },
    price: 19,
    imageTone: "from-red-950 via-fuchsia-900 to-red-600",
    inStock: true,
  },
  {
    id: "tarragon-lemonade",
    category: "Drinks",
    name: { en: "Tarragon Lemonade", ge: "ტარხუნის ლიმონათი" },
    description: {
      en: "Sparkling house soda with fresh tarragon and lemon peel.",
      ge: "გაზიანი სასმელი ახალი ტარხუნით და ლიმონის ცედრით.",
    },
    price: 9,
    imageTone: "from-green-900 via-lime-600 to-yellow-300",
    inStock: true,
  },
];

export const initialBookings = [
  {
    id: "RSV-2091",
    name: "Nino Beridze",
    phone: "+995 555 14 22 88",
    guests: 4,
    date: "2026-05-26",
    time: "19:00",
    status: "Confirmed",
  },
  {
    id: "RSV-2092",
    name: "Giorgi Maisuradze",
    phone: "+995 577 90 10 20",
    guests: 2,
    date: "2026-05-26",
    time: "20:30",
    status: "Seated",
  },
  {
    id: "RSV-2093",
    name: "Mariam Chikovani",
    phone: "+995 599 71 33 41",
    guests: 6,
    date: "2026-05-27",
    time: "18:30",
    status: "Pending",
  },
];

export const bookedSlots = {
  "2026-05-26": ["18:00", "20:00"],
  "2026-05-27": ["19:30"],
  "2026-05-28": ["18:30", "21:00"],
};

export const timeSlots = [
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];
