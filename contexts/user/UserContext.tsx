import React, { createContext, useMemo, useState } from 'react'

interface IUserType {
  longitude: number
  latitude: number
  city: string
  uf: string
}

interface UserContextProps {
  state: IUserType
  setState: React.Dispatch<React.SetStateAction<IUserType>>
}

const UserContext = createContext<UserContextProps>({
  state: {
    longitude: 0,
    latitude: 0,
    city: '',
    uf: '',
  },
  setState: () => {},
})

export function UserContextProvider({ children }: any) {
  const [state, setState] = useState<IUserType>({
    longitude: 0,
    latitude: 0,
    city: '',
    uf: '',
  })

  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [state]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export default UserContext
