import styled from '@emotion/styled';

export const LoaderContainer = styled.div`
  display: inline-block;
  position: fixed;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  width: 100px;
  height: 100px;
  border: 5px solid rgba(255, 255, 255);
  border-radius: 50%;
  border-top-color: #3f51b5;
  animation: spin 0.45s ease -in -out infinite;
  z-index: 2;

  -webkit-animation: spin 0.45s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
