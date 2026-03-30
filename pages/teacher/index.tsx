import Head from 'next/head';

import Layout from '@components/shared/Layout';
import TeachersPage from '@components/pages/TeachersPage';
import { useRouter } from 'next/router';

export default function TeacherDashboard() {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Frempco - Teacher dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <TeachersPage />
    </Layout>
  );
}
