import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";
import logoPath from "assets/logoPath";

const Header = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #e6e6e6;

  a {
    :nth-child(2) {
      line-height: 75px;
      font-size: 16px;
      font-weight: 500;
      :hover {
        text-decoration: underline;
      }
    }
  }
`;
const Logo = styled.div`
  padding: 15px 0;

  svg {
    width: 180px;
    fill: #e50914;
  }
`;

const Content = styled.div`
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
  padding: 30px 30px 60px;
  /* margin: 0 250px; */
`;

const Form = styled.form<{ borderColor?: boolean }>`
  width: 500px;
  /* height: 550px; */
  h1 {
    font-size: 32px;
    font-weight: 500;
    padding: 25px 0 12px;
    line-height: 40px;
  }

  > :nth-child(2) {
    font-size: 20px;
  }

  > :nth-child(3) {
    font-size: 18px;
    padding: 10px 0 50px;

    > :nth-child(1) {
      padding: 20px 0;
      line-height: 25px;

      > :nth-child(2) {
        font-weight: 500;
      }
    }
    > :nth-child(2) {
      width: 100%;
      position: relative;

      display: flex;
      flex-direction: column;
      input {
        width: 100%;
        height: 60px;

        border: 1px solid;
        border-color: ${(props) => (props.borderColor ? "#e50914" : "#66c677")};
        border-color: ${(props) =>
          props.borderColor === undefined && "rgba(22, 22, 22, 0.7)"};

        border-radius: 2px;
        padding: 16px 10px 0;

        font-size: 16px;
        line-height: 50px;
        outline: none;

        /* 아무것도 없을때 */
        color: #333;
        caret-color: #333;
      }
      label {
        color: #b3b3b3;
        position: absolute;
        top: 8px;
        left: 10px;
        font-size: 14px;
        font-weight: 400;
      }
      span {
        font-size: 16px;
        font-weight: 400;
        color: #e50914;
        line-height: 27px;
        padding-top: 5px;
      }
    }
  }
  button {
    width: 100%;
    padding: 20px 50px;

    border-radius: 4px;
    font-size: 24px;
    font-weight: 400;
    color: white;
    background-color: red;
    border: none;
  }
`;

//여기서 useForm 어떻게 쓰지?
const Password = () => {
  const location = useLocation();
  const state = location.state as { email: string };
  const email = state.email;

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [borderColor, setBorderColor] = useState<boolean | undefined>(
    undefined
  );

  const onValid = (passwordData: string) => {
    let isValidate = false;
    if (passwordData === "") {
      setBorderColor(true);
      setErrorMsg("비밀번호를 입력해 주세요.");
    } else if (passwordData.length < 4 || passwordData.length > 20) {
      setBorderColor(true);
      setErrorMsg("비밀번호는 4~20자 사이여야 합니다.");
    } else {
      isValidate = true;
      setBorderColor(false);
      setErrorMsg("");
      setPassword(passwordData);
    }
    return isValidate;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordData = e.target.value;
    onValid(passwordData);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidated = onValid(password);
    isValidated && sessionStorage.setItem("sessionToken", "sessionLogin");
    navigate("/browse");
  };

  return (
    <div style={{ backgroundColor: "white", height: "100vh", color: "black" }}>
      <Header>
        <Logo>
          <Link to="/signup">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 276.742">
              <path d={logoPath} />
            </svg>
          </Link>
        </Logo>
        <Link to="/login">로그인 </Link>
      </Header>
      <Content>
        <Form onSubmit={onSubmit} borderColor={borderColor}>
          <h1>
            회원님, 반갑습니다.
            <br />
            넷플릭스 가입 절차는 간단합니다.
          </h1>
          <div> 비밀번호를 입력하시면 바로 시청하실 수 있습니다.</div>

          <div>
            <div>
              <div>이메일 주소</div>
              <div>{email}</div>
            </div>
            <div>
              <input type="password" onChange={onChange} />
              <label>비밀번호를 입력해 주세요.</label>
              <span>{errorMsg}</span>
            </div>
          </div>

          <button>회원가입</button>
        </Form>
      </Content>
    </div>
  );
};

export default Password;
