import { StudentChat } from './types';
import { PAIRED } from '@utils/activities';

/**
 * Not meant to be used in production.
 * Replace studentChats in ./index.tsx to test out UI with multiple chats during development
 */

export const EXAMPLE_CHATS: StudentChat[] = [
  {
    mode: PAIRED,
    isCompleted: true,
    chatId: '8DmBxTmt0Q_iUbbxAAAn#Ua_hGB2pSD-6CGvdAAAP',
    studentPair: [
      {
        realName: 'Student 1797',
        sessionId: '8DmBxTmt0Q_iUbbxAAAn',
        character: 'Tiny warlord',
      },
      {
        realName: 'Student 2958',
        sessionId: 'Ua_hGB2pSD-6CGvdAAAP',
        character: 'Forgetful surgeon',
      },
    ],
    conversation: [
      ['student1', 'hello!'],
      ['student1', 'how r u'],
      ['student2', 'good u??'],
      ['student1', 'good!'],
      ['student1', 'wat kind of phone do u have'],
      ['student2', 'android!'],
      ['student1', 'wow!'],
      ['student2', 'pretty cool hey '],
      ['student1', 'no'],
      ['student1', 'boooo'],
    ],
  },
  {
    mode: PAIRED,
    isCompleted: true,
    chatId: 'bMHZDSrQ_Oj-XukgAABF#PauZMgihsO1fIaG0AABJ',
    studentPair: [
      {
        realName: 'Student 4307',
        sessionId: 'bMHZDSrQ_Oj-XukgAABF',
        character: 'Dance teacher',
      },
      {
        realName: 'Student 9654',
        sessionId: 'PauZMgihsO1fIaG0AABJ',
        character: 'Perfectionist dentist',
      },
    ],
    conversation: [
      ['student1', 'hola'],
      ['student2', 'hey'],
    ],
  },
  {
    mode: PAIRED,
    isCompleted: true,
    chatId: 'NGAuHeC2kJgGf6voAAAl#-vIO1Gi-LTkR3u2HAAAx',
    studentPair: [
      {
        realName: 'Student 5305',
        sessionId: 'NGAuHeC2kJgGf6voAAAl',
        character: 'Perfectionist dentist',
      },
      {
        realName: 'Student 1133',
        sessionId: '-vIO1Gi-LTkR3u2HAAAx',
        character: 'Tiny warlord',
      },
    ],
    conversation: [
      ['student1', 'wats up'],
      ['student2', 'hello'],
    ],
  },
  {
    mode: PAIRED,
    isCompleted: true,
    chatId: '5XFUQ0oJWQiDaQlkAABN#N6C2lemQD7-xNWp0AABR',
    studentPair: [
      {
        realName: 'Student 5296',
        sessionId: '5XFUQ0oJWQiDaQlkAABN',
        character: 'Tiny warlord',
      },
      {
        realName: 'Student 2434',
        sessionId: 'N6C2lemQD7-xNWp0AABR',
        character: 'Perfectionist dentist',
      },
    ],
    conversation: [
      ['student1', 'wus good'],
      ['student2', 'hi!'],
    ],
  },
  {
    mode: PAIRED,
    isCompleted: true,
    chatId: 'V8XB9Bngez89zaBWAABV#oqNvcYw0MLfU_HAtAABZ',
    studentPair: [
      {
        realName: 'Student 7570',
        sessionId: 'V8XB9Bngez89zaBWAABV',
        character: 'Pirate captain',
      },
      {
        realName: 'Student 5072',
        sessionId: 'oqNvcYw0MLfU_HAtAABZ',
        character: 'Dance teacher',
      },
    ],
    conversation: [
      ['student1', 'how r u'],
      ['student2', 'yo'],
    ],
  },
  {
    mode: PAIRED,
    isCompleted: true,
    chatId: 'mmO7LO7b1aMp4SwkAABd#sqL6DHyk0WWCfwJ_AABh',
    studentPair: [
      {
        realName: 'Student 9997',
        sessionId: 'mmO7LO7b1aMp4SwkAABd',
        character: 'Dance teacher',
      },
      {
        realName: 'Student 2154',
        sessionId: 'sqL6DHyk0WWCfwJ_AABh',
        character: 'Party planner',
      },
    ],
    conversation: [['student2', 'yo']],
  },

  {
    mode: PAIRED,
    isCompleted: true,
    chatId: '8DmBxTmt0Q_iUbbxAAAn#Ua_hGB2pSD-6CGvdAAAP12',
    studentPair: [
      {
        realName: 'Student 1797',
        sessionId: '8DmBxTmt0Q_iUbbxAAAn',
        character: 'Tiny warlord',
      },
      {
        realName: 'Student 2958',
        sessionId: 'Ua_hGB2pSD-6CGvdAAAP',
        character: 'Forgetful surgeon',
      },
    ],
    conversation: [
      ['student1', 'hey!'],
      ['student2', 'yooo'],
    ],
  },
  {
    mode: PAIRED,
    isCompleted: true,
    chatId: 'bMHZDSrQ_Oj-XukgAABF#PauZMgihsO1fIaG0AABJ12',
    studentPair: [
      {
        realName: 'Student 4307',
        sessionId: 'bMHZDSrQ_Oj-XukgAABF',
        character: 'Dance teacher',
      },
      {
        realName: 'Student 9654',
        sessionId: 'PauZMgihsO1fIaG0AABJ',
        character: 'Perfectionist dentist',
      },
    ],
    conversation: [
      ['student1', 'hola'],
      ['student2', 'hey'],
    ],
  },
  {
    mode: PAIRED,
    isCompleted: true,
    chatId: 'NGAuHeC2kJgGf6voAAAl#-vIO1Gi-LTkR3u2HAAAx12',
    studentPair: [
      {
        realName: 'Student 5305',
        sessionId: 'NGAuHeC2kJgGf6voAAAl',
        character: 'Perfectionist dentist',
      },
      {
        realName: 'Student 1133',
        sessionId: '-vIO1Gi-LTkR3u2HAAAx',
        character: 'Tiny warlord',
      },
    ],
    conversation: [
      ['student1', 'wats up'],
      ['student2', 'hello'],
    ],
  },
  {
    mode: PAIRED,
    isCompleted: true,
    chatId: '5XFUQ0oJWQiDaQlkAABN#N6C2lemQD7-xNWp0AABR12',
    studentPair: [
      {
        realName: 'Student 5296',
        sessionId: '5XFUQ0oJWQiDaQlkAABN',
        character: 'Tiny warlord',
      },
      {
        realName: 'Student 2434',
        sessionId: 'N6C2lemQD7-xNWp0AABR',
        character: 'Perfectionist dentist',
      },
    ],
    conversation: [
      ['student1', 'wus good'],
      ['student2', 'hi!'],
    ],
  },
];
