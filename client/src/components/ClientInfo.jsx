import { Box } from '@chakra-ui/react'
import Avatar from 'react-avatar'

// eslint-disable-next-line react/prop-types
const ClientInfo = ({username}) => {
  return (
    <Box className='flex items-center flex-row font-semibold'>
      <Avatar name={username} size={50} round="14px" />
      <span className='mt-0.5 text-white text-3xl ml-2'>{username}</span>
    </Box>
  )
}

export default ClientInfo
