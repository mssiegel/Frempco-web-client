import { Box, Fab, Icon, InputBase, useMediaQuery } from '@mui/material';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { Socket } from 'socket.io-client';

import { PAIRED } from '@utils/classrooms';
import { StudentPairedChat, StudentSoloChat } from '../index';

interface SendMessageSectionProps {
  socket: Socket;
  chat: StudentPairedChat | StudentSoloChat;
  setChat: Dispatch<SetStateAction<StudentPairedChat | StudentSoloChat>>;
  setPeerIsTyping: Dispatch<SetStateAction<boolean>>;
}

export default function SendMessageSection({
  socket,
  chat,
  setChat,
  setPeerIsTyping,
}: SendMessageSectionProps) {
  const typeMessageInput = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState('');
  const isDesktop = useMediaQuery('(hover: hover) and (pointer: fine)');

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

  function sendWithEnterOnDesktop(
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (!isDesktop) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <>
      <Box
        component='form'
        onSubmit={sendMessage}
        sx={{
          borderRadius: '24px',
          border: '1px solid',
          borderColor: 'neutrals.200',
          minHeight: '50px',
          mt: 1,
          mx: 1,
          px: 0.5,
          py: 0.5,
          display: 'flex',
          '&:focus-within': {
            border: '1px solid',
            borderColor: 'primary.500',
          },
        }}
      >
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
          onKeyDown={sendWithEnterOnDesktop}
          autoFocus
          inputRef={typeMessageInput}
          sx={{
            flex: 1,
            fontSize: '18px',
            px: 1,
          }}
        />

        <Fab
          size='small'
          type='submit'
          color='primary'
          sx={{ alignSelf: 'flex-end' }}
        >
          <Icon sx={{ fontSize: 24 }}>send</Icon>
        </Fab>
      </Box>
    </>
  );
}
