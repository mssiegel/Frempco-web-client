import { Box, Fab, Icon, InputBase } from '@mui/material';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { Socket } from 'socket.io-client';

import { PAIRED } from '@utils/classrooms';
import { StudentPairedChat, StudentSoloChat } from './index';

interface SendMessagesProps {
  socket: Socket;
  chat: StudentPairedChat | StudentSoloChat;
  setChat: Dispatch<SetStateAction<StudentPairedChat | StudentSoloChat>>;
  setPeerIsTyping: Dispatch<SetStateAction<boolean>>;
}

export default function SendMessages({
  socket,
  chat,
  setChat,
  setPeerIsTyping,
}: SendMessagesProps) {
  const typeMessageInput = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState('');

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message) {
      setChat(
        (chat) =>
          ({
            ...chat,
            conversation: [...chat.conversation, ['you', message]],
          } as StudentPairedChat | StudentSoloChat),
      );
      setMessage('');
      typeMessageInput.current?.focus();

      if (!socket) return;

      if (chat.mode === PAIRED) {
        socket.emit('student sent message', { message });
      } else {
        setPeerIsTyping(true);
        socket.emit(
          'solo mode: student sent message',
          {
            message,
          },
          ({ chatbotReplyMessages }) => {
            setPeerIsTyping(false);

            if (chatbotReplyMessages && chatbotReplyMessages.length > 0) {
              setChat(
                (chat) =>
                  ({
                    ...chat,
                    conversation: [
                      ...chat.conversation,
                      ...chatbotReplyMessages,
                    ],
                  } as StudentPairedChat | StudentSoloChat),
              );
            }
          },
        );
      }
    }
  }

  function sendUserIsTyping(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setMessage(e.target.value);
    socket.emit('student typing');
  }

  return (
    <Box>
      <form onSubmit={sendMessage}>
        <Box sx={{ textAlign: 'center' }}>
          <InputBase
            value={message}
            placeholder={`Talk as ${chat.characters.you}...`}
            multiline
            minRows={1}
            maxRows={6}
            inputProps={{
              maxLength: chat.mode === PAIRED ? 75 : 120,
            }}
            onChange={sendUserIsTyping}
            autoFocus
            inputRef={typeMessageInput}
            sx={{
              borderRadius: '24px',
              border: '2px solid lightgrey',
              minHeight: '50px',
              mt: 1,
              width: '84%',
              fontSize: '17px',
              px: 2.5,
              py: 1,
              '&.Mui-focused': {
                border: '3px solid deepskyblue',
              },
            }}
          />

          <Fab
            size='small'
            type='submit'
            color='primary'
            style={{ marginLeft: '10px' }}
          >
            <Icon sx={{ fontSize: 24 }}>send</Icon>
          </Fab>
        </Box>
      </form>
    </Box>
  );
}
