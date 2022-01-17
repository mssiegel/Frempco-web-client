import Head from 'next/head';

import { getAllClassroomNames, ClassroomProps } from '@utils/classrooms';
import Layout from '@components/shared/Layout';
import TeachersPage from '@components/pages/TeachersPage';

export async function getStaticPaths() {
  const paths = getAllClassroomNames();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      classroomName: params.classroomName,
    },
  };
}

export default function TeacherDashboard({ classroomName }: ClassroomProps) {
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
