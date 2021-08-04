import React, { createContext, useContext, useEffect, useState } from 'react';

import { getVolumes } from '../services/getVolumes';

import { UsefulBooks } from '../libs/books';

type BooksContextData = {
  books?: UsefulBooks[];
  pages?: number[];
  favorites: string[];
  pageIndex: number;
  handleTermsChange: (value: string) => void;
  handleFavorites: (id: string) => void;
  handlePageIndexChange: (plus: boolean) => void;
}

export const BooksContext = createContext({} as BooksContextData);

type BooksContextProviderProps = {
  children: React.ReactNode;
}

export function BooksContextProvider({ children }: BooksContextProviderProps) {
  const [books, setBooks] = useState<UsefulBooks[]>();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [terms, setTerms] = useState<string>();
  const [reload, setReload] = useState(false);
  
  const [pages, setPages] = useState<number[]>();
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (terms) {
      fetchBooks(terms, pageIndex * 40);
    } else {
      setBooks([])
    }
  }, [terms, pageIndex])

  async function fetchBooks(terms: string, startIndex: number) {
    try {
      const books_response = await getVolumes(terms, startIndex);
      const books_aux = books_response.items.map(book => {
        return {
          id: book.id,
          img: book.volumeInfo.imageLinks?.thumbnail,
          small_img: book.volumeInfo.imageLinks?.smallThumbnail,
          title: book.volumeInfo?.title,
          authors: book.volumeInfo.authors?.join(', '),
          publisher: book.volumeInfo?.publisher,
          date: book.volumeInfo?.publishedDate,
          pages: book.volumeInfo?.pageCount,
        }
      })
      setBooks(books_aux)

      var aux_number_pages = Math.floor(books_response.totalItems / 40)
      if (books_response.totalItems % 40 > 0)
        aux_number_pages++

      const aux_pages = []
      for (var i = 0; i < aux_number_pages; i++) {
        aux_pages.push(i)
      }
      setPages(aux_pages)
    } catch (err) {
      console.log('Error fetching books')
    }
  }

  function handleTermsChange(value: string) {
    setTerms(value)
  }

  function handleFavorites(id: string) {
    const aux = favorites
    if (favorites.includes(id)) {
      aux.splice(aux.indexOf(id), 1)
    } else {
      aux.push(id)
    }
    setFavorites(aux)
    setReload(!reload)
  }

  function handlePageIndexChange(plus: boolean) {
    if (pages) {
      if (plus) {
        if (pageIndex < pages?.length - 1)
          setPageIndex(pageIndex + 1)
      } else {
        if (pageIndex > 0)
          setPageIndex(pageIndex - 1)
      }
    }
  }

  return (
    <BooksContext.Provider value={{ 
      books,
      pages,
      favorites,
      pageIndex,
      handleTermsChange,
      handleFavorites,
      handlePageIndexChange,
    }}>
      {children}
    </BooksContext.Provider>
  )
}

export const useBooksContext = () => {
  return useContext(BooksContext);
}