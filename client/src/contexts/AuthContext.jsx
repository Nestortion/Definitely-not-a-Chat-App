import { createContext, useState } from 'react'

// TODO: This data should come from api
const initialState = {
  userId: '1',
  username: 'John Doe',
  profilePicUrl:
    'https://images.pexels.com/photos/12050399/pexels-photo-12050399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
}

const AuthContext = createContext(initialState)

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialState)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
export default AuthContext
