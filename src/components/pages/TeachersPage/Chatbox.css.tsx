import { css } from '@emotion/react';

const chatboxContainer = css`
  margin-left: -13px;
  margin-right: -13px;
  max-width: 500px;
`;

const chatboxTop = css`
  background: #f8e5e0;
  border-radius: 10px 10px 10px 10px;
  min-height: 260px;
  padding: 10px;
  max-height: 260px;
  overflow-y: overlay;
`;

const chatboxCSS = {
  chatboxContainer,
  chatboxTop,
};

export default chatboxCSS;
