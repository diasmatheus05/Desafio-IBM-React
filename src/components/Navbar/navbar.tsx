import { 
  CNavbar,
  CContainer,
  CNavbarBrand,
  CForm,
  CFormControl,
  CButton,
} from '@coreui/react';

import "./navbar.css";

export function Navbar() {
  return (
    <CNavbar colorScheme="light" className="bg-light">
      <CContainer fluid>
        <CNavbarBrand className="mb-0 h1">Desafio IBM React.Js | GOOGLE BOOKS</CNavbarBrand>
        
        <CForm className="d-flex">
          <CFormControl
            type="search"
            className="me-2"
            placeholder="Search"
          />
          <CButton type="submit" color="success" variant="outline">
            Search
          </CButton>
        </CForm>
      </CContainer>
    </CNavbar>
  )
}