import { BannerAside } from '../components/BannerAside';
import { Button } from '../components/Button';

import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import loginIcon from '../assets/images/login-icon.svg';

import '../styles/home.scss';

export function Home() {
  return (
    <div id='home-page'>
      <BannerAside />
      <main>
        <div className='main-content'>
          <img id='logo' src={logoImg} alt='Letmeask' draggable='false' />

          <Button type='button' className='sign-in-button'>
            <img src={googleIcon} alt='Logo do Google' draggable='false' />
            Crie sua sala com o Google
          </Button>

          <div className='separator'>ou entre em uma sala</div>

          <form>
            <input type='text' placeholder='Digite o código da sala' value='' />
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