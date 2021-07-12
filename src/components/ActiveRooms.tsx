import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRooms } from '../hooks/useRooms'
import '../styles/activeRooms.scss'

export function ActiveRooms() {
  const { user } = useAuth()

  const Rooms = useRooms(user?.id)

  let html = null

  if(Rooms.length > 0){
    html = (
      <div id="user-rooms">
        <h2>Suas salas ativas:</h2>
        <div className="active-rooms-list">

          {Rooms.map(room => {
            return (
              <>
                <Link to={`/admin/rooms/${room.id}`}><p>{room.name}</p></Link>
              </>
            )
          })}

        </div>
      </div>
    )
  }

  return (
    html
  )
}