import { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

import { ClassroomProps, Student, currentTime } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import Chatbox from './Chatbox';
import UnpairedStudentsList from './UnpairedStudentsList';
import PairedStudentsList from './PairedStudentsList';
import ActivateButton from './ActivateButton';
import { useRouter } from 'next/router';

type StudentPair = [Student, Student];

type ChatMessage = ['student1' | 'student2', string, string];

interface StudentChat {
  chatId: string;
  studentPair: StudentPair;
  conversation: ChatMessage[];
  startTime: string;
}

const EXAMPLE_CHATS = [
  {
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
      ['student1', 'Forgetful surgeon', 'hello!'],
      ['student1', 'Forgetful surgeon', 'how r u'],
      ['student2', 'Tiny warlord', 'good u??'],
      ['student1', 'Forgetful surgeon', 'good!'],
      ['student1', 'Forgetful surgeon', 'wat kind of phone do u have'],
      ['student2', 'Tiny warlord', 'android!'],
      ['student1', 'Forgetful surgeon', 'wow!'],
      ['student2', 'Tiny warlord', 'pretty cool hey '],
      ['student1', 'Forgetful surgeon', 'no'],
      ['student1', 'Forgetful surgeon', 'boooo'],
    ],
    startTime: '12:16 PM',
  },
  {
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
      ['student1', 'Dance teacher', 'hola'],
      ['student2', 'Perfectionist dentist', 'hey'],
    ],
    startTime: '12:16 PM',
  },
  {
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
      ['student1', 'Perfectionist dentist', 'wats up'],
      ['student2', 'Tiny warlord', 'hello'],
    ],
    startTime: '12:16 PM',
  },
  {
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
      ['student1', 'Tiny warlord', 'wus good'],
      ['student2', 'Perfectionist dentist', 'hi!'],
    ],
    startTime: '12:16 PM',
  },
  {
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
      ['student1', 'Pirate captain', 'how r u'],
      ['student2', 'Dance teacher', 'yo'],
    ],
    startTime: '12:16 PM',
  },
  {
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
    conversation: [['student2', 'Party planner', 'yo']],
    startTime: '12:19 PM',
  },

  {
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
      ['student1', 'Tiny warlord', 'hey!'],
      ['student2', 'Forgetful surgeon', 'yooo'],
    ],
    startTime: '12:16 PM',
  },
  {
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
      ['student1', 'Dance teacher', 'hola'],
      ['student2', 'Perfectionist dentist', 'hey'],
    ],
    startTime: '12:16 PM',
  },
  {
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
      ['student1', 'Perfectionist dentist', 'wats up'],
      ['student2', 'Tiny warlord', 'hello'],
    ],
    startTime: '12:16 PM',
  },
  {
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
      ['student1', 'Tiny warlord', 'wus good'],
      ['student2', 'Perfectionist dentist', 'hi!'],
    ],
    startTime: '12:16 PM',
  },
];

export default function TeachersPage({ classroomName }: ClassroomProps) {
  const router = useRouter();

  const socket = useContext(SocketContext);
  console.log('Teacher socketId:', socket?.id ?? 'No socket found');

  const [unpairedStudents, setUnpairedStudents] = useState<Student[]>([]);
  const [displayedChat, setDisplayedChat] = useState('');
  const [studentChats, setStudentChats] = useState<StudentChat[]>([
    // {
    //   chatId: 'as343da11sf#as31afdsf',
    //   studentPair: [
    //     { socketId: 'as343da11sf', realName: 'Sam', character: 'pirate' },
    //     { socketId: 'as31afdsf', realName: 'Rachel', character: 'dentist' },
    //   ],
    //   conversation: [
    //     ['student1', 'vampire', 'i need blood'],
    //     ['student2', 'wizard', 'i will cast a spell to make some'],
    //   ],
    //   startTime: '',
    // },
  ]);

  useEffect(() => {
    if (socket) {
      socket.on('chat started - two students', ({ chatId, studentPair }) => {
        if (studentChats.length === 0) setDisplayedChat(chatId);
        setStudentChats((chats) => [
          ...chats,
          { chatId, studentPair, conversation: [], startTime: currentTime() },
        ]);
      });

      socket.on('student chat unpaired', ({ chatId, student1, student2 }) => {
        setStudentChats((chats) =>
          chats.filter((chat) => chat.chatId !== chatId),
        );
        setUnpairedStudents((unpaired) => [...unpaired, student1, student2]);
      });
    }

    return () => {
      if (socket) {
        socket.off('chat started - two students');
        socket.off('student chat unpaired');
      }
    };
  }, [socket, studentChats.length]);

  useEffect(() => {
    if (socket) {
      socket.on('chat ended - two students', ({ chatId, student2 }) => {
        // remove the chat
        setStudentChats((chats) =>
          chats.filter((chat) => chat.chatId !== chatId),
        );

        // add the student who remains back into unpaired student list
        setUnpairedStudents((unpaired) => [...unpaired, student2]);
      });

      socket.on(
        'student chat message',
        ({ character, message, socketId, chatId }) => {
          setStudentChats((studentChats) => {
            const chats = [...studentChats];
            const chatIndex = chats.findIndex((chat) => chat.chatId === chatId);
            if (chatIndex === -1) return studentChats;

            const chat = chats[chatIndex];

            const student =
              chat.studentPair[0].socketId === socketId
                ? 'student1'
                : 'student2';

            const newMessage: ChatMessage = [student, character, message];

            const updatedChat = {
              ...chat,
              conversation: [...chat.conversation, newMessage],
            };

            chats[chatIndex] = updatedChat;

            return chats;
          });
        },
      );
    }

    const handleRouteChange = (url, { shallow }) => {
      socket.emit('user disconnected');
    };
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      socket.off('chat ended - two students');
      socket.off('student chat message');
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, socket]);

  function showDisplayedChat() {
    const chat = studentChats.find((chat) => chat.chatId === displayedChat);
    if (!chat) return null;

    return <Chatbox chat={chat} showCopyButton={true} />;
  }

  return (
    <main>
      <Typography variant='h4' sx={{ color: 'white' }}>
        Hello teacher! Welcome to your classroom: {classroomName}
      </Typography>

      <ActivateButton socket={socket} classroomName={classroomName} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <UnpairedStudentsList
            socket={socket}
            unpairedStudents={unpairedStudents}
            setUnpairedStudents={setUnpairedStudents}
          />
          <PairedStudentsList
            studentChats={studentChats}
            setDisplayedChat={setDisplayedChat}
            displayedChat={displayedChat}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          {showDisplayedChat()}
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2} pb={2}>
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ color: 'white' }}>
            Click to view full chat
          </Typography>
        </Grid>
        {/* change to studentChats.map() to view actual chats  */}
        {EXAMPLE_CHATS.map((chat, i) => {
          // alter chat here to only have last 5 messages
          return (
            <Grid
              key={i}
              item
              xs={12}
              md={6}
              lg={3}
              style={{ cursor: 'pointer' }}
            >
              <Chatbox chat={chat} showCopyButton={false} />
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
}
