import { css } from '@emotion/react';

const teacherName = css`
  text-align: center;
  color: purple;
  font-weight: bold;
  font-size: 18px;
`;

// TODO: This "message" css is identical to the one in StudentsPage/SendMessages.css.  It can be refactored to be only defined once.
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

const sendMessagesCSS = { teacherName, message };

export default sendMessagesCSS;
