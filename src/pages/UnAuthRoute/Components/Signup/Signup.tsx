import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import backgoundImg from "assets/userBackground.jpeg";
import logoPath from "assets/logoPath";

import * as S from "./Signup.styled";

interface signupForm {
  email: string;
}

const Signup = () => {
  const navigate = useNavigate();

  //isValid:Register조건에 만족했는가 , isDirty:입력값이 있는가 for bordercolor
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
    watch,
  } = useForm<signupForm>();

  const emailRegister = register("email", {
    required: "이메일 주소를 입력해주세요.",
    pattern: {
      value: /^([A-Za-z0-9]+){3}@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/,
      message: "정확한 이메일 주소를 입력하세요.",
    },
  });

  const onValid = () => {
    navigate("/signup/password", {
      state: {
        email: `${getValues("email")}`,
      },
    });
  };

  return (
    <>
      <S.Backgroud bg={backgoundImg} />
      <S.Overlay />
      <S.Wrapper>
        <S.Header>
          <S.Logo>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 276.742">
              <path d={logoPath} />
            </svg>
          </S.Logo>
          <button>
            <Link to="/">로그인 </Link>
          </button>
        </S.Header>
        <S.Content>
          <h1>영화와 시리즈를 무제한으로.</h1>
          <p>다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.</p>
          <h3>
            시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일
            주소를 입력하세요.
          </h3>
          <S.Form
            onSubmit={handleSubmit(onValid)}
            isValid={isValid}
            isDirty={isDirty}
            email={watch("email")}
          >
            <div>
              <div>
                <input type="text" {...emailRegister} />
                <label>이메일 주소</label>
              </div>
              <button type="submit"> 시작하기 &gt;</button>
            </div>{" "}
            {errors.email && (
              <div>
                {/* fontAwesome에 원하는 아이콘 X */}
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8,2.5c-3.03757,0 -5.5,2.46243 -5.5,5.5c0,3.0376 2.46243,5.5 5.5,5.5c3.0376,0 5.5,-2.4624 5.5,-5.5c0,-3.03757 -2.4624,-5.5 -5.5,-5.5zM15,8c0,3.866 -3.134,7 -7,7c-3.86599,0 -7,-3.134 -7,-7c0,-3.86599 3.13401,-7 7,-7c3.866,0 7,3.13401 7,7zM6.03033,4.96967l1.96967,1.96967l1.96967,-1.96967l1.06063,1.06066l-1.96964,1.96967l1.96964,1.96967l-1.06063,1.06063l-1.96967,-1.96964l-1.96967,1.96964l-1.06066,-1.06063l1.96967,-1.96967l-1.96967,-1.96967z" />
                </svg>
                <span>{errors.email.message}</span>
              </div>
            )}
          </S.Form>
        </S.Content>
      </S.Wrapper>
    </>
  );
};

export default Signup;
