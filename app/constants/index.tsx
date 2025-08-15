export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: "/assets/icons/home.svg",
  },
  {
    label: "Image Restore",
    route: "/transformations/add/restore",
    icon: "/assets/icons/image.svg",
  },
  {
    label: "Generative Fill",
    route: "/transformations/add/fill",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "Object Remove",
    route: "/transformations/add/remove",
    icon: "/assets/icons/scan.svg",
  },
  {
    label: "Object Recolor",
    route: "/transformations/add/recolor",
    icon: "/assets/icons/filter.svg",
  },
  {
    label: "Background Remove",
    route: "/transformations/add/removeBackground",
    icon: "/assets/icons/camera.svg",
  },
  {
<<<<<<< HEAD
    label: "Blur Effect",
    route: "/transformations/add/blur",
    icon: "/assets/icons/filter.svg",
  },
  {
    label: "Sharpen",
    route: "/transformations/add/sharpen",
    icon: "/assets/icons/image.svg",
  },
  {
    label: "Grayscale",
    route: "/transformations/add/grayscale",
    icon: "/assets/icons/filter.svg",
  },
  {
    label: "Cartoonify",
    route: "/transformations/add/cartoonify",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "Auto Improve",
    route: "/transformations/add/improve",
    icon: "/assets/icons/stars.svg",
  },
  {
=======
    label: "Rotate Image",
    route: "/transformations/add/rotate",
    icon: "/assets/icons/image.svg",
  },
  {
    label: "Enhance Image",
    route: "/transformations/add/enhance",
    icon: "/assets/icons/filter.svg",
  },
  {
>>>>>>> a88a43e (Rotate, Enhance, Search)
    label: "Profile",
    route: "/profile",
    icon: "/assets/icons/profile.svg",
  },
  {
    label: "Buy Credits",
    route: "/credits",
    icon: "/assets/icons/bag.svg",
  },
];

export const plans = [
  {
    _id: 1,
    name: "Basic",
    icon: "/assets/icons/free-plan.svg",
    price: 10,
    credits: 50,
  },
  {
    _id: 2,
    name: "Pro Package",
    icon: "/assets/icons/free-plan.svg",
    price: 40,
    credits: 120,
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/assets/icons/free-plan.svg",
    price: 80,
    credits: 500,
  },
];

export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restore Image",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: "image.svg",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Background Remove",
    subTitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
    icon: "camera.svg",
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: "stars.svg",
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: "scan.svg",
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "filter.svg",
  },
<<<<<<< HEAD
  blur: {
    type: "blur",
    title: "Blur Effect",
    subTitle: "Apply blur effects to your images",
    config: { blur: 300 },
    icon: "filter.svg",
  },
  sharpen: {
    type: "sharpen",
    title: "Sharpen Image",
    subTitle: "Enhance image sharpness and clarity",
    config: { sharpen: true },
    icon: "image.svg",
  },
  grayscale: {
    type: "grayscale",
    title: "Grayscale",
    subTitle: "Convert images to black and white",
    config: { grayscale: true },
    icon: "filter.svg",
  },
  sepia: {
    type: "sepia",
    title: "Sepia Effect",
    subTitle: "Apply vintage sepia tone to images",
    config: { sepia: true },
    icon: "filter.svg",
  },
  pixelate: {
    type: "pixelate",
    title: "Pixelate",
    subTitle: "Create pixelated effect on images",
    config: { pixelate: true },
    icon: "scan.svg",
  },
  cartoonify: {
    type: "cartoonify",
    title: "Cartoonify",
    subTitle: "Transform photos into cartoon-style images",
    config: { cartoonify: true },
    icon: "stars.svg",
  },
  oilPaint: {
    type: "oilPaint",
    title: "Oil Paint",
    subTitle: "Apply oil painting artistic effect",
    config: { oilPaint: true },
    icon: "filter.svg",
  },
  vignette: {
    type: "vignette",
    title: "Vignette",
    subTitle: "Add vignette effect to focus attention",
    config: { vignette: true },
    icon: "camera.svg",
  },
  colorize: {
    type: "colorize",
    title: "Colorize",
    subTitle: "Add color tints to your images",
    config: { colorize: { level: 50, color: "blue" } },
    icon: "filter.svg",
  },
  improve: {
    type: "improve",
    title: "Auto Improve",
    subTitle: "Automatically enhance image quality",
    config: { improve: true },
    icon: "stars.svg",
=======
  rotate: {
    type: "rotate",
    title: "Rotate",
    subTitle: "Rotate an image",
    config: { angle: 90 },
    icon: "scan.svg",
  },
  enhance: {
    type: "enhance",
    title: "Enhance Image",
    subTitle: "Improve an image",
    config: { enhance: true },
    icon: "scan.svg",
>>>>>>> a88a43e (Rotate, Enhance, Search)
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

export const creditFee = -1;
