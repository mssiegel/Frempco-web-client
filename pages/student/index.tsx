import Head from 'next/head';

import Layout from '@components/shared/Layout';
import StudentsPage from '@components/pages/StudentsPage';
import { SocketProvider } from '@contexts/SocketContext';

export default function StudentPage() {
  return (
    <Layout>
      <Head>
        <title>Frempco - Student page</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <SocketProvider>
        <StudentsPage />
      </SocketProvider>
    </Layout>
  );
}
