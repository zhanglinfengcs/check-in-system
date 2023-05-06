import { useState, createContext } from "react";
import { UserType, IsStaff, Gender, AttendSituation } from "../types";

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const initUser: UserType = {
  userId: "1",
  name: "John Doe",
  password: "123456789",
  phoneNum: "123456789",
  gender: Gender.Male,
  isStaff: IsStaff.Yes,
  status: AttendSituation.Checked,
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(initUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
