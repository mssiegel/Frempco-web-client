import { StudentChat } from '.';
import { PAIRED } from '@utils/classrooms';

/**
 * Not meant to be used in production.
 * Replace studentChats in ./index.tsx to test out UI with multiple chats during development
 */

export const EXAMPLE_CHATS: StudentChat[] = [
  {
    mode: PAIRED,
    chatId: '8DmBxTmt0Q_iUbbxAAAn#Ua_hGB2pSD-6CGvdAAAP',
    studentPair: [
      {
        realName: 'Student 1797',
        socketId: '8DmBxTmt0Q_iUbbxAAAn',
        character: 'Tiny warlord',
      },
      {
        realName: 'Student 2958',
        socketId: 'Ua_hGB2pSD-6CGvdAAAP',
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
    startTime: '12:16 PM',
  },
  {
    mode: PAIRED,
    chatId: 'bMHZDSrQ_Oj-XukgAABF#PauZMgihsO1fIaG0AABJ',
    studentPair: [
      {
        realName: 'Student 4307',
        socketId: 'bMHZDSrQ_Oj-XukgAABF',
        character: 'Dance teacher',
      },
      {
        realName: 'Student 9654',
        socketId: 'PauZMgihsO1fIaG0AABJ',
        character: 'Perfectionist dentist',
      },
    ],
    conversation: [
      ['student1', 'hola'],
      ['student2', 'hey'],
    ],
    startTime: '12:16 PM',
  },
  {
    mode: PAIRED,
    chatId: 'NGAuHeC2kJgGf6voAAAl#-vIO1Gi-LTkR3u2HAAAx',
    studentPair: [
      {
        realName: 'Student 5305',
        socketId: 'NGAuHeC2kJgGf6voAAAl',
        character: 'Perfectionist dentist',
      },
      {
        realName: 'Student 1133',
        socketId: '-vIO1Gi-LTkR3u2HAAAx',
        character: 'Tiny warlord',
      },
    ],
    conversation: [
      ['student1', 'wats up'],
      ['student2', 'hello'],
    ],
    startTime: '12:16 PM',
  },
  {
    mode: PAIRED,
    chatId: '5XFUQ0oJWQiDaQlkAABN#N6C2lemQD7-xNWp0AABR',
    studentPair: [
      {
        realName: 'Student 5296',
        socketId: '5XFUQ0oJWQiDaQlkAABN',
        character: 'Tiny warlord',
      },
      {
        realName: 'Student 2434',
        socketId: 'N6C2lemQD7-xNWp0AABR',
        character: 'Perfectionist dentist',
      },
    ],
    conversation: [
      ['student1', 'wus good'],
      ['student2', 'hi!'],
    ],
    startTime: '12:16 PM',
  },
  {
    mode: PAIRED,
    chatId: 'V8XB9Bngez89zaBWAABV#oqNvcYw0MLfU_HAtAABZ',
    studentPair: [
      {
        realName: 'Student 7570',
        socketId: 'V8XB9Bngez89zaBWAABV',
        character: 'Pirate captain',
      },
      {
        realName: 'Student 5072',
        socketId: 'oqNvcYw0MLfU_HAtAABZ',
        character: 'Dance teacher',
      },
    ],
    conversation: [
      ['student1', 'how r u'],
      ['student2', 'yo'],
    ],
    startTime: '12:16 PM',
  },
  {
    mode: PAIRED,
    chatId: 'mmO7LO7b1aMp4SwkAABd#sqL6DHyk0WWCfwJ_AABh',
    studentPair: [
      {
        realName: 'Student 9997',
        socketId: 'mmO7LO7b1aMp4SwkAABd',
        character: 'Dance teacher',
      },
      {
        realName: 'Student 2154',
        socketId: 'sqL6DHyk0WWCfwJ_AABh',
        character: 'Party planner',
      },
    ],
    conversation: [['student2', 'yo']],
    startTime: '12:19 PM',
  },

  {
    mode: PAIRED,
    chatId: '8DmBxTmt0Q_iUbbxAAAn#Ua_hGB2pSD-6CGvdAAAP12',
    studentPair: [
      {
        realName: 'Student 1797',
        socketId: '8DmBxTmt0Q_iUbbxAAAn',
        character: 'Tiny warlord',
      },
      {
        realName: 'Student 2958',
        socketId: 'Ua_hGB2pSD-6CGvdAAAP',
        character: 'Forgetful surgeon',
      },
    ],
    conversation: [
      ['student1', 'hey!'],
      ['student2', 'yooo'],
    ],
    startTime: '12:16 PM',
  },
  {
    mode: PAIRED,
    chatId: 'bMHZDSrQ_Oj-XukgAABF#PauZMgihsO1fIaG0AABJ12',
    studentPair: [
      {
        realName: 'Student 4307',
        socketId: 'bMHZDSrQ_Oj-XukgAABF',
        character: 'Dance teacher',
      },
      {
        realName: 'Student 9654',
        socketId: 'PauZMgihsO1fIaG0AABJ',
        character: 'Perfectionist dentist',
      },
    ],
    conversation: [
      ['student1', 'hola'],
      ['student2', 'hey'],
    ],
    startTime: '12:16 PM',
  },
  {
    mode: PAIRED,
    chatId: 'NGAuHeC2kJgGf6voAAAl#-vIO1Gi-LTkR3u2HAAAx12',
    studentPair: [
      {
        realName: 'Student 5305',
        socketId: 'NGAuHeC2kJgGf6voAAAl',
        character: 'Perfectionist dentist',
      },
      {
        realName: 'Student 1133',
        socketId: '-vIO1Gi-LTkR3u2HAAAx',
        character: 'Tiny warlord',
      },
    ],
    conversation: [
      ['student1', 'wats up'],
      ['student2', 'hello'],
    ],
    startTime: '12:16 PM',
  },
  {
    mode: PAIRED,
    chatId: '5XFUQ0oJWQiDaQlkAABN#N6C2lemQD7-xNWp0AABR12',
    studentPair: [
      {
        realName: 'Student 5296',
        socketId: '5XFUQ0oJWQiDaQlkAABN',
        character: 'Tiny warlord',
      },
      {
        realName: 'Student 2434',
        socketId: 'N6C2lemQD7-xNWp0AABR',
        character: 'Perfectionist dentist',
      },
    ],
    conversation: [
      ['student1', 'wus good'],
      ['student2', 'hi!'],
    ],
    startTime: '12:16 PM',
  },
];
