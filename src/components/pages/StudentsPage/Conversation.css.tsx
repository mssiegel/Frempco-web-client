import { css } from '@emotion/react';

const you = css`
  font-weight: bold;
  color: #0070ff;
`;

const peer = css`
  font-weight: bold;
  color: red;
`;

const msg = css`
  word-break: break-word;
`;

const conversationCSS = {
  peer,
  you,
  msg,
};

export default conversationCSS;
