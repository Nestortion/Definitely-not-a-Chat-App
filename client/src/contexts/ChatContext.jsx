import { createContext, useState } from 'react'

// TODO: This data should come from api
const initialState = {
  chatId: '1',
  chatTitle: 'Chat 1',
  chatProfilePicUrl:
    'https://images.pexels.com/photos/381228/pexels-photo-381228.jpeg?auto=compress&cs=tinysrgb&w=1600',
}

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
