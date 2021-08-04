import React, { createContext, useContext, useState } from 'react';

type BooksContextData = {
  books?: any[];
}

export const BooksContext = createContext({} as BooksContextData);

type BooksContextProviderProps = {
  children: React.ReactNode;
}

export function BooksContextProvider({ children }: BooksContextProviderProps) {
  const [books, setBooks] = useState<any[]>();

  function fecthBooks() {
    setBooks([])
  }

  return (
    <BooksContext.Provider value={{ 
      books,
    }}>
      {children}
    </BooksContext.Provider>
  )
}

export const useBooksContext = () => {
  return useContext(BooksContext);
}