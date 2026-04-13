import { PAIRED, SOLO } from '@utils/activities';

export type ChatMessage = ['you' | 'peer', string];

export type SoloChatMessage = ['you' | 'chatbot', string];

export interface StudentPairedChat {
  mode: typeof PAIRED;
  characters: {
    you: string;
    peer: string;
  };
  conversation: ChatMessage[];
}

export interface StudentSoloChat {
  mode: typeof SOLO;
  characters: {
    you: string;
    peer: string;
  };
  conversation: SoloChatMessage[];
}

export type Stage =
  | 'joining'
  | 'lobby'
  | 'chatting'
  | 'chatEnded'
  | 'removedByTeacher';

export const STAGE = {
  joining: 'joining',
  lobby: 'lobby',
  chatting: 'chatting',
  chatEnded: 'chatEnded',
  removedByTeacher: 'removedByTeacher',
} as const;
