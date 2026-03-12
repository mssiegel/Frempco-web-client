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

const chatEndedInfo = css`
  border-top: 1px dashed grey;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 32px;
  color: #87002a;
  font-style: italic;
  opacity: 0.7;

  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

const peerIsTyping = css`
  padding: 5px 10px 5px 17px;
  text-align: left;
  font-size: 16px;
  color: #aaa;
  font-style: italic;
`;

const sendMessagesCSS = {
  message,
  peerIsTyping,
  chatEndedInfo,
};

export default sendMessagesCSS;
