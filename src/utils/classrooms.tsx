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

export function getRandom<T>(list: Array<T>): T {
  return list[Math.floor(Math.random() * list.length)];
}

export const sampleClassroomName = classrooms[0].classroomName;
