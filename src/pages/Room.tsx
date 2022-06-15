import { Button } from "../components/Button";

export function Room() {
  return (
    <div>
      <header>
        <div>
          <img id='logo' src='' alt='' />

          <Button>
            <img src='' alt='' />
            codigo da sala
          </Button>
        </div>
      </header>

      <main>
        <h1>Sala React</h1>
        <form>
          <textarea style={{resize: 'none'}} />

          <div>
            <span>
              Para enviar uma pergunta, <button>faça seu login</button>.
            </span>
            <div>
              <img src='' alt='' />
              <span></span>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}