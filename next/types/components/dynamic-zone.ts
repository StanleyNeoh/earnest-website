import { Image } from "../types";
import { FormProps, ImageParagraphProps } from "./shared";

export interface ParagraphStoryProps {
    title?: string;
    subtitle?: string;
    sections: ImageParagraphProps[];
    badges: Image[];
}

export interface FormNextToSectionProps {
    heading: string;
    sub_heading: string;
    sections: ParagraphStoryProps[];
}