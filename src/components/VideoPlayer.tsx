import ReactPlayer from 'react-player/lazy'

export function VideoPlayer(url: string) {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='video-player'
        url={url}
        width='100%'
        height='100%'
      />
    </div>
  )
}