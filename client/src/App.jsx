import { Navigate, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Room from "./pages/Room.jsx";
import { useAuthContext } from './context/AuthContext.jsx';
import { ChakraProvider } from '@chakra-ui/react';

function App() {

  const {authUser} = useAuthContext();

  return (

    <ChakraProvider>
      <div className=' h-screen flex items-center justify-center bg-slate-900 text-white'>
        <Routes>
          <Route path='/' element={authUser ? <Home/> : <Navigate to="/register"/>}/>
          <Route path='/user/:roomId' element={authUser ? <Room/> : <Navigate to="/register"/>}/>
          <Route path='/login' element={authUser ? <Navigate to="/"/> : <Login/>}/>
          <Route path='/register' element={authUser ? <Navigate to="/"/> : <Register/>}/>
        </Routes>
      </div>
    </ChakraProvider>
  )
}

export default App
