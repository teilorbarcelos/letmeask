import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import '../styles/switchButton.scss'

export function SwitchButton() {
  const [theme, setTheme] = useState(useTheme())
  let switchButton = (<input type="checkbox" onClick={() => themeSwitch()} />)

  if(theme && theme === 'light'){
    switchButton = (<input type="checkbox" defaultChecked onClick={() => themeSwitch()} />)
  }
  
  async function themeSwitch(){
    if(localStorage.getItem("letmeask:theme") && localStorage.getItem("letmeask:theme") === "light"){
      localStorage.setItem("letmeask:theme","dark")
      setTheme('dark')
    }else{
      localStorage.setItem("letmeask:theme","light")
      setTheme('light')
    }
  }
  
  return (
    <div id="theme-switch">
      <label className="switch">
        {switchButton}
        <span className="slider round"></span>
      </label>
    </div>
  )
  
}