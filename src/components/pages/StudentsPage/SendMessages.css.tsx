import { css } from '@emotion/react';

const message = css`
  border-radius: 24px;
  border: 2px solid lightgrey;
  height: 50px;
  margin-top: 8px;
  width: 84%;
  font-size: 17px;
  padding-left: 20px;

  :focus {
    outline: none;
    border: 3px solid deepskyblue;
  }
`;

const sendMessagesCSS = {
  message,
};

export default sendMessagesCSS;
