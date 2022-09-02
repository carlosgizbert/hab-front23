import { useContext } from 'react'
import UserContext from '../user/UserContext'

const useUserData = () => useContext(UserContext)

export default useUserData
