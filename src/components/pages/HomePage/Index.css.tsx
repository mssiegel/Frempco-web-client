import { css } from '@emotion/react';

const frempcoHeading = css`
  margin-left: 10%;

  @media (max-width: 500px) {
    margin-left: 0;
  }
`;

const firstPageContainer = css`
  height: 45vh;

  @media (max-width: 500px) {
    height: unset;
  }
`;

const subjectMatter = css`
  @media (max-width: 500px) {
    text-align: center;
  }
`;

const blankContainer = css`
  background-color: #eeeeee;
  height: 45vh;
  

  @media (max-width: 500px) {
    height: 50px;
  }
`;

const exampleChat = css`
  position: relative;
  height: 50vh;
  width: auto;

  @media (max-width: 500px) {
    height: 40vh;
  }
`;

const exampleChatText = css`
  text-align: center;
  width: 80%;
  margin: auto;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const exampleOverview = css`
  position: relative;
  height: 75vh;
  width: auto;

  @media (max-width: 500px) {
    height: 30vh;
  }
`;

const finalTextBox = css`
  width: 500px;
  min-width: 500px;
  height: 45vh;
  margin: auto;

  @media (max-width: 500px) {
    width: 100%;
    min-width: unset;
  }
`;

const contact = css`
  width: 80%;
  text-align: center;
  margin: auto;
  margin-top: 32px;

  @media (max-width: 500px) {
    margin-top: 64px;
    width: 100%;
  }
`;

const homepageCSS = {
  frempcoHeading,
  firstPageContainer,
  subjectMatter,
  blankContainer,
  exampleChat,
  exampleChatText,
  exampleOverview,
  finalTextBox,
  contact,
};

export default homepageCSS;
