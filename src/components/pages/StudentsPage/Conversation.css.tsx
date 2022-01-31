import { css } from '@emotion/react';

const introText = css`
  font-style: italic;
  color: gray;
  margin-bottom: 10px;
`;

const you = css`
  font-weight: bold;
  color: #0070ff;
`;

const peer = css`
  font-weight: bold;
  color: red;
`;

const conversationCSS = {
  introText,
  peer,
  you,
};

export default conversationCSS;
