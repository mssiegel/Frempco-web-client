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

export default function TeacherDashboard({ classroomName }) {
  const socket = useContext(SocketContext);

  return (
    <Layout>
      <Head>
        <title>Frempco - Teacher dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Typography
          variant='h3'
          sx={{ color: (theme) => theme.palette.common.white }}
        >
          Hello teacher! Welcome to your dashboard for your classroom named{' '}
          {classroomName}! Your socket ID is {socket?.id ?? 'NO SOCKET FOUND'}
        </Typography>
      </main>
    </Layout>
  );
}
