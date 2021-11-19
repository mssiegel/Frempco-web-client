import { Typography } from '@mui/material';
import Head from 'next/head';

import Link from '@utilComponents/Link'
import Layout from '@components/Layout'
import classrooms from 'data/classrooms.json'

export default function Home() {
  const sampleClassroomName = classrooms[0].classroomName

  return (
    <Layout>
        <Head>
          <title>Frempco</title>
          <meta name='description' content='Frempco lets teachers pair up classmates for text-based improvised chats. Students build up real-world friendships through collaboration and storytelling.' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main>
          <Typography variant='h1' sx={{ color: (theme) => theme.palette.common.white }}>
            Welcome to Frempco!
          </Typography>
          <Typography variant ='h3' sx={{m: 5}}>
            <Link href={`/teacher/classroom/${sampleClassroomName}`}>
              Visit Teachers admin page
            </Link>
          </Typography>
          <Typography variant ='h3' sx={{m: 5}}>
            <Link href={`/student/classroom/${sampleClassroomName}`}>
              Visit Students classroom page
            </Link>
          </Typography>
        </main>
    </Layout>
  );
}
