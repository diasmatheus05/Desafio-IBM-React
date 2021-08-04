import { useBooksContext } from '../../context/booksContext';

import { Navbar } from '../../components/Navbar/navbar';
import { Table } from '../../components/Table/table';

import no_books from '../../assets/books.png';

import './home.css';

export function Home() {
  const { books, favoritesItems, favoriteSelected } = useBooksContext();

  return (
    <div className="home-page">
      <div className="home-container">
        <Navbar />

        <div className="table-wrapper">
          <Table columnsToShow={['#', '', 'Título', 'Autor', 'Ano', 'Editora', 'Favorito']} 
            columns={['#', 'small_img', 'title', 'authors', 'date', 'publisher', 'favorite']} 
            items={favoriteSelected ? favoritesItems : books}
          />

          { !favoriteSelected && (!books || books.length === 0) && 
            <div className="no-books">
              <img src={no_books} alt="Sem resultados" />
              <p className="no-results">Não temos nenhum livro para mostrar no momento</p>
              <p className="no-results">Pesquise por título, autor, ano de publicação e muito mais!</p>
            </div>
          }
          { (favoriteSelected && favoritesItems.length === 0) && 
            <div className="no-books">
              <img src={no_books} alt="Sem resultados" />
              <p className="no-results">Você ainda não tem livros favoritos, adicione alguns a sua lista</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

// Responsividade