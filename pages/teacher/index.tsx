import Head from 'next/head';

import Layout from '@components/shared/Layout';
import TeachersPage from '@components/pages/TeachersPage';
import { SocketProvider } from '@contexts/SocketContext';

export default function TeacherDashboard() {
  return (
    <Layout>
      <Head>
        <title>Frempco - Teacher dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <SocketProvider>
        <TeachersPage />
      </SocketProvider>
    </Layout>
  );
}
