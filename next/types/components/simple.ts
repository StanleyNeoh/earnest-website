import React from "react";
import { Image } from "../types";
import { ButtonProps, ImageParagraphProps } from "./shared";

export interface ImageParagraphProps {
  paragraphs: React.ReactNode;
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
}export interface ParagraphStoryProps {
    title?: string;
    subtitle?: string;
    sections: ImageParagraphProps[];
    badges: Image[];
}

