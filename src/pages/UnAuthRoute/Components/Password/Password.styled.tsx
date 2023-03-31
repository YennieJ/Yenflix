import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  background-color: ${(props) => props.theme.white.lighter};

  color: ${(props) => props.theme.black.veryDark};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0 20px;

  border-bottom: 1px solid #e6e6e6;

  a {
    :nth-child(2) {
      font-size: 16px;
      font-weight: 500;
      line-height: 75px;
      :hover {
        text-decoration: underline;
      }
    }
  }
`;
export const LogoWrap = styled.div`
  padding: 15px 0;
`;

export const SVG = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 276.742",
})`
  width: 180px;
  fill: ${(props) => props.theme.red};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 30px 30px 60px;

  > div {
    width: 500px;

    font-size: 18px;
    line-height: 25px;
    h1 {
      margin: 25px 0 12px;

      font-size: 32px;
      font-weight: 500;
      line-height: 40px;
    }

    h2 {
      margin-bottom: 30px;

      font-size: 20px;
    }

    > :nth-child(4) {
      margin-bottom: 20px;
      font-weight: 500;
    }
  }
`;

export const Form = styled.form<{
  isValid: boolean;
  isDirty: boolean;
  password: string;
}>`
  width: 500px;
  position: relative;

  > div {
    position: relative;

    width: 100%;

    margin-bottom: 50px;

    input {
      width: 100%;
      padding: 25px 20px 10px 20px;

      border: 1px solid;
      border-radius: 4px;

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
        outline: 1px solid ${(props) => props.theme.white.lighter};
      }
    }

    label {
      ${(props) =>
        props.password
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

  span {
    position: absolute;
    top: 70px;
    left: 2px;

    color: ${(props) => props.theme.red};
    font-size: 16px;
    font-weight: 400;
    line-height: 27px;
  }

  button {
    width: 100%;
    padding: 20px 50px;

    border: none;
    border-radius: 4px;
    background-color: ${(props) => props.theme.red};

    color: ${(props) => props.theme.white.lighter};
    font-size: 24px;
    font-weight: 400;
  }
`;
