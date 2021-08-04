export interface Volumes {
  items: Book[];
  kind: string;
  totalItems: number;
}

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    pageCount: number;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    },
    language: string;
  }
}