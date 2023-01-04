import Head from 'next/head';

import Layout from '@components/shared/Layout';
import HomePage from '@components/pages/HomePage/index';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Frempco</title>
        <meta
          name='description'
          content='Frempco helps teachers improve learning outcomes by guiding students through educational role-play exercises.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomePage />
    </Layout>
  );
}
