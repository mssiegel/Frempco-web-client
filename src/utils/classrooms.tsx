import Filter from 'bad-words';

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

export function currentTime() {
  return new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
}

export function filterWords(words: string) {
  const filter = new Filter();
  try {
    return filter.clean(words);
    // the filter throws an error if the string only has non-letter characters
  } catch (e) {
    return words;
  }
}

export function scrollDown(refObject) {
  if (refObject.current)
    refObject.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export const testClassroomName = classrooms[0].classroomName;

export interface ClassroomProps {
  classroomName: string;
}

export interface Student {
  socketId: string;
  realName: string;
  character?: string;
}
