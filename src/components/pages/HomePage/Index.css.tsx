import { css } from '@emotion/react';

const exampleChat = css`
  position: relative;
  height: 50vh;

  @media (max-width: 500px) {
    height: 40vh;
  }
`;

const exampleOverview = css`
  position: relative;
  height: 75vh;

  @media (max-width: 500px) {
    height: 30vh;
  }
`;

const finalTextBox = css`
  max-width: 500px;
  margin: auto;
`;

const homepageCSS = {
  exampleChat,
  exampleOverview,
  finalTextBox,
};

export default homepageCSS;
