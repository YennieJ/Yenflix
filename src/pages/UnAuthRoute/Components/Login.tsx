import React, { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import backgoundImg from "assets/userBackground.jpeg";
import logoPath from "assets/logoPath";

import { useGoogleLogin } from "@react-oauth/google";

import axios from "axios";

const Backgroud = styled.div<{ bg: string }>`
  min-height: 100vh;
  height: 100%;

  background: url(${(props) => props.bg}), center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const LoginContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  color: white;

  border-radius: 4px;
  min-height: 515px;
  width: 450px;
  height: 600px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 60px 70px 100px 60px;
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  h1 {
    font-size: 32px;
    font-weight: 500;
    padding-bottom: 28px;
  }
`;

const Form = styled.div<{ pwdError?: FieldError; emailError?: FieldError }>`
  color: black;
  div {
    :nth-child(1),
    :nth-child(2) {
      width: 100%;
      padding-bottom: 16px;
      position: relative;

      display: flex;
      flex-direction: column;

      input {
        width: 100%;
        height: 50px;

        border: none;
        border-radius: 4px;
        padding: 16px 20px 0;

        font-size: 16px;
        line-height: 50px;
        outline: none;

        /* 아무것도 없을때 */
        color: #fff;
        background-color: #333;
        caret-color: #fff;
        :focus {
          background-color: #5c5c5c;
        }
      }
      :nth-child(1) {
        input {
          border-bottom: ${(props) =>
            props.emailError ? "2px solid  #e87c03" : ""};
        }
      }
      :nth-child(2) {
        input {
          border-bottom: ${(props) =>
            props.pwdError ? "2px solid  #e87c03" : ""};
        }
      }

      label {
        position: absolute;
        top: 10px;
        left: 20px;
        font-size: 11px;

        /* 이무것도 없을때 */
        color: #b3b3b3;
      }
      span {
        padding: 6px 3px;
        margin-bottom: -6px;
        font-size: 13px;
        font-weight: 400;
        color: #e87c03;
      }
    }
  }

  button {
    width: 100%;
    height: 50px;
    background: #e50914;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    margin: 24px 0 12px;
    padding: 16px;
  }
`;

const CheckboxLabel = styled.label`
  position: relative;
  display: flex;
  align-items: end;
  user-select: none;

  &:before {
    content: "";
    height: 18px;
    width: 18px;
    background-color: #b3b3b3;
    border-radius: 4px;
  }
  &:after {
    opacity: 0;
    content: "✔";
    position: absolute;
    top: 1px;
    left: 2px;
    height: 18px;
    width: 18px;
    border-radius: 4px;
  }

  span {
    color: #b3b3b3;
    font-size: 13px;
    font-weight: 400;
    padding-left: 5px;
  }
`;

const CheckBox = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  overflow: hidden;
  white-space: nowrap;

  &:checked + ${CheckboxLabel} {
    :after {
      opacity: 1;
    }
  }
  &:focus + ${CheckboxLabel} {
    &:before {
      background-color: #fff;
    }
  }
`;

const SinupButton = styled.div`
  color: #737373;
  font-size: 16px;
  font-weight: 400;

  a {
    color: white;
    text-decoration: none;
    padding-left: 5px;

    :hover {
      text-decoration: underline;
    }
  }
`;

const Logo = styled.div`
  display: inline-block;
  a {
    height: 90px;
    display: inline-block;
    margin-left: 30px;
    display: flex;
  }
  svg {
    width: 200px;
    fill: #e50914;
  }
`;

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [tokenSave, setTokenSave] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onValid = (formValues: LoginForm) => {
    const email = formValues.email;
    const passowrd = formValues.password;

    console.log("email:", email);
    console.log("passowrd:", passowrd);
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );
        // console.log(res.data);
        if (tokenSave) {
          localStorage.setItem("localToken", "localLogin");
          navigate("/browse");
        } else {
          sessionStorage.setItem("sessionToken", "sessionLogin");
          navigate("/browse");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleTokenSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      return setTokenSave(true);
    } else {
      return setTokenSave(false);
    }
  };

  return (
    <>
      <Backgroud bg={backgoundImg} />
      <Overlay>
        <Logo>
          <Link to="/signup">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 276.742">
              <path d={logoPath} />
            </svg>
          </Link>
        </Logo>
        <LoginContainer>
          <LoginContent>
            <div>
              <h1>로그인</h1>

              <Form
                // onSubmit={handleSubmit(onValid)}
                emailError={errors.email}
                pwdError={errors.password}
              >
                <div>
                  <input
                    type="text"
                    {...register("email", {
                      required: "정확한 이메일 주소를 입력하세요.",
                      pattern: {
                        value:
                          /^([A-Za-z0-9]+){3}@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/,
                        message: "정확한 이메일 주소를 입력하세요.",
                      },
                    })}
                  />
                  <label>이메일 주소</label>
                  <span>{errors.email && errors.email.message}</span>
                </div>
                <div>
                  <input
                    type="password"
                    {...register("password", {
                      required: "비밀번호는 4~20자 사이여야 합니다.",
                      minLength: {
                        value: 4,
                        message: "비밀번호는 4~20자 사이여야 합니다.",
                      },
                      maxLength: {
                        value: 20,
                        message: "비밀번호는 4~20자 사이여야 합니다.",
                      },
                    })}
                  />
                  <label>비밀번호</label>
                  <span>{errors.password && errors.password.message}</span>
                </div>
                <button type="button" onClick={() => login()}>
                  로그인
                </button>
                <CheckBox
                  type="checkbox"
                  id="checkBox"
                  onChange={handleTokenSave}
                />
                <CheckboxLabel htmlFor="checkBox">
                  <span>로그인 정보 저장</span>
                </CheckboxLabel>
              </Form>
            </div>
            <SinupButton>
              Netflix 회원이 아닌가요?
              <Link to="/signup">지금 가입하세요</Link>
            </SinupButton>
          </LoginContent>
        </LoginContainer>
      </Overlay>
    </>
  );
};

export default Login;
