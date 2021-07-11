import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type roomsReturn = Record<string, {
  title: String
  endedAt: String | undefined
  authorId: String
}>

type Rooms = {
  id: String
  name: String
  endedAt: String | undefined
  authorId: String
}

export function useRooms(userId: String | undefined) {
  const {user} = useAuth()
  const [ rooms, setRooms ] = useState<Rooms[]>([])

  useEffect(() => {
    const roomsRef = database.ref(`rooms/`)
    roomsRef.on('value', returnRooms => {
      const databaseRooms = returnRooms.val()
      const firebaseRooms: roomsReturn = databaseRooms ?? {}
      const Rooms = Object.entries(firebaseRooms).map(([key, value]) => {
        return {
          id: key,
          name: value.title,
          endedAt: value.endedAt,
          authorId: value.authorId,
        }
      })
      setRooms(Rooms.filter(room => room.authorId === userId && !room.endedAt))
    })
  })
  return rooms
}