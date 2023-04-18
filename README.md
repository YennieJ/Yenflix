# Yenfilx

https://user-images.githubusercontent.com/108519185/232780964-1bfefb55-2c53-4ffc-adb8-957a3577d71f.mp4

https://user-images.githubusercontent.com/108519185/232780975-27af0dbc-4afa-487f-b29a-2f73ce1b992e.mp4

---

![react](https://img.shields.io/badge/-React-000000?logo=react&logoColor=61DAFB&style=for-the-badge)
![styledcomponents](https://img.shields.io/badge/-styledcomponents-000000?logo=styledcomponents&logoColor=DB7093&style=for-the-badge)
![typescript](https://img.shields.io/badge/-typescript-000000?logo=typescript&logoColor=3178C6&style=for-the-badge)

![axios](https://img.shields.io/badge/-axios-000000?logo=axios&logoColor=white&style=for-the-badge)
![reactrouter](https://img.shields.io/badge/-reactrouter-000000?logo=reactrouter&logoColor=FF4154&style=for-the-badge)
![reactquery](https://img.shields.io/badge/-reactquery-000000?logo=reactquery&logoColor=FF4154&style=for-the-badge)
![reacthookform](https://img.shields.io/badge/-reacthookform-000000?logo=reacthookform&logoColor=EC5990&style=for-the-badge)

![themoviedatabase](https://img.shields.io/badge/-themoviedatabase-ffffff?logo=themoviedatabase&logoColor=01B4E4&style=for-the-badge)
![infiniteslide](https://img.shields.io/badge/-무한슬라이드-ffffff?&style=for-the-badge)
![login](https://img.shields.io/badge/-login-ffffff?&style=for-the-badge)
![signup](https://img.shields.io/badge/-signup-ffffff?&style=for-the-badge)

---

## React Router

> 새로운 페이지를 불러오지 않고 url에 따라 렌더링 해주는 리액트 라이브러리

1. router.tsx

```ts
import { createBrowserRouter } from "react-router-dom";

// session or local Storage 에 저장된 유저 정보에 따라 Route변경

const Router = createBrowserRouter([
  {
    path: "/",
    element: <UnAuthRoute />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signup/password", element: <Password /> },
    ],
  },
  {
    path: "/browse",
    element: <IsAuthRoute />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <MainView /> },
      { path: "/browse/movies/:id", element: <MainView /> },
      { path: "/browse/search", element: <SearchView /> },
    ],
  },
]);

export default Router;
```

2. App.tsx

```ts
import React from "react";
import { RouterProvider } from "react-router-dom";

import Router from "router";

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
```

3. pages > IsAuthRoute,UnAuthRoute

```ts
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UnAuthRoute = () => {
  const user =
    sessionStorage.getItem("sessionToken") ||
    localStorage.getItem("localToken");
  return <div>{user ? <Navigate to="/browse" /> : <Outlet />}</div>;
};
export default UnAuthRoute;
```

```ts
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Header from "pages/IsAuthRoute/Components/Header/Header";

const IsAuthRoute = () => {
  const user =
    sessionStorage.getItem("sessionToken") ||
    localStorage.getItem("localToken");

  return (
    <>
      {user ? (
        <>
          <Header />
          <Outlet />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default IsAuthRoute;
```

## 무한 슬라이드

src > Components > Slider

> 개선 점 : slider 양 끝 transform-origin 적용

- Slider.tsx

```ts
import React, { ReactNode, useState } from "react";

import * as S from "./Slider.styled";

interface ISlider {
  children: ReactNode;
}

// pages > isAuthRoute > MainView > TodayMovies
// pages > isAuthRoute > MainView > TopMovies
// pages > isAuthRoute > MainView > UpcomingMovies

const Slider = ({ children }: ISlider) => {
  const [sliderHover, setSliderHover] = useState(false);

  // yarn add react-slick, yarn add slick-carousel, yarn add @types/react-slick
  // react-slick 문법
  const settings = {
    dots: false,

    arrows: true,
    prevArrow: (
      <S.Button pos="left">{sliderHover && <span>&lt;</span>}</S.Button>
    ),
    nextArrow: (
      <S.Button pos="right">{sliderHover && <span>&gt;</span>}</S.Button>
    ),

    swipe: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <S.Wrapper
      onHoverStart={() => {
        setSliderHover(true);
      }}
      onHoverEnd={() => {
        setSliderHover(false);
      }}
    >
      <S.StyledSlider {...settings}>{children}</S.StyledSlider>
    </S.Wrapper>
  );
};

export default Slider;
```

- Slider.styled.tsx

```ts
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Wrapper = styled(motion.div)`
  position: relative;

  height: 100%;

  padding: 0 4%;

  cursor: pointer;
`;

export const StyledSlider = styled(Slider)`
  position: static;

  .slick-list {
    overflow: visible;
  }

  .slick-arrow:before {
    display: none;
  }
`;

export const Button = styled.button<{ pos?: "left" | "right" }>`
  position: absolute;

  width: 4%;
  height: 100%;

  background: rgba(0, 0, 0, 0.7);

  font-size: 4vw;

  z-index: 1;

  ${({ pos }) =>
    pos === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
  span {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;

    color: ${(props) => props.theme.white.lighter};
  }

  :hover {
    background: rgba(0, 0, 0, 0.7);
  }
  :focus {
    background: rgba(0, 0, 0, 0.7);
  }
`;
```

## Login

src > pages > UnAuthRoutes > Components > Login

> 개선 점 : Token 사용

```ts
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

// yarn add @react-oauth/google

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

  // checkbox 사용하여 로그인 정보 저장 여부
  const handleTokenSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      return setTokenSave(true);
    } else {
      return setTokenSave(false);
    }
  };

  return (
    <>
      <S.CheckBox type="checkbox" id="checkBox" onChange={handleTokenSave} />
      <S.CheckboxLabel htmlFor="checkBox">
        <span>로그인 정보 저장</span>
      </S.CheckboxLabel>
      <button onClick={() => login()}></button>
    </>
  );
};

export default Login;
```

## Signup

src > pages > UnAuthRoutes > Components > Signup and Password

1. Signup

- Signup.tsx

```ts
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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

  // email value를 Password 페이지에서 사용 할 수 있게
  const onValid = () => {
    navigate("/signup/password", {
      state: {
        email: `${getValues("email")}`,
      },
    });
  };

  return (
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
      </div>
      {errors.email && <span>{errors.email.message}</span>}
    </S.Form>
  );
};

export default Signup;
```

- Signup.styled.tsx

```ts
import styled, { css } from "styled-components";

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
```

2. Password

```ts
import { useLocation } from "react-router-dom";

const Password = () => {
// Signup 페이지에서 보낸 email value 가져오기
  const location = useLocation();
  const state = location.state as { email: string };
  const email = state.email;


   ...

};

export default Password;

```
