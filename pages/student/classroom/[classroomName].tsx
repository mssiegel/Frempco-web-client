import Head from 'next/head';
import { Typography } from '@mui/material';
import { useContext } from 'react';

import { getAllClassroomNames } from '@utils/classrooms';
import Layout from '@components/Layout';
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
  socket.emit('test event');

  return (
    <Layout>
      <Head>
        <title>Frempco - Student classroom</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Typography
          variant='h3'
          sx={{ color: (theme) => theme.palette.common.white }}
        >
          Hello student! Welcome to your classroom named {classroomName}! Your
          socket ID is {socket?.id ?? 'NO SOCKET FOUND'}
        </Typography>
      </main>
    </Layout>
  );
}
