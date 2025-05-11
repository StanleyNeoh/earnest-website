import { ParagraphStoryProps } from "./components/dynamic-zone";

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