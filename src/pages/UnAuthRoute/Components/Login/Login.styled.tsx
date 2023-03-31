import { FieldError } from "react-hook-form";

import styled, { css } from "styled-components";

export const Backgroud = styled.div<{ bg: string }>`
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

export const Logo = styled.div`
  display: inline-block;
  a {
    display: flex;

    height: 90px;
    margin-left: 30px;
  }
  svg {
    width: 200px;
    fill: ${(props) => props.theme.red};
  }
`;

export const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  min-height: 515px;
  width: 450px;
  height: 600px;

  padding: 60px 70px 100px 60px;

  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.75);

  transform: translate(-50%, -50%);
`;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;

  h1 {
    padding-bottom: 28px;

    font-size: 32px;
    font-weight: 500;
  }
`;

export const Form = styled.form<{
  pwdError?: FieldError;
  emailError?: FieldError;
  email: string;
  password: string;
}>`
  div {
    :nth-child(1),
    :nth-child(2) {
      display: flex;
      flex-direction: column;

      position: relative;

      width: 100%;
      padding-bottom: 16px;

      input {
        width: 100%;
        height: 50px;
        padding: 16px 20px 0;

        border: none;
        border-radius: 4px;

        color: ${(props) => props.theme.white.lighter};
        font-size: 16px;
        line-height: 50px;
        outline: none;

        /* placeholder처럼 보이는 lable을 위한 */
        background-color: #333;
        caret-color: ${(props) => props.theme.white.lighter};

        :focus {
          background-color: #5c5c5c;
        }
      }
      :nth-child(1) {
        input {
          ${(props) =>
            props.emailError &&
            css`
              border-bottom: 2px solid ${(props) => props.theme.orange};
            `}
        }
        label {
          ${(props) =>
            props.email
              ? css`
                  position: absolute;
                  top: 8px;
                  left: 20px;

                  color: ${(props) => props.theme.gray.lighter};
                  font-size: 11px;
                `
              : css`
                  position: absolute;
                  top: 18px;
                  left: 20px;

                  transition: 0.2s;
                `}
        }
      }
      :nth-child(2) {
        input {
          ${(props) =>
            props.pwdError &&
            css`
              border-bottom: 2px solid ${(props) => props.theme.orange};
            `}
        }
        label {
          ${(props) =>
            props.password
              ? css`
                  position: absolute;
                  top: 8px;
                  left: 20px;

                  color: ${(props) => props.theme.gray.lighter};
                  font-size: 11px;
                `
              : css`
                  position: absolute;
                  left: 20px;
                  top: 18px;

                  transition: 0.2s;
                `}
        }
      }

      :focus-within label {
        position: absolute;
        top: 8px;
        left: 20px;

        color: ${(props) => props.theme.gray.lighter};
        font-size: 11px;
      }

      span {
        padding: 6px 3px;
        margin-bottom: -6px;

        color: ${(props) => props.theme.orange};
        font-size: 13px;
        font-weight: 400;
      }
    }
  }

  button {
    padding: 16px;
    margin: 24px 0 12px;

    width: 100%;
    height: 50px;
    border: none;
    border-radius: 4px;
    background: ${(props) => props.theme.red};

    color: ${(props) => props.theme.white.lighter};
    font-size: 16px;
    font-weight: 500;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: end;

  position: relative;

  user-select: none;

  color: ${(props) => props.theme.red};

  &:before {
    height: 18px;
    width: 18px;

    border-radius: 4px;

    background-color: ${(props) => props.theme.gray.lighter};
    content: "";
  }
  &:after {
    position: absolute;
    top: 1px;
    left: 2px;

    height: 18px;
    width: 18px;
    border-radius: 4px;

    opacity: 0;

    content: "✔";
  }

  span {
    padding-left: 5px;

    color: ${(props) => props.theme.gray.lighter};
    font-size: 13px;
    font-weight: 400;
  }
`;

export const CheckBox = styled.input`
  position: absolute;

  overflow: hidden;

  white-space: nowrap;

  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  &:checked + ${CheckboxLabel} {
    :after {
      opacity: 1;
    }
  }
`;

export const SinupButton = styled.div`
  color: #737373;
  font-size: 16px;
  font-weight: 400;

  a {
    padding-left: 5px;

    color: ${(props) => props.theme.white.lighter};
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;
