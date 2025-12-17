import { css } from '@emotion/react';

const chatboxContainer = css`
  max-width: 600px;
  border-radius: 10px;
  overflow: hidden;
`;

const chatboxTop = css`
  background: #f8e5e0;
  min-height: 280px;
  padding: 10px;
  max-height: 280px;
  overflow-y: overlay;
  scroll-behavior: smooth;
  transition: all 0.3s ease-in-out;
`;

const expandedChatboxTop = css`
  min-height: 500px;
  max-height: 600px;
`;

const buttonsContainer = css`
  background: #ffdd9a;
  padding: 10px;
  display: flex;
  justify-content: space-around;
`;

const chatboxCSS = {
  chatboxContainer,
  chatboxTop,
  expandedChatboxTop,
  buttonsContainer,
};

export default chatboxCSS;
