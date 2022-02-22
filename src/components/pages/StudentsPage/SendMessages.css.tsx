import { css } from '@emotion/react';

const characterName = css`
  text-align: center;
  border-radius: 20px;
  border: 2px solid lightgrey;
  height: 40px;
  font-weight: bold;
  color: #0070ff;
  font-size: 16px;
  width: 210px;

  :focus {
    outline: none;
    border: 3px solid deepskyblue;
  }
`;

const message = css`
  border-radius: 20px;
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

const peerIsTyping = css`
  padding: 5px 10px;
  margin-bottom: 0;
  text-align: left;
  font-size: 16px;
  color: #aaa;
  font-style: italic;
`;

const sendMessagesCSS = { characterName, message, peerIsTyping };

export default sendMessagesCSS;
