import { useBooksContext } from '../../context/booksContext';

import { Navbar } from '../../components/Navbar/navbar';
import { Table } from '../../components/Table/table';

import './home.css';

export function Home() {
  const { books } = useBooksContext();

  return (
    <div className="home-page">
      <div className="home-container">
        <Navbar />

        <div className="table-wrapper">
          <Table columnsToShow={['#', '', 'Título', 'Autor', 'Ano', 'Editora', 'Favorito']} 
            columns={['#', 'small_img', 'title', 'authors', 'date', 'publisher', 'favorite']} 
            items={books}
          />
        </div>
      </div>
    </div>
  )
}

// Filtrar livros favoritos
// Ver descrição do livro