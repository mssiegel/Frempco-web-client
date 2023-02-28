import Head from 'next/head';

import { getAllClassroomNames, ClassroomProps } from '@utils/classrooms';
import Layout from '@components/shared/Layout';
import TeachersPage from '@components/pages/TeachersPage';
import { useRouter } from 'next/router';

export default function TeacherDashboard() {
  const router = useRouter();
  const classroomName = router.query.classroomName as string;

  return (
    <Layout>
      <Head>
        <title>Frempco - Teacher dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <TeachersPage classroomName={classroomName} />
    </Layout>
  );
}
