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
  image: Image;
}

export interface FormProps {
  inputs: InputProps[];
}