export interface InputProps {
    id: number;
    name: string;
    type: string;
    placeholder: string;
    display_name: string;
    options?: { id: number; name: string; value: string }[];
}