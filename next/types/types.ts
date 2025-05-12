import { ParagraphStoryProps } from "./components/dynamic-zone";

export interface Category {
  name: string;
}

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
  categories: Category[];
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
  industries?: Industry[];
  projects?: Project[];
}

export interface Industry {
  name: string;
  slug: string;
  companies?: Company[];
}

export interface Project {
  companies: Company[];
  story: ParagraphStoryProps[];
  slug: string;
  name: string;
  description: string;
  thumbnail: Image;
  services?: Service[];
  testimonials?: Testimonial[];
  completion_date?: string;
}

export interface Service {
  name: string;
  slug: string;
  description: string;
  projects?: Project[];
}

export interface Testimonial {
  representative_name: string;
  representative_role: string;
  remarks: string;
  project?: Project;
}

export interface Leads {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  inquiry_type: string;
  service_interest: string;
  estimated_budget: string;
  message: string;
  received_on?: string;
  notes?: string;
}
