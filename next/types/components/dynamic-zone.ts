import { ImageProps } from "../types";
import { ImageParagraphProps } from "./shared";

export interface ParagraphStoryProps {
    title?: string;
    subtitle?: string;
    sections: ImageParagraphProps[];
    badges: ImageProps[];
}
