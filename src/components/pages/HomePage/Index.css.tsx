import { css } from '@emotion/react';

const exampleChat = css`
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 500px;

  @media (max-width: 500px) {
    width: 100%;
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
