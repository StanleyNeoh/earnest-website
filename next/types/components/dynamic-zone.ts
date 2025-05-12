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
    form: FormProps;
    social_media_icon_links: {
        image: Image;
        link: {
            text: string;
            url: string;
            target: string;
        }
    }
    sections: ParagraphStoryProps[];
}