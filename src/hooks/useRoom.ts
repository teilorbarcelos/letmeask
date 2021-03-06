import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>;

type QuestionsType = {
  id: string;
  author: {
    name: string,
    avatar: string
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom(roomId: string) {
  const {user} = useAuth();
  const [questions, setQuestions] = useState<QuestionsType[]>([]);
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      })

      parsedQuestions.sort((a, b) => a.isAnswered ? 1 : b.isAnswered ? -1 : b.likeCount - a.likeCount);

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions);
      setAuthorId(databaseRoom.authorId)
    })

    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id])
  
  return {title, questions, authorId}
}