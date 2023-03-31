import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import backgoundImg from "assets/userBackground.jpeg";
import logoPath from "assets/logoPath";

import * as S from "./Login.styled";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  // google login api에서 가져온 Token으로 Storage에 저장해서 Route이동
  const [tokenSave, setTokenSave] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });

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

  //react hook form 으로 error catch, watch로 lable 위치 조정하기.
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>();

  const onValid = (formValues: LoginForm) => {
    // const email = formValues.email;
    // const passowrd = formValues.password;

    if (window.confirm("구글로 로그인 하시겠습니까?")) {
      login();
    }
  };

  const emailRegister = register("email", {
    required: "정확한 이메일 주소를 입력하세요.",
    pattern: {
      value: /^([A-Za-z0-9]+){3}@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/,
      message: "정확한 이메일 주소를 입력하세요.",
    },
  });

  const pwdRegister = register("password", {
    required: "비밀번호는 4~20자 사이여야 합니다.",
    minLength: {
      value: 4,
      message: "비밀번호는 4~20자 사이여야 합니다.",
    },
    maxLength: {
      value: 20,
      message: "비밀번호는 4~20자 사이여야 합니다.",
    },
  });

  return (
    <>
      <S.Backgroud bg={backgoundImg} />
      <S.Overlay>
        <S.Logo>
          <Link to="/signup">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 276.742">
              <path d={logoPath} />
            </svg>
          </Link>
        </S.Logo>
        <S.LoginContainer>
          <S.LoginContent>
            <div>
              <h1>로그인</h1>
              <S.Form
                onSubmit={handleSubmit(onValid)}
                emailError={errors.email}
                pwdError={errors.password}
                email={watch("email")}
                password={watch("password")}
              >
                <div>
                  <input type="text" {...emailRegister} />
                  <label>이메일 주소</label>
                  <span>{errors.email && errors.email.message}</span>
                </div>
                <div>
                  <input type="password" {...pwdRegister} />
                  <label>비밀번호</label>
                  <span>{errors.password && errors.password.message}</span>
                </div>
                <button type="submit">로그인</button>
                <S.CheckBox
                  type="checkbox"
                  id="checkBox"
                  onChange={handleTokenSave}
                />
                <S.CheckboxLabel htmlFor="checkBox">
                  <span>로그인 정보 저장</span>
                </S.CheckboxLabel>
              </S.Form>
            </div>
            <S.SinupButton>
              Netflix 회원이 아닌가요?
              <Link to="/signup">지금 가입하세요</Link>
            </S.SinupButton>
          </S.LoginContent>
        </S.LoginContainer>
      </S.Overlay>
    </>
  );
};

export default Login;
