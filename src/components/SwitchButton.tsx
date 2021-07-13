import '../styles/switchButton.scss'

export function SwitchButton() {

  async function themeSwitch(){
    alert('mudar tema!')
  }
  
  return (
    <div id="theme-switch">
      <label className="switch">
        <input type="checkbox" onClick={() => themeSwitch()} />
        <span className="slider round"></span>
      </label>
    </div>
  )
  
}