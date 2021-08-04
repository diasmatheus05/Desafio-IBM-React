import { useBooksContext } from '../../context/booksContext';

import { 
  CNavbar,
  CContainer,
  CNavbarBrand,
  CForm,
  CFormControl,
  CPagination,
  CPaginationItem,
  CCollapse,
  CNavLink
} from '@coreui/react';

import "./navbar.css";

export function Navbar() {
  const { pages, pageIndex, favoriteSelected, handleTermsChange, handlePageIndexChange, toggleFavoriteSelected } = useBooksContext();

  return (
    <CNavbar colorScheme="light" className="bg-light">
      <CContainer fluid>
        <CNavbarBrand className="mb-0 h1">Desafio IBM React.Js | GOOGLE BOOKS</CNavbarBrand>
        <CNavbarBrand className="mb-0 h1">{favoriteSelected ? 'Favoritos' : 'Home'}</CNavbarBrand>
        
        <CCollapse className="my-collapse navbar-collapse" visible={true}>
          <CNavLink href="#" onClick={toggleFavoriteSelected}>{favoriteSelected ? 'Home' : 'Favoritos'}</CNavLink>
          <CForm className="d-flex">
            <CFormControl
              type="search"
              className="me-2"
              placeholder="Pesquisar"
              onChange={event => handleTermsChange(event.target.value)}
            />
          </CForm>
          <CPagination aria-label="Page navigation example">
            <CPaginationItem aria-label="Previous" onClick={() => handlePageIndexChange(false)}>
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            { pages?.map(page => {
                if (page >= pageIndex - 1 && page <= pageIndex + 1)
                  return <CPaginationItem active={pageIndex === page}>{page + 1}</CPaginationItem>
              })
            }
            <CPaginationItem aria-label="Next" onClick={() => handlePageIndexChange(true)}>
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </CCollapse>
      </CContainer>
    </CNavbar>
  )
}