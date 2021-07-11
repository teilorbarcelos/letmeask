import { useAuth } from '../hooks/useAuth'

export function WelcomeMsg() {
  const { user} = useAuth();

  let msg = null

  if(user){
    msg = <p>Seja bem vindo {user.name}</p>
  }

  return (msg)
  
}