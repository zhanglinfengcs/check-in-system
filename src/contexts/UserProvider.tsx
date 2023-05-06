import { useState, createContext } from "react";
import { UserType, IsStaff, Gender, AttendSituation, MResponseType } from "../types";

interface UserContextType {
  user: UserType | null;
  login: (userId: string, password: string) => Promise<MResponseType>;
  register: (user: UserType) => void;
}

const admin: UserType = {
  userId: "1",
  name: "张三",
  password: "123456789",
  phoneNum: "123456789",
  gender: Gender.Male,
  isStaff: IsStaff.No,
  status: AttendSituation.Checked,
};

const generalUser: UserType = {
  userId: "2",
  name: "张三",
  password: "123456789",
  phoneNum: "123456789",
  gender: Gender.Female,
  isStaff: IsStaff.Yes,
  status: AttendSituation.Checked,
}


export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  async function login(userId: string, password: string): Promise<MResponseType> {
    console.log(password)
    if (userId === admin.userId) {
      setUser(admin);
      const res: MResponseType = {
        status: 200,
        message: 'succeed',
        data: admin
      }
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(res)
        }, 1000)
      })
    }
    else if (userId === generalUser.userId) {
      setUser(generalUser);
      const res: MResponseType = {
        status: 200,
        message: 'succeed',
        data: generalUser
      }
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(res)
        }, 1000)
      })
    }
    else {
      return new Promise(reject => {
        setTimeout(() => {
          reject({
            status: 401,
            message: 'failed',
            data: {} as UserType
          })
        }, 1000)
      })
    }
  }

  function register(user: UserType) {
    console.log(user)
    return
  }

  return (
    <UserContext.Provider value={{ user, login, register }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
