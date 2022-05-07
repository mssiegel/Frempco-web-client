import { css } from '@emotion/react';

const chatboxContainer = css`
  width: 100%;
  /* widens the student chatbox to more easily type messages on mobile */
  margin-left: -13px;
  margin-right: -13px;

  @media (min-width: 500px) {
    width: 500px;
  }
`;

const chatboxTop = css`
  background: #f8e5e0;
  border-radius: 10px 10px 0 0;
  min-height: 260px;
  padding: 10px 10px 0 10px;
  max-height: 260px;
  overflow-y: overlay;
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
