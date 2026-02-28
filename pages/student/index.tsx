import Head from 'next/head';

import Layout from '@components/shared/Layout';
import StudentsPage from '@components/pages/StudentsPage';

export default function StudentPage() {
  return (
    <Layout>
      <Head>
        <title>Frempco - Student page</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <StudentsPage />
    </Layout>
  );
}
