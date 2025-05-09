import { Image } from "@/types/types";

export interface ParagraphProps {
    title?: string;
    text?: string;
}

export interface ButtonProps {
    text?: string;
    URL?: string;
    target?: string;
    variant: "simple" | "primary" | "outline" | "muted";
}

export interface FeaturedProjectProps {
    title?: string;
    logo?: Image;
    paragraphs: ParagraphProps[];
    CTAs: ButtonProps[];
    images: Image[];
}