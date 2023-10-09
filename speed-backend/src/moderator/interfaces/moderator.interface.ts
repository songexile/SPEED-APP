export interface Moderator extends Document {
    title: string;
    authors: string;
    journal: string;
    year: string;
    volume?: string;
    pages?: string;
    doi: string;
}