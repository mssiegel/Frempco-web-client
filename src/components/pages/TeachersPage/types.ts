import { PAIRED, SOLO } from '@utils/activities';

export interface Student {
  sessionId: string;
  realName: string;
  character?: string;
}

export interface ChatParticipants {
  student1: Student;
  student2?: Student;
}

export type StudentPair = [Student, Student];

export type ChatMessage = ['student1' | 'student2', string];

export type SoloChatMessage = ['student' | 'chatbot', string];

export interface StudentChat {
  mode: typeof PAIRED;
  chatId: string;
  studentPair: StudentPair;
  conversation: ChatMessage[];
  isCompleted: boolean;
}

export interface SoloChat {
  mode: typeof SOLO;
  chatId: string;
  student: Student;
  conversation: SoloChatMessage[];
  isCompleted: boolean;
}
