import { PAIRED, SOLO } from '@utils/classrooms';

export interface Student {
  socketId: string;
  realName: string;
  character?: string;
}

export type StudentPair = [Student, Student];

export type ChatMessage = ['student1' | 'student2' | 'teacher', string];

export type SoloChatMessage = ['student' | 'chatbot' | 'teacher', string];

export interface StudentChat {
  mode: typeof PAIRED;
  chatId: string;
  studentPair: StudentPair;
  conversation: ChatMessage[];
}

export interface SoloChat {
  mode: typeof SOLO;
  chatId: string;
  student: Student;
  conversation: SoloChatMessage[];
}
