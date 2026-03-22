import { css } from '@emotion/react';

const chatboxContainer = css`
  max-width: 600px;
  border-radius: 10px;
  overflow: hidden;
`;

const buttonsContainer = css`
  background: #ffdd9a;
  padding: 10px;
  display: flex;
  justify-content: space-around;
`;

const chatboxCSS = {
  chatboxContainer,
  buttonsContainer,
};

export default chatboxCSS;
