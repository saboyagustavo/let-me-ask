import { FormEvent, useState, useRef } from 'react';
import { database } from '../services/firebase';
import { ref, get, query } from 'firebase/database';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { BannerAside } from '../components/BannerAside';
import { Button } from '../components/Button';

import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import loginIcon from '../assets/images/login-icon.svg';

import '../styles/home.scss';



export function Home() {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();
  const { signed, Login } = useAuth();
  const inputRef = useRef<HTMLInputElement>();

  async function navigateToNewRoom() {
    if (!signed) { 
      await Login();
    }

    navigate('/rooms/new');
  }

  async function handleJoinRoom(evt: FormEvent) {
    evt.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }
    try {
      const room = await get(query(ref(database, `rooms/${roomCode}`)));
      
      if (!room.exists()) {
        throw new Error('Desculpe, esta sala não existe');
      }

      navigate(`rooms/${roomCode}`);
    } catch(error: any) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setRoomCode('');
      inputRef?.current?.focus();
    }
  } 

  return (
    <div id='home-page'>
      <BannerAside />
      <main>
        <div className='main-content'>
          <img id='logo' src={logoImg} alt='Letmeask' draggable='false' />

          <Button type='button' className='google-sign-in-button' onClick={navigateToNewRoom}>
            <img src={googleIcon} alt='Logo do Google' draggable='false' />
            Crie sua sala com o Google
          </Button>

          <div className='separator'>ou entre em uma sala</div>

          <form onSubmit={(evt) => handleJoinRoom(evt)}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={evt => setRoomCode(evt.target.value)}
              value={roomCode}
              autoFocus
            />
            <Button type='submit'>
              <img src={loginIcon} alt='Seta para direita indicando a entrada a uma sala' draggable='false' />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}