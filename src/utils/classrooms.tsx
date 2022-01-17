import classrooms from 'data/classrooms.json';

export function getAllClassroomNames() {
  return classrooms.map(({ classroomName }) => ({
    params: {
      classroomName,
    },
  }));
}

export function getClassroom(classroom: string) {
  return classrooms.find(({ classroomName }) => classroomName === classroom);
}

export function getRandom<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function swap<T>(arr: Array<T>, i1: number, i2: number) {
  const temp = arr[i2];
  arr[i2] = arr[i1];
  arr[i1] = temp;
}

export const sampleClassroomName = classrooms[0].classroomName;

export interface ClassroomProps {
  classroomName: string;
}
