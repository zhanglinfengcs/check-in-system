import { useState, createContext } from "react";
import { UserType } from "../types";

interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

// const admin: UserType = {
//   userId: "1",
//   name: "张三",
//   password: "123456789",
//   phoneNum: "123456789",
//   gender: Gender.Male,
//   isStaff: IsStaff.No,
//   status: AttendSituation.Checked,
// };

// const generalUser: UserType = {
//   userId: "2",
//   name: "张三",
//   password: "123456789",
//   phoneNum: "123456789",
//   gender: Gender.Female,
//   isStaff: IsStaff.Yes,
//   status: AttendSituation.Checked,
// }


export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null); 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
