import { css } from '@emotion/react';

const chatboxContainer = css`
  width: 500px;

  @media (max-width: 500px) {
    margin-left: 1px;
    margin-right: 1px;
  }
`;

const chatboxBottom = css`
  border-radius: 0 0 10px 10px;
  padding: 0 0 10px 0;
  background: #f8e5e0;
`;

const chatboxCSS = {
  chatboxContainer,
  chatboxBottom,
};

export default chatboxCSS;
