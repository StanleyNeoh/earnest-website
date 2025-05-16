import { ButtonProps } from "./components/shared";
import { RichTextNode } from "./components/simple";

export interface Article {
  title: string;
  description: string;
  slug: string;
  content: string;
  dynamic_zone: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  image: Image;
  categories: {
    name: string;
  }[];
}

export interface Seo {
  metaTitle: string;
  metaDescription: string;
  metaImage: Image;
  keywords: string;
  metaRobots: string;
  structuredData: string;
  metaViewport: string;
  canonicalURL: string;
}

export interface Image {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface Company {
  name: string;
  slug: string;
  logo: Image;
  selected: boolean;
  projects?: Project[];
  testimonials?: Testimonial[];
}

export interface Project {
  companies: Company[];
  slug: string;
  name: string;
  thumbnail: Image;
  seo?: Seo;
  category: string;
  testimonials?: Testimonial[];
  completion_date?: string;
  description: RichTextNode[];
  featured?: {
    title: string;
    badge: Image;
    images: Image[];
    description: RichTextNode[];
    CTAs: ButtonProps[];
  }
  images: Image[];
}

export interface Testimonial {
  representative_name: string;
  representative_role: string;
  remarks: string;
  seo?: Seo;
  featured: boolean;
  slug: string;
  company?: Company;
  project?: Project;
}
