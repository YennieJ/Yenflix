import styled, { css } from "styled-components";

export const Backgroud = styled.div<{ bg: string }>`
  min-height: 100vh;
  height: 100%;

  background: url(${(props) => props.bg}), center;

  position: relative;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
`;
export const Header = styled.div`
  width: 100%;
  height: 80px;
  padding: 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: 75px;
    height: 35px;
    border: none;
    border-radius: 4px;
    color: white;

    background-color: #e50914;

    font-size: 16px;
    font-weight: 500;

    :active {
      background-color: rgb(180, 0, 0);
    }
  }
`;
export const Logo = styled.div`
  svg {
    width: 100px;
    fill: #e50914;
  }
`;

export const Content = styled.div`
  height: 100%;
  padding-top: 200px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 35px;
    font-weight: 700;
  }

  p {
    font-size: 20px;
    font-weight: 400;
    padding: 20px 0 50px;
  }
`;

export const Form = styled.form<{ isValid?: boolean; isDirty?: boolean }>`
  display: flex;
  flex-direction: column;

  padding: 0 20px;

  h3 {
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 20px;
  }

  div {
    display: flex;
    width: 100%;
    :nth-child(1) {
      position: relative;
      height: 100%;

      input {
        color: white;
        background-color: rgba(22, 22, 22, 0.7);
        border: 1px solid;

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
        border-radius: 4px;
        width: 100%;
        font-size: 25px;
        padding: 25px 20px 10px 20px;
        :focus {
          outline: 2px solid white;
          outline-offset: 2px;
        }
      }
      label {
        color: #b3b3b3;
        position: absolute;
        top: 8px;
        left: 20px;
        font-size: 14px;
        font-weight: 400;
      }
    }

    button {
      width: 200px;
      margin-left: 10px;
      border: none;
      border-radius: 4px;

      font-size: 25px;
      font-weight: 600;
      color: white;
      background-color: #e50914;
      :active {
        background-color: rgb(180, 0, 0);
      }
    }
    :nth-child(3) {
      padding-top: 8px;
      svg {
        fill: #e50914;
      }
      span {
        font-size: 16px;
        font-weight: 400;
        color: #e50914;
        line-height: 27px;
        padding-left: 5px;
      }
    }
  }
`;
