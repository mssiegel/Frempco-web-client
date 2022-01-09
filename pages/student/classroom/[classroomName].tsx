import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { getAllClassroomNames } from '@utils/classrooms';
import Layout from '@components/shared/Layout';
import { SocketContext } from '@contexts/SocketContext';
import Chatbox from '@components/pages/StudentsPage/Chatbox';

export async function getStaticPaths() {
  const paths = getAllClassroomNames();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      classroomName: params.classroomName,
    },
  };
}

function currentTime() {
  return new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
}

export default function StudentClassroom({ classroomName }) {
  const socket = useContext(SocketContext);

  const [chatInSession, setChatInSession] = useState(true); //false);
  const [chat, setChat] = useState({
    you: '',
    peer: '',
    conversation: [
      ['you', 'vampire', 'i need blood'],
      ['peer', 'wizard', 'i will cast a spell to make some'],
    ],
    startTime: '',
  });
  const [realChat, setRealChat] = useState<string[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on('chat start', ({ peersName }) => {
        setChat((chat) => ({
          ...chat,
          peer: peersName,
          startTime: currentTime(),
        }));
        setChatInSession(true);
      });
    }

    return () => {
      if (socket) {
        socket.off('chat start');
      }
    };
  });

  return (
    <Layout>
      <Head>
        <title>Frempco - Student classroom</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Typography variant='h3' sx={{ color: 'white', mb: 4 }}>
          Hello student! Welcome to your classroom named {classroomName}! Your
          socket ID is {socket?.id ?? 'NO SOCKET FOUND'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {chatInSession && <Chatbox chat={chat} />}
        </Box>
      </main>
    </Layout>
  );
}
