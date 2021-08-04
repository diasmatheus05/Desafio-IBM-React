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
  const { pages, pageIndex, handleTermsChange, handlePageIndexChange } = useBooksContext();

  return (
    <CNavbar colorScheme="light" className="bg-light">
      <CContainer fluid>
        <CNavbarBrand className="mb-0 h1">Desafio IBM React.Js | GOOGLE BOOKS</CNavbarBrand>
        
        <CCollapse className="my-collapse navbar-collapse" visible={true}>
          <CNavLink href="#">Favoritos</CNavLink>
          <CForm className="d-flex">
            <CFormControl
              type="search"
              className="me-2"
              placeholder="Search"
              onChange={event => handleTermsChange(event.target.value)}
            />
          </CForm>
          <CPagination aria-label="Page navigation example">
            <CPaginationItem aria-label="Previous" onClick={() => handlePageIndexChange(false)}>
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            { pages?.map(page => {
                if (page >= pageIndex - 1 && page <= pageIndex + 1)
                  return <CPaginationItem active={pageIndex === page}>{page}</CPaginationItem>
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