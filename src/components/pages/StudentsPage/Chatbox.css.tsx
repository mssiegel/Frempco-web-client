import { css } from '@emotion/react';

const chatboxContainer = css`
  width: 500px;

  @media (max-width: 500px) {
    margin-left: 1px;
    margin-right: 1px;
  }
`;

const chatboxCSS = {
  chatboxContainer,
};

export default chatboxCSS;
