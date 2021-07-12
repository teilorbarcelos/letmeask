import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type videoUrl = {
  url: String | undefined
}

export function useVideoUrl(roomId: String) {
  const [ url, setUrl ] = useState('')

  useEffect(() => {
    const roomsRef = database.ref(`rooms/${roomId}/videoUrl`)
    roomsRef.on('value', returnUrl => {
      setUrl(returnUrl.val() ?? '')
    })
  })
  return url
}