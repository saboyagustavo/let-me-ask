import illustrationImg from '../assets/images/illustration.svg';
import '../styles/banner.scss';

export function BannerAside() {
  return (
    <aside className="banner-aside">
      <img
        src={illustrationImg}
        alt='Ilustração de cartões de perguntas e respostas'
        draggable='false'
      />
      <strong>
        Crie salas interativas <br />
        de Q&amp;A ao vivo.
      </strong>
      <p>
        A audiência define a prioridade e <br />
        você tira as dúvidas em tempo real
      </p>
    </aside>
  );
}
