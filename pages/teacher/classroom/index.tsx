import Head from 'next/head';

import Layout from '@components/shared/Layout';
import TeachersPage from '@components/pages/TeachersPage';

export default function TeacherPage() {
  return (
    <Layout>
      <Head>
        <title>Frempco - Teachers page</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <TeachersPage />
    </Layout>
  );
}
