import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type Rooms = {
  id: String
  name: String
  author: String
}

export function useRooms(userId: String) {
  const [ rooms, setRooms ] = useState<Rooms[]>([])
  
  return rooms
}