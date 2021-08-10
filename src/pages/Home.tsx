import { useHistory } from 'react-router-dom'
// import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
// import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
// import { FormEvent } from 'react'
import { useState } from 'react'
// import { database } from '../services/firebase'
import { Footer } from '../components/Footer'
import { LogoutButton } from '../components/LogoutButton'
import { WelcomeMsg } from '../components/WelcomeMsg'
import { SwitchButton } from '../components/SwitchButton'
import { Illustration } from '../components/svg/Illustration'

export function Home() {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();
  // const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new')
  }

  // async function handleJoinRoom(event: FormEvent) {
  //   event.preventDefault();

  //   if (roomCode.trim() === '') {
  //     return;
  //   }

  //   const roomRef = await database.ref(`rooms/${roomCode}`).get();
  //   if (!roomRef.exists()) {
  //     alert('Room does not exists!');
  //     return;
  //   }

  //   if (roomRef.val().endedAt) {
  //     alert('Room already closed!')
  //     return;
  //   }

  //   history.push(`/rooms/${roomCode}`);
  // }

  return (
    <div id="page-auth">
      <aside>

        <Illustration />

        {/* <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" /> */}
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <SwitchButton />
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <WelcomeMsg />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <LogoutButton />
          {/* <div className="separator">ou entre em uma sala</div>
            <form onSubmit={handleJoinRoom}>
              <input
                type="text"
                placeholder="Digite o código da sala"
                onChange={event => setRoomCode(event.target.value)}
                value={roomCode}
              />
              <Button type="submit">Entrar na sala</Button>
            </form> */}
        </div>
        <Footer />
      </main>
    </div>
  )
}