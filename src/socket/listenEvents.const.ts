// Custom socket events use `actor:action-object` with kebab-case after the
// colon. Use imperative verbs for commands/requests, past-tense or result
// wording for notifications, and leave Socket.IO built-ins like `connect` and
// `disconnect` as-is.
export const CLIENT_LISTEN_EVENTS = {
  PAIRED_CHAT_ENDED: 'paired-chat:ended',
  PAIRED_CHAT_ENDED_AFTER_DISCONNECT: 'paired-chat:ended-after-disconnect',
  PAIRED_CHAT_PEER_DISCONNECTED: 'paired-chat:peer-disconnected',
  PAIRED_CHAT_PEER_RECONNECTED: 'paired-chat:peer-reconnected',
  PAIRED_CHAT_STARTED: 'paired-chat:started',
  PEER_TYPING: 'peer:typing',
  SOLO_CHAT_MESSAGES_ADDED: 'solo-chat:messages-added',
  STUDENT_DISCONNECTED_FROM_SOLO_CHAT: 'student:disconnected-from-solo-chat',
  STUDENT_ENDED_CHAT: 'student:ended-chat',
  STUDENT_JOINED_ACTIVITY: 'student:joined-activity',
  STUDENT_LEFT_ACTIVITY: 'student:left-activity',
  STUDENT_PEER_ENDED_CHAT: 'student:peer-ended-chat',
  STUDENT_REMOVED_FROM_ACTIVITY: 'student:removed-from-activity',
  STUDENT_SENT_PAIRED_MESSAGE: 'student:sent-paired-message',
  STUDENT_SENT_PAIRED_MESSAGE_TO_TEACHER:
    'student:sent-paired-message-to-teacher',
  TEACHER_ENDED_PAIRED_CHAT: 'teacher:ended-paired-chat',
  TEACHER_ENDED_SOLO_CHAT: 'teacher:ended-solo-chat',
  TEACHER_SET_PEER_REAL_NAME_REVEAL: 'teacher:set-peer-real-name-reveal',
  TEACHER_STARTED_SOLO_CHAT: 'teacher:started-solo-chat',
} as const;
