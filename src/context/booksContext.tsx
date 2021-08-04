import React, { createContext, useContext, useEffect, useState } from 'react';

import { getVolumes } from '../services/getVolumes';

import { UsefulBooks } from '../libs/books';

type BooksContextData = {
  books?: UsefulBooks[];
  pages?: number[];
  favorites: string[];
  favoritesItems: UsefulBooks[];
  favoriteSelected: boolean;
  pageIndex: number;
  handleTermsChange: (value: string) => void;
  handleFavorites: (item: UsefulBooks) => void;
  handlePageIndexChange: (plus: boolean) => void;
  toggleFavoriteSelected: () => void;
}

export const BooksContext = createContext({} as BooksContextData);

type BooksContextProviderProps = {
  children: React.ReactNode;
}

export function BooksContextProvider({ children }: BooksContextProviderProps) {
  const [terms, setTerms] = useState<string>();
  const [books, setBooks] = useState<UsefulBooks[]>();
  
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesItems, setFavoritesItems] = useState<UsefulBooks[]>([]);
  const [favoriteSelected, setFavoriteSelected] = useState(false);

  const [pages, setPages] = useState<number[]>();
  const [pageIndex, setPageIndex] = useState(0);
  
  const [reload, setReload] = useState(false);
  
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
          subtitle: book.volumeInfo?.subtitle,
          authors: book.volumeInfo.authors?.join(', '),
          publisher: book.volumeInfo?.publisher,
          date: book.volumeInfo?.publishedDate,
          pages: book.volumeInfo?.pageCount,
          category: book.volumeInfo.categories?.join(', '),
          language: book.volumeInfo?.language,
          description: book.searchInfo?.textSnippet,
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

  function handleFavorites(item: UsefulBooks) {
    const aux = favorites
    const auxItems = favoritesItems
    const index = aux.indexOf(item.id)
    if (favorites.includes(item.id)) {
      aux.splice(index, 1)
      auxItems.splice(index, 1)
      setFavorites(aux)
      setFavoritesItems(auxItems)
    } else {
      aux.push(item.id)
      auxItems.push(item)
    }
    setFavorites(aux)
    setFavoritesItems(auxItems)
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

  function toggleFavoriteSelected() {
    setFavoriteSelected(!favoriteSelected)
  }

  return (
    <BooksContext.Provider value={{ 
      books,
      pages,
      favorites,
      favoritesItems,
      favoriteSelected,
      pageIndex,
      handleTermsChange,
      handleFavorites,
      handlePageIndexChange,
      toggleFavoriteSelected,
    }}>
      {children}
    </BooksContext.Provider>
  )
}

export const useBooksContext = () => {
  return useContext(BooksContext);
}