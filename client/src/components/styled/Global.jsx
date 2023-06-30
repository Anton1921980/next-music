import { Global, css } from '@emotion/react';

export const globalStyles = css`
  ::-webkit-scrollbar {
    width: 6px;  
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    border: 2px solid #f1f1f1;
    background: black;
  }
  ::--scrollbar-thumb:hover {
    background: #555;
  }
`;