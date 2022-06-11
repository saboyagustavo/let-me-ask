import { BannerAside } from "../components/BannerAside";
import { Button } from "../components/Button";

import logoImg from '../assets/images/logo.svg';

import '../styles/home.scss';
import { Link } from "react-router-dom";

export function NewRoom() {
  return (
    <div id='new-room-page'>
      <BannerAside />

      <main>
        <div className='main-content'>
          <img id='logo' src={logoImg} alt='Letmeask' draggable='false' />

          <h2>Crie uma nova sala</h2>

          <form>
            <input type='text' placeholder='Nome da sala' value='' />
            <Button type='submit'>Criar sala</Button>
          </form>

          <p className='join-room-redirect'>
            Quer entrar em uma sala já existente?&nbsp;
            <Link to='/'>Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}