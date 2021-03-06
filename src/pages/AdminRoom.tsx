import { useParams } from 'react-router';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import '../styles/room.scss';
import { database } from '../services/firebase';
import { Link, useHistory } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { VideoPlayer } from '../components/VideoPlayer';
import { FormEvent, useState } from 'react';
import { useVideoUrl } from '../hooks/useVideoUrl';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

type RoomParams = {
  id: string;
}

export function AdminRoom(){
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions, authorId } = useRoom(roomId);
  const [videoUrl, setVideoUrl] = useState('')
  const {user} = useAuth()

  useTheme()

  async function goOut() {
    alert('Você não é o dono desta sala, cai fora daqui!')
    history.push(`/rooms/${roomId}`)
  }

  async function handleEndRoom(){
    if(user?.id === authorId){
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date()
      })
      history.push('/rooms/new');
    }else{
      goOut()
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    if(user?.id === authorId){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true
      })
    }else{
      goOut()
    }
  }

  async function handleHighlightQuestion(questionId: string) {
    if(user?.id === authorId){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true
      })
    }else{
      goOut()
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if(user?.id === authorId){
      if(window.confirm('Você deseja excluir esta pergunta?')){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
      }
    }else{
      goOut()
    }
  }

  async function handleVideoUrl(event: FormEvent) {
    event.preventDefault()

    if(user?.id === authorId){
      if(videoUrl.trim() === ''){
        await database.ref(`rooms/${roomId}/videoUrl`).remove()
      }
      await database.ref(`rooms/${roomId}`).update({videoUrl: videoUrl})
    }else{
      goOut()
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
        <Link to="/"><img src={logoImg} alt="Letmeask" className="logo"/></Link>
          <div>
            <RoomCode code={window.location.href.replace('admin/', '')}/>
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          <form onSubmit={handleVideoUrl}>
              <input
                type="text"
                placeholder="Endereço do vídeo"
                onChange={event => setVideoUrl(event.target.value)}
                value={videoUrl}
              />
              <Button isOutlined type="submit">Inserir/Alterar vídeo</Button>
            </form>
          {VideoPlayer(useVideoUrl(roomId))}
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Destacar pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Deletar pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
        <Footer/>
      </main>
    </div>
  );
}
