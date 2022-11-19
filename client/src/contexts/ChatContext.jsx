import { createContext, useState } from 'react'
import initialState from '../data/chat.json'

const ChatContext = createContext(initialState)

const ChatContextProvider = ({ children }) => {
  const [chat, setChat] = useState(initialState)

  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export { ChatContextProvider }
export default ChatContext
