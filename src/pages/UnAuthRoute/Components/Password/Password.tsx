import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import logoPath from "assets/logoPath";

import * as S from "./Password.styled";

interface passwordForm {
  password: string;
}

const Password = () => {
  const location = useLocation();
  const state = location.state as { email: string };
  const email = state.email;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<passwordForm>();

  const pwdRegister = register("password", {
    required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 4,
      message: "비밀번호는 4~20자 사이여야 합니다.",
    },
    maxLength: {
      value: 20,
      message: "비밀번호는 4~20자 사이여야 합니다.",
    },
  });

  const onValid = () => {
    sessionStorage.setItem("sessionToken", "sessionLogin");
    navigate("/browse");
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.Logo>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 276.742">
            <path d={logoPath} />
          </svg>
        </S.Logo>
        <Link to="/">로그인 </Link>
      </S.Header>

      <S.Content onSubmit={handleSubmit(onValid)}>
        <div>
          <h1>
            회원님, 반갑습니다.
            <br />
            넷플릭스 가입 절차는 간단합니다.
          </h1>
          <h2> 비밀번호를 입력하시면 바로 시청하실 수 있습니다.</h2>

          <div>이메일 주소</div>
          <div>{email}</div>
        </div>

        <S.Form
          onSubmit={handleSubmit(onValid)}
          isValid={isValid}
          isDirty={isDirty}
          password={watch("password")}
        >
          <div>
            <input type="password" {...pwdRegister} />
            <label>비밀번호를 입력해 주세요.</label>
          </div>
          <span>{errors.password?.message}</span>

          <button type="submit">회원가입</button>
        </S.Form>
      </S.Content>
    </S.Wrapper>
  );
};

export default Password;

// + Email인증을 받는법
