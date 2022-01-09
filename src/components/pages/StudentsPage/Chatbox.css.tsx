import { css } from '@emotion/react';

const chatboxContainer = css`
  width: 98%;
  max-width: 500px;
`;

const chatboxTop = css`
  background: #f8e5e0;
  border-radius: 10px 10px 0 0;
  min-height: 260px;
  padding: 10px 10px 0 10px;
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
