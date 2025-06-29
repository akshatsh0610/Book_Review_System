export interface Book {
    id: number;
    title: string;
    author: string;
}

export interface Review {
    id: number;
    bookId: number;
    content: string;
}

export const books: Book[] = [];
export const reviews: Review[] = [];
