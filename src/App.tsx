import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

import './styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms/new' element={<NewRoom />} />
          <Route path='/rooms/:id' element={<Room />} />
        </Routes>
        <ToastContainer transition={Slide} autoClose={3000} draggable={false} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}