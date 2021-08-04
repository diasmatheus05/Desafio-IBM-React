import { UsefulBooks } from '../../libs/books';

import { 
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react';

interface ModalProps {
  visible: boolean;
  item?: UsefulBooks;
  onChangeVisible: (value: boolean) => void;
}

export function Modal({ visible, item, onChangeVisible }: ModalProps) {
  return (
    <CModal alignment="center" visible={visible} onDismiss={() => onChangeVisible(false)}>
      <CModalHeader onDismiss={() => onChangeVisible(false)}>
        <CModalTitle>{item?.title}{ item?.subtitle && ", " + item.subtitle }</CModalTitle>
      </CModalHeader>
      <CModalBody className="my-modal-body">
        { item?.img && <img src={item.img} alt="Capa" />}
        { item?.description && <p dangerouslySetInnerHTML={{ __html: item.description }} />}
        { item?.category && <p><strong>Categoria:</strong> {item.category}</p>}
        { item?.authors && <p><strong>Autor:</strong> {item.authors}</p>}
        { item?.date && <p><strong>Data de publicação:</strong> {item.date}</p>}
        { item?.publisher && <p><strong>Editora:</strong> {item.publisher}</p>}
        { item?.pages && <p><strong>Número de páginas:</strong> {item.pages}</p>}
        { item?.language && <p><strong>Idioma:</strong> {item.language}</p>}
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => onChangeVisible(false)}>
          Fechar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}