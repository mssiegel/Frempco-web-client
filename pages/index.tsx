import Head from 'next/head';

import Layout from '@components/shared/Layout';
import HomePage from '@components/pages/HomePage/index';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Frempco - A Learning Game for the Classroom</title>
        <meta
          name='description'
          content='A classroom game that excites both teachers and students. Classmates use role-playing to learn better.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomePage />
    </Layout>
  );
}
