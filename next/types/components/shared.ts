import { Image } from "@/types/types";

export interface ButtonProps {
    text?: string;
    URL?: string;
    target?: string;
    variant: "simple" | "primary" | "outline" | "muted";
}

export interface ParagraphProps {
    title?: string;
    text?: string;
}

export interface ImageParagraphProps {
    paragraphs: ParagraphProps[];
    images: Image[];
    direction: "img-on-left" | "img-on-right" | "img-on-top" | "img-on-bottom";
    display: "tile" | "carousel";
    CTAs: ButtonProps[];
}


