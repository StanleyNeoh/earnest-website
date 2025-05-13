import { ParagraphStoryProps } from "./components/dynamic-zone";

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
  projects?: Project[];
}

export interface Project {
  companies: Company[];
  story: ParagraphStoryProps[];
  slug: string;
  name: string;
  description: string;
  thumbnail: Image;
  category: string;
  testimonials?: Testimonial[];
  completion_date?: string;
}

export interface Testimonial {
  representative_name: string;
  representative_role: string;
  remarks: string;
  project?: Project;
}
