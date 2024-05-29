import { css } from '@emotion/react';

const chatboxContainer = css`
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
`;

const chatboxBottom = css`
  border-radius: 0 0 10px 10px;
  padding: 0 0 10px 0;
  text-align: center;
  background: #f8e5e0;
`;

const chatboxCSS = {
  chatboxContainer,
  chatboxTop,
  chatboxBottom,
};

export default chatboxCSS;
