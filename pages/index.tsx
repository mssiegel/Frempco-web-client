import Head from 'next/head';

import Layout from '@components/shared/Layout';
import HomePage from '@components/pages/HomePage/index';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Frempco: A Classroom Activity that Students Love</title>
        <meta
          name='description'
          content='Make Learning come alive through Role Play. Loved by Teachers and Students alike.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomePage />
    </Layout>
  );
}
