import { css } from '@emotion/react';

const chatboxContainer = css`
  width: 500px;

  @media (max-width: 500px) {
    margin-left: 1px;
    margin-right: 1px;
  }
`;

const chatboxTop = css`
  background: #f8e5e0;
  border-radius: 10px 10px 0 0;
  min-height: 260px;
  padding: 10px 10px 0 10px;
  max-height: 260px;
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
  chatboxBottom,
  chatboxTop,
};

export default chatboxCSS;
