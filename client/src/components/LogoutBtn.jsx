import { Button } from '@chakra-ui/react'
import useLogout from '../hooks/useLogout.jsx'

const LogoutBtn = () => {

  const {loading, logout} = useLogout();

  return (
    <div>
      <Button disabled={loading} onClick={logout} colorScheme='blue'>{loading ? <span className="loading loading-spinner"></span> : "Logout" }</Button>
    </div>
  )
}

export default LogoutBtn
