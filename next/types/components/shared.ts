import { Image } from "@/types/types";
import { InputProps } from "./input";

export interface ButtonProps {
  text?: string;
  URL?: string;
  variant: "simple" | "primary" | "outline" | "muted";
}

export interface ParagraphProps {
  title?: string;
  text?: string;
}

export interface ImageParagraphProps {
  paragraphs: ParagraphProps[] | React.ReactNode;
  images: Image[];
  direction: "img-on-left" | "img-on-right" | "img-on-top" | "img-on-bottom";
  CTAs: ButtonProps[];
}

export interface FormProps {
  inputs: InputProps[];
}