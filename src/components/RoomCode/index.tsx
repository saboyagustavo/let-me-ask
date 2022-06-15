import { Button } from '../Button';
import './styles.scss';

import copyImg from '../../assets/images/copy.svg';

type RoomCodeProps = {
  code: string;
}

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <Button
      className="room-code"
      onClick={() => copyRoomCodeToClipBoard()}
      isOutlined
    >
      <div>
        <img src={copyImg} alt='Copy room code'/>
      </div>
      <span>Sala #{code}</span>
    </Button>  
  );
}