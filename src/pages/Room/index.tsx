import { Button } from "../../components/Button";

import logoImg from '../../assets/images/logo.svg';
import { RoomCode } from "../../components/RoomCode";
import './styles.scss';
export function Room() {
  return (
    <div id="page-room">
      <header>
        <div className="header-content">
          <img src={logoImg} alt='Letmeask' />

          <RoomCode code="codigo da sala"/>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea
            placeholder="O que você quer perguntar"
            style={{ resize: 'none' }}
          />

          <div className="form-footer">
            <span>
              Para enviar uma pergunta, <button>faça seu login</button>.
            </span>

            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}