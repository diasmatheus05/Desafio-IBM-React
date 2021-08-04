import { useBooksContext } from '../../context/booksContext';

import { 
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';

import "./table.css";

import favorite_icon from '../../assets/favorite.svg';
import favorite_select_icon from '../../assets/favorite-select.svg';

interface TableProps {
  columns: string[];
  columnsToShow: string[];
  items?: any[];
}

export function Table({ columns, columnsToShow, items }: TableProps) {
  const { favorites, handleFavorites } = useBooksContext();

  return (
    <CTable striped className="my-table">
      <CTableHead>
        <CTableRow>
          { columnsToShow.map(col => {
              return <CTableHeaderCell key={col}>{ col }</CTableHeaderCell>
            })
          }
        </CTableRow>
      </CTableHead>


      <CTableBody>
        { items?.map((item, itemIndex) => {
            return (
              <CTableRow key={item.id}>
                { columns.map((col, index) => {
                    if (index === 0)
                      return <CTableHeaderCell key={item.id + '-' + index}>{ itemIndex + 1 }</CTableHeaderCell>
                    if (col === 'small_img')
                      return <CTableDataCell key={item.id + '-' + index}><img src={item[col]} alt="Capa" /></CTableDataCell>
                    if (col === 'favorite') {
                      return (
                        <CTableDataCell key={item.id + '-' + index}>
                          <img onClick={() => handleFavorites(item.id)} className="favorite" src={favorites.includes(item.id) ? favorite_select_icon : favorite_icon} alt="Capa" />
                        </CTableDataCell>
                      ) 
                    } else
                      return <CTableDataCell key={item.id + '-' + index}>{ item[col] }</CTableDataCell>
                  })
                }
              </CTableRow>
            )
          }) 
        }
      </CTableBody>
    </CTable>
  )
}