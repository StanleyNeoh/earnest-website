import React from "react";
import { Image } from "../types";
import { ButtonProps, ParagraphProps } from "./shared";

export interface ImageParagraphProps {
  paragraphs: ParagraphProps[] | React.ReactNode;
  images: Image[];
  direction: "img-on-left" | "img-on-right" | "img-on-top" | "img-on-bottom";
  display: "tile" | "carousel";
  CTAs: ButtonProps[];
}

export interface ParagraphStoryProps {
    title?: string;
    subtitle?: string;
    sections: ImageParagraphProps[];
    badges: Image[];
}

export interface ParagraphStoryProps {
    title?: string;
    subtitle?: string;
    sections: ImageParagraphProps[];
    badges: Image[];
}

export type RichTextNode = {
  type: string;
  children?: RichTextNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  level?: number;
  format?: "ordered" | "unordered";
  indentLevel?: number;
  language?: string;
  // For image nodes
  image?: {
    name?: string;
    alternativeText?: string;
    url: string;
    caption?: string | null;
    width?: number;
    height?: number;
    formats?: {
      thumbnail?: { url: string; width?: number; height?: number; };
      medium?: { url: string; width?: number; height?: number; };
      small?: { url: string; width?: number; height?: number; };
      large?: { url: string; width?: number; height?: number; };
    };
    [key: string]: any;
  };
  url?: string; // for link nodes
};


