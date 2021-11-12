import Head from 'next/head'
import { Typography } from '@mui/material';

import { getAllClassroomNames } from 'utils/classrooms';
import Layout from 'components/Layout';

export async function getStaticPaths() {
  const paths = getAllClassroomNames()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      name: params.name
    }
  }
}

export default function MyComponent({name}) {
  return (
    <Layout>
      <Head>
        <title>Frempco - Teacher admin</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Typography variant='h3' sx={{ color: (theme) => theme.palette.common.white }}>
          Hello teacher! Welcome to your admin page for your classroom named {name}!
        </Typography>
      </main>
    </Layout>
  )
}