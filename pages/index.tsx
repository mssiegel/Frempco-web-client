import Head from 'next/head';
import Layout from '@components/shared/Layout';
import HomePage from '../src/components/pages/HomePage';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Frempco</title>
        <meta
          name='description'
          content='Frempco lets teachers pair up classmates for text-based improvised chats. Students build up real-world friendships through collaboration and storytelling.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomePage />
    </Layout>
  );
}
