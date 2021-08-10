import { Link, useHistory } from 'react-router-dom'
// import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'
import { Footer } from '../components/Footer'
import { ActiveRooms } from '../components/ActiveRooms'
import { useTheme } from '../hooks/useTheme'
import { Illustration } from '../components/svg/Illustration'

export function NewRoom() {
  const { signInWithGoogle, user} = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] =useState('');

  useTheme()

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if(newRoom.trim() === ''){
      alert('Insert a valid name to the room!')
      return;
    }

    if(!user){
      await signInWithGoogle()
    }else{
      const roomRef = database.ref('rooms');
      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id
      })
      history.push(`/admin/rooms/${firebaseRoom.key}`)
    }
  }

  return (
    <div id="page-auth">
      <aside>

        <Illustration />

        {/* <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" /> */}
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <Link to="/"><img src={logoImg} alt="Letmeask" /></Link>
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          {/* <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p> */}
          <p><Link to="/">Voltar para a página inicial.</Link></p>
        </div>
        <ActiveRooms />
        <Footer/>
      </main>
    </div>
  )
}