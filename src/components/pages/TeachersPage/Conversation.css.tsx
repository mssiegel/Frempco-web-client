import { css } from '@emotion/react';

const introText = css`
  font-style: italic;
  color: gray;
  margin-bottom: 5px;
`;

const student1 = css`
  font-weight: bold;
  color: #0070ff;
`;

const student2 = css`
  font-weight: bold;
  color: red;
`;

const teacher = css`
  font-weight: bold;
  color: purple;
`;

const msg = css`
  word-break: break-word;
`;

const conversationCSS = {
  introText,
  student1,
  student2,
  teacher,
  msg,
};

export default conversationCSS;
