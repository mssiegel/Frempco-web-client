/** @jsxImportSource @emotion/react */

import Chatbox from '@components/pages/TeachersPage/Chatbox';

export default function ExampleChat() {
  const chat = {
    chatId: 'homepage sample chat',
    studentPair: [
      {
        socketId: '343d11sf',
        realName: 'Sam Carlome',
        character: 'Perfectionist Dentist',
      },
      {
        socketId: 'as31afsf',
        realName: 'Jessica Placard',
        character: 'Party Planner',
      },
    ],
    conversation: [
      ['student1', 'Perfectionist Dentist', "I'm gonna be a dentist!!!"],
      ['student2', 'Party Planner', 'This calls for a party!!!!!'],
      ['student1', 'Perfectionist Dentist', 'yessss!!'],
      ['student1', 'Perfectionist Dentist', 'I am so excited!'],
      ['student2', 'Party Planner', "let's celebrate with chocolate cake"],
      ['student1', 'Perfectionist Dentist', "NO! that isn't healthy"],
    ],
    startTime: '',
  };

  return (
    <>
      <Chatbox chat={chat} showCopyButton={true} selected={false} />
    </>
  );
}
