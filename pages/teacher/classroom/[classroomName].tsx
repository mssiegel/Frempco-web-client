import Head from 'next/head';
import { Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';

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
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const socket = useContext(SocketContext);
  const [isActiveClassroom, setIsActiveClassroom] = useState(false);

  async function activateClassroom() {
    const postResponse = await fetch(`${apiUrl}/classrooms/${classroomName}`, {
      method: 'POST',
    });
    const { isActive } = await postResponse.json();
    setIsActiveClassroom(isActive);
  }

  async function deactivateClassroom() {
    const postResponse = await fetch(`${apiUrl}/classrooms/${classroomName}`, {
      method: 'DELETE',
    });
    const { isActive } = await postResponse.json();
    setIsActiveClassroom(isActive);
  }

  return (
    <Layout>
      <Head>
        <title>Frempco - Teacher dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Typography variant='h4' sx={{ color: 'white' }}>
          Hello teacher! Welcome to your classroom: {classroomName}
        </Typography>
        <Typography variant='h4' sx={{ color: 'white' }}>
          Your socket ID is {socket?.id ?? 'NO SOCKET FOUND'}
        </Typography>
        {isActiveClassroom ? (
          <Button
            variant='contained'
            size='large'
            color='warning'
            startIcon={<PowerOffIcon />}
            onClick={deactivateClassroom}
          >
            Deactivate classroom
          </Button>
        ) : (
          <Button
            variant='contained'
            size='large'
            startIcon={<PowerIcon />}
            onClick={activateClassroom}
          >
            Activate classroom
          </Button>
        )}
      </main>
    </Layout>
  );
}
