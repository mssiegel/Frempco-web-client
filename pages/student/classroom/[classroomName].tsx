import Head from 'next/head';
import { Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { getAllClassroomNames } from '@utils/classrooms';
import Layout from '@components/shared/Layout';
import { SocketContext } from '@contexts/SocketContext';

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

export default function StudentClassroom({ classroomName }) {
  const socket = useContext(SocketContext);
  // TODO: GET A CHAT STARTED HERE ON STUDENT PAGE

  const [chatInSession, setChatInSession] = useState(false);
  const [chat, setChat] = useState({ you: '', peer: '', conversation: [] });
  const [realChat, setRealChat] = useState<string[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on('chat start', ({ peersName }) => {
        setChat((chat) => ({ ...chat, peer: peersName }));
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
        {chatInSession && (
          <div>
            <Typography variant='h3' sx={{ color: 'white' }}>
              Chat started with {chat.peer || 'unknown peer'}
            </Typography>
          </div>
        )}
      </main>
    </Layout>
  );
}
