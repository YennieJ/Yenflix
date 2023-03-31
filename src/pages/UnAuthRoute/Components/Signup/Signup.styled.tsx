import styled, { css } from "styled-components";

export const Backgroud = styled.div<{ bg: string }>`
  position: relative;

  min-height: 100vh;
  height: 100%;

  background: url(${(props) => props.bg}), center;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 0;

  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 80px;
  padding: 0 20px;

  button {
    width: 75px;
    height: 35px;

    border: none;
    border-radius: 4px;
    background-color: ${(props) => props.theme.red};

    color: white;
    font-size: 16px;
    font-weight: 500;

    :active {
      background-color: rgb(180, 0, 0);
    }
  }
`;

export const Logo = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 276.742",
})`
  width: 100px;
  fill: ${(props) => props.theme.red};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  padding-top: 200px;

  h1 {
    font-size: 35px;
    font-weight: 700;
  }

  p {
    padding: 20px 0 50px;

    font-size: 20px;
    font-weight: 400;
  }

  h3 {
    padding-bottom: 20px;

    font-weight: 400;
    font-size: 18px;
  }
`;

export const Form = styled.form<{
  isValid: boolean;
  isDirty: boolean;
  email: string;
}>`
  display: flex;
  flex-direction: column;

  padding: 0 20px;

  div {
    display: flex;

    width: 100%;

    :nth-child(1) {
      position: relative;

      height: 100%;

      input {
        width: 100%;
        padding: 25px 20px 10px 20px;

        border: 1px solid;
        border-radius: 4px;
        background-color: rgba(22, 22, 22, 0.7);

        color: ${(props) => props.theme.white.lighter};
        font-size: 25px;

        ${(props) =>
          props.isValid
            ? css`
                border-color: #66c677;
              `
            : css`
                border-color: ${(props) => props.theme.red};
              `}

        ${(props) =>
          !props.isDirty &&
          css`
            border-color: rgba(22, 22, 22, 0.7);
          `}

        :focus {
          outline: 2px solid ${(props) => props.theme.white.lighter};
          outline-offset: 2px;
        }
      }

      label {
        ${(props) =>
          props.email
            ? css`
                position: absolute;
                top: 10px;
                left: 20px;

                color: ${(props) => props.theme.gray.lighter};
                font-size: 12px;
                font-weight: 400;

                transform: translate(0%, 0%);
              `
            : css`
                position: absolute;
                top: 50%;
                left: 20px;

                font-size: 22px;
                font-weight: 400;

                transform: translate(0%, -50%);
                transition: 0.2s;
              `}
      }

      :focus-within label {
        position: absolute;
        top: 10px;
        left: 20px;

        color: ${(props) => props.theme.gray.lighter};
        font-size: 12px;
        font-weight: 400;

        transform: translate(0%, 0%);
      }
    }

    button {
      width: 200px;
      margin-left: 10px;

      border: none;
      border-radius: 4px;
      background-color: ${(props) => props.theme.red};

      color: ${(props) => props.theme.white.lighter};
      font-size: 25px;
      font-weight: 600;

      :active {
        background-color: rgb(180, 0, 0);
      }
    }

    :nth-child(2) {
      padding-top: 8px;

      text-shadow: 1px 1px 1px black;

      svg {
        fill: ${(props) => props.theme.red};
      }
      span {
        padding-left: 5px;

        color: ${(props) => props.theme.red};
        font-size: 16px;
        font-weight: 400;

        line-height: 27px;
      }
    }
  }
`;

export const SVG = styled.svg.attrs({
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg",
})`
  width: 25px;
  height: 25px;
`;

export const PATH = styled.path.attrs({
  d: "M8,2.5c-3.03757,0 -5.5,2.46243 -5.5,5.5c0,3.0376 2.46243,5.5 5.5,5.5c3.0376,0 5.5,-2.4624 5.5,-5.5c0,-3.03757 -2.4624,-5.5 -5.5,-5.5zM15,8c0,3.866 -3.134,7 -7,7c-3.86599,0 -7,-3.134 -7,-7c0,-3.86599 3.13401,-7 7,-7c3.866,0 7,3.13401 7,7zM6.03033,4.96967l1.96967,1.96967l1.96967,-1.96967l1.06063,1.06066l-1.96964,1.96967l1.96964,1.96967l-1.06063,1.06063l-1.96967,-1.96964l-1.96967,1.96964l-1.06066,-1.06063l1.96967,-1.96967l-1.96967,-1.96967z",
})``;
