import { useState, createContext } from "react"
import { UserType, UserLevel } from "../types"

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const initUser: UserType = {
  id: '1',
  name: "John Doe",
  email: "john@doe.com",
  phone: "123456789",
  level: UserLevel.Simple,
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

function UserProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<UserType | null>(initUser)

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider