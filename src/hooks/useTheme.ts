export function useTheme() {
  const theme = localStorage.getItem("letmeask:theme")

  async function setStyle(variable: string, varStyle: string){
    document.body.style.setProperty(variable, varStyle)
  }

  if(theme === "light"){
    setStyle('--bg', '#f8f8f8')
    setStyle('--gray-border', '#e2e2e2')
    setStyle('--bg-input-text', '#fff')
    setStyle('--text', '#000')
    setStyle('--purple', '#835afd')
    setStyle('--dark-gray', '#dbdcdd')
  }else{
    setStyle('--bg', '#414141')
    setStyle('--gray-border', '#565656')
    setStyle('--bg-input-text', '#666262')
    setStyle('--text', '#fff')
    setStyle('--purple', '#5439a3')
    setStyle('--dark-gray', '#2e2f30')
  }
  
  return theme
}