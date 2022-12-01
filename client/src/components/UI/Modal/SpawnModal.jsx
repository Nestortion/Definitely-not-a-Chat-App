import ReactDOM from 'react-dom'
import './modal.scss'

function Backdrop({ children, closeModal }) {
  return (
    <div className="backdrop" onClick={closeModal}>
      {children}
    </div>
  )
}

function Modal({ title, children, closeModal }) {
  ;<div className="modal">
    <h1>{title}</h1>
    {children}
    <button onClick={closeModal}>Okay</button>
  </div>
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
