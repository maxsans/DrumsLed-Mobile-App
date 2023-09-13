export const STORAGEKEY = {
  THEME1: "theme1",
  THEME2: "theme2",
  THEME3: "theme3",
  THEME4: "theme4",
  THEME5: "theme5",
  THEME6: "theme6",
  LASTCONFIGUSER: "lastconfiguser",
};

export const COLOR = {
  BACKGROUND: "#F9F1FC",
  PRIMARY: "#E82BF8",
  ON_PRIMARY: "#F9F1FC",
  PRIMARY_VARIANT: "#FFBBFF",
  PRIMARY_VARIANT2: "#FFBBDD",
  SECONDARY: "#3A03AC",
  ON_SECONDARY: "#fb98ff",
  SECONDARY_VARIANT: "#6202D8",
  TERCIARY: "#FF6BA1",
  ON_TERCIARY: "#ff8eb7",
  TERCIARY_VARIANT: "#ff5190",
  BACKGROUND_LOAD: "#1d1d1d",
  ERROR: "#ff3333",
  ON_ERROR: "#FFCDD2",
  DISABLE: "#80808070",
  ON_DISABLE: "#80808090",
};

export const ANIMATIONS_LIST_DRUMS_ICON = [
  { value: 1, iconName: "lightbulb", iconTag: "FontAwesome5" },
  { value: 2, iconName: "speedometer-slow", iconTag: "MaterialCommunityIcons" },
  {
    value: 3,
    iconName: "speedometer-medium",
    iconTag: "MaterialCommunityIcons",
  },
  { value: 4, iconName: "speedometer", iconTag: "MaterialCommunityIcons" },
  { value: 5, iconName: "animation", iconTag: "MaterialIcons" },
  { value: 6, iconName: "spinner-3", iconTag: "EvilIcons" },
];

const ANIMATIONS_LIST_DRUMS = [
  { label: "Lumière", value: 1, maxColors: 1 },
  { label: "Lent", value: 2, maxColors: 1 },
  { label: "Normal", value: 3, maxColors: 1 },
  { label: "Rapide", value: 4, maxColors: 1 },
  { label: "Disco", value: 5, maxColors: 10 },
  { label: "Rotation", value: 6, maxColors: 4 },
];

export const MAX_THEMES = 20;

export const DEFAULT_JSON = [
  {
    name: "Caisse Claire",
    params: [
      {
        name: "Interieur",
        colors: ["#FFFFFF"],
        animations: ANIMATIONS_LIST_DRUMS,
        animation: 1,
      },
      {
        name: "Exterieur",
        colors: ["#FFFFFF"],
        animations: ANIMATIONS_LIST_DRUMS,
        animation: 1,
      },
    ],
  },
  {
    name: "Tom Aigu",
    params: [
      {
        name: "Interieur",
        colors: ["#FFFFFF"],
        animations: ANIMATIONS_LIST_DRUMS,
        animation: 1,
      },
      {
        name: "Exterieur",
        colors: ["#FFFFFF"],
        animations: ANIMATIONS_LIST_DRUMS,
        animation: 1,
      },
    ],
  },
  {
    name: "Tom Medium",
    params: [
      {
        name: "Interieur",
        colors: ["#FFFFFF"],
        animations: ANIMATIONS_LIST_DRUMS,
        animation: 1,
      },
      {
        name: "Exterieur",
        colors: ["#FFFFFF"],
        animations: ANIMATIONS_LIST_DRUMS,
        animation: 1,
      },
    ],
  },
  {
    name: "Tom Basse",
    params: [
      {
        name: "Interieur",
        colors: ["#FFFFFF"],
        animations: ANIMATIONS_LIST_DRUMS,
        animation: 1,
      },
      {
        name: "Exterieur",
        colors: ["#FFFFFF"],
        animations: ANIMATIONS_LIST_DRUMS,
        animation: 1,
      },
    ],
  },
  {
    name: "Grosse Caisse",
    params: [
      {
        name: "Interieur",
        colors: ["#FFFFFF"],
        animations: ANIMATIONS_LIST_DRUMS,
        animation: 1,
      },
    ],
  },
];
