import Head from 'next/head';

import Layout from '@components/shared/Layout';
import StudentsPage from '@components/pages/StudentsPage';
import { useRouter } from 'next/router';

export default function StudentPage() {
  const router = useRouter();
  const classroomName = router.query.classroomName as string;

  return (
    <Layout>
      <Head>
        <title>Frempco - Student page</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <StudentsPage classroomName={classroomName} />
    </Layout>
  );
}
