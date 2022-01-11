import Head from 'next/head';

import { getAllClassroomNames } from '@utils/classrooms';
import Layout from '@components/shared/Layout';
import StudentsPage from '@components/pages/StudentsPage';

interface StudentClassroomProps {
  classroomName: string;
}

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

export default function StudentClassroom({
  classroomName,
}: StudentClassroomProps) {
  return (
    <Layout>
      <Head>
        <title>Frempco - Student classroom</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <StudentsPage classroomName={classroomName} />
    </Layout>
  );
}
