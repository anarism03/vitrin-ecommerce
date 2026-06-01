import type { ContactItem } from "./about.types";

export const ABOUT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85";

export const ABOUT_FOCUS_ITEMS = [
  "Məhsullara kateqoriya ilə baxış",
  "Qiymət və təsvir məlumatı",
  "Telefon və email ilə əlaqə",
];

export const ABOUT_CONTACT_ITEMS: ContactItem[] = [
  {
    href: "tel:+994504496536",
    label: "+994 (50) 449 65 36",
    type: "phone",
  },
  {
    href: "mailto:ismayilzadeanar310@gmail.com",
    label: "Email",
    type: "email",
  },
];
