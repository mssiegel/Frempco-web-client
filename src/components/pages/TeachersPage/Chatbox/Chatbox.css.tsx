import { css } from '@emotion/react';

const chatboxContainer = css`
  max-width: 600px;
`;

const expandedChatbox = css`
  max-width: 600px;
`;

const chatboxTop = css`
  background: #f8e5e0;
  border-radius: 10px 10px 0 0;
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

const chatboxBottom = css`
  border-radius: 0 0 10px 10px;
  padding: 0 0 10px 0;
  text-align: center;
  background: #f8e5e0;
`;

const readOnlyChatboxWrapper = css`
  border-radius: 10px;
`;

const chatButtonsContainer = css`
  background: #ffdd9a;
  border-radius: 0 0 10px 10px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
`;

const chatboxCSS = {
  chatboxContainer,
  expandedChatbox,
  chatboxTop,
  expandedChatboxTop,
  chatboxBottom,
  readOnlyChatboxWrapper,
  chatButtonsContainer,
};

export default chatboxCSS;
