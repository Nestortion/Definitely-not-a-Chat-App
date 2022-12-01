import { createContext, useState } from 'react'

const ModalContext = createContext()

const ModalContextProvider = ({ children }) => {
  const [modalIsShowing, setModalIsShowing] = useState(true)

  const openModal = () => {
    setModalIsShowing(true)
  }

  const closeModal = () => {
    setModalIsShowing(false)
  }

  return (
    <ModalContext.Provider value={{ modalIsShowing, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export { ModalContextProvider }
export default ModalContext
