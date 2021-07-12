import { useEffect, useState } from "react";
import { database } from "../services/firebase";

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