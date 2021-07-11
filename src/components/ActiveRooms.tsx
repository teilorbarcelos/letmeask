import { useAuth } from '../hooks/useAuth'

export function ActiveRooms() {
  const { user } = useAuth()

  return (
    <div className="active-rooms">
      
    </div>
  )
}