import ReactDOM from 'react-dom'
import Card from '../Card/Card'
import './modal.scss'
import { MdClose } from 'react-icons/md'

function Backdrop({ children, closeModal }) {
  return (
    <div className="backdrop" onClick={closeModal}>
      {children}
    </div>
  )
}

function Modal({ title, children, closeModal }) {
  return (
    <Card onClick={(e) => e.stopPropagation()}>
      <div className="modal">
        <div className="modal__title">
          <span>{title}</span>
          <MdClose cursor="pointer" onClick={closeModal} />
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </Card>
  )
}

export default function SpawnModal({ title, children, closeModal }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={closeModal}>
          <Modal title={title} closeModal={closeModal}>
            {children}
          </Modal>
        </Backdrop>,
        document.getElementById('backdrop-root')
      )}
    </>
  )
}
