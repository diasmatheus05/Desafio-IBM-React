import '@coreui/coreui/dist/css/coreui.min.css';

import { BooksContextProvider } from './context/booksContext';

import { Home } from './pages/Home/home';

function App() {
  return (
    <BooksContextProvider>
      <Home />
    </BooksContextProvider>
  );
}

export default App;
