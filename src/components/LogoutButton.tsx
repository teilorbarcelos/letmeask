import { useAuth } from '../hooks/useAuth'
import '../styles/logoutButton.scss'

export function LogoutButton() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout()
  }

  let button = null

  if(user){
    button = <button onClick={handleLogout} className="logout">Logout</button>
  }

  return (button)
  
}