// Custom socket events use `actor:action-object` with kebab-case after the
// colon. Use imperative verbs for commands/requests, past-tense or result
// wording for notifications, and leave Socket.IO built-ins like `connect` and
// `disconnect` as-is.
export const CLIENT_EMIT_EVENTS = {
  STUDENT_END_PAIRED_CHAT: 'student:end-paired-chat',
  STUDENT_END_SOLO_CHAT: 'student:end-solo-chat',
  STUDENT_JOIN_ACTIVITY: 'student:join-activity',
  STUDENT_LEFT_PAGE: 'student:left-page',
  STUDENT_REFRESHED_PAGE: 'student:refreshed-page',
  STUDENT_REJOIN_PAIRED_CHAT: 'student:rejoin-paired-chat',
  STUDENT_REJOIN_SOLO_CHAT: 'student:rejoin-solo-chat',
  STUDENT_SEND_PAIRED_MESSAGE: 'student:send-paired-message',
  STUDENT_SEND_SOLO_MESSAGE: 'student:send-solo-message',
  STUDENT_SEND_TYPING: 'student:send-typing',
  TEACHER_CREATE_ACTIVITY: 'teacher:create-activity',
  TEACHER_END_PAIRED_CHAT: 'teacher:end-paired-chat',
  TEACHER_END_SOLO_CHAT: 'teacher:end-solo-chat',
  TEACHER_LEAVE_ACTIVITY: 'teacher:leave-activity',
  TEACHER_PAIR_STUDENTS: 'teacher:pair-students',
  TEACHER_REMOVE_UNPAIRED_STUDENT_FROM_ACTIVITY:
    'teacher:remove-unpaired-student-from-activity',
  TEACHER_SET_REAL_NAME_REVEAL: 'teacher:set-real-name-reveal',
  TEACHER_START_SOLO_CHAT: 'teacher:start-solo-chat',
} as const;
