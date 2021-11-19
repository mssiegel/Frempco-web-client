import classrooms from 'data/classrooms.json'

export function getAllClassroomNames() {
  return classrooms.map(({classroomName: name}) => (
    {
      params: {
        name
      }
    }
  ));
}