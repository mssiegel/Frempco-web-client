import Head from 'next/head';

import { getAllClassroomNames, ClassroomProps } from '@utils/classrooms';
import Layout from '@components/shared/Layout';
import StudentsPage from '@components/pages/StudentsPage';

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

export default function StudentPage({ classroomName }: ClassroomProps) {
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
