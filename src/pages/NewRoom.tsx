import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { database } from '../services/firebase';
import { ref, push } from 'firebase/database';

import { useAuth } from '../hooks/useAuth';
import { BannerAside } from '../components/BannerAside';
import { Button } from '../components/Button';

import logoImg from '../assets/images/logo.svg';
import '../styles/home.scss';

export function NewRoom() {
  const [newRoom, setNewRoom] = useState('');
  const { signed, user } = useAuth();
  const navigate = useNavigate();

  async function handleCreateNewRoom(evt: FormEvent) {
    evt.preventDefault();
    try {

      if (!signed) {
        navigate('/');
        throw new Error('Para criar uma nova sala você precisa estar logado');
      }
      
      if (newRoom.trim() === '') {
        return;
      }
      
      const roomRef = ref(database, 'rooms');
      
      const firebaseRoom = await push(roomRef, {
        title: newRoom,
        authorId: user?.id
      });
      
      navigate(`/rooms/${firebaseRoom.key}`);
    } catch (error: any) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } 

  return (
  <>
    <div id='new-room-page'>
      <BannerAside />

      <main>
        <div className='main-content'>
          <img id='logo' src={logoImg} alt='Letmeask' draggable='false' />
          <h2>Crie uma nova sala</h2>

          <form onSubmit={(evt)=> handleCreateNewRoom(evt)}>
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={(evt) => setNewRoom(evt.target.value)}
              value={newRoom}
            />
            <Button type='submit'>Criar sala</Button>
          </form>

          <p className='join-room-redirect'>
            Quer entrar em uma sala já existente?&nbsp;
            <Link to='/'>Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  </>
  );
}