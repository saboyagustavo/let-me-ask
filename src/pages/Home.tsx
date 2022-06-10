import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import loginIcon from '../assets/images/login-icon.svg';

export function Home() {
  return (
    <div>
      <aside>
        <img src={illustrationImg} alt='Ilustração de cartões de perguntas e respostas' />
        <strong>Crie salas interativas de Q&amp;A ao vivo.</strong>
        <p>A audiência define a prioridade e você tira as dúvidas em tempo real</p>
      </aside>

      <main>
        <div>
          <img src={logoImg} alt='Letmeask' />

          <button>
            <img src={googleIcon} alt='Logo do Google' />
            Crie sua sala com o Google
          </button>

          <div>ou entre em uma sala</div>

          <form>
            <input
              type='text'
              placeholder='Digite o código da sala'
              value=''
            />
            <button>
              <img src={loginIcon} alt='Seta para direita indicando a entrada a uma sala' />
              Entrar na sala
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}