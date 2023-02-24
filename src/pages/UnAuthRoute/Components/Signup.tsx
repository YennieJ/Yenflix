import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import backgoundImg from "assets/userBackground.jpeg";
import logoPath from "assets/logoPath";

const Backgroud = styled.div<{ bg: string }>`
  min-height: 100vh;
  height: 100%;

  background: url(${(props) => props.bg}), center;

  position: relative;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
`;
const Header = styled.div`
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
const Logo = styled.div`
  svg {
    width: 100px;
    fill: #e50914;
  }
`;

const Content = styled.div`
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

const Form = styled.form<{ borderColor?: boolean }>`
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
        border-color: ${(props) => (props.borderColor ? "#e50914" : "#66c677")};
        border-color: ${(props) =>
          props.borderColor === undefined && "rgba(22, 22, 22, 0.7)"};

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

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [borderColor, setBorderColor] = useState<boolean | undefined>(
    undefined
  );

  const onValid = (emailData: string) => {
    const regex = /^([A-Za-z0-9]+){3}@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/;
    let isValidate = false;
    if (emailData === "") {
      setBorderColor(true);
      setErrorMsg("이메일 주소를 입력해주세요.");
    } else if (!regex.test(emailData)) {
      setBorderColor(true);
      setErrorMsg("정확한 이메일 주소를 입력하세요.");
    } else {
      isValidate = true;
      setBorderColor(false);
      setErrorMsg("");
      setEmail(emailData);
    }
    return isValidate;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailData = e.target.value;
    onValid(emailData);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidated = onValid(email);
    isValidated &&
      navigate("/signup/password", {
        state: {
          email: `${email}`,
        },
      });
  };
  return (
    <>
      <Backgroud bg={backgoundImg} />
      <Overlay />
      <Container>
        <Header>
          <Logo>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 276.742">
              <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
            </svg>
          </Logo>
          <button>
            <Link to="/">로그인 </Link>
          </button>
        </Header>
        <Content>
          <h1>영화와 시리즈를 무제한으로.</h1>
          <p>다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.</p>

          <Form onSubmit={onSubmit} borderColor={borderColor}>
            <h3>
              시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일
              주소를 입력하세요.
            </h3>
            <div>
              <div>
                <label>이메일 주소</label>
                <input type="text" onChange={onChange} />
              </div>
              <button type="submit"> 시작하기 &gt;</button>
            </div>
            <div>
              {errorMsg && (
                <>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={logoPath} />
                  </svg>
                  <span>{errorMsg}</span>
                </>
              )}
            </div>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Signup;

{
  /* <Form onSubmit={handleSubmit(onValid)} errors={errors.email}>
            <h3>
              시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일
              주소를 입력하세요.
            </h3>
            <div>
              <div>
                <label>이메일 주소</label>
                <input
                
                  type="text"
                  {...register("email", {
                    required: "이메일 주소를 입력해주세요.",
                    pattern: {
                      value:
                        /^([A-Za-z0-9]+){3}@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/,
                      message: "정확한 이메일 주소를 입력하세요.",
                    },
                  })}
                />
              </div>
              <button type="submit"> 시작하기 &gt;</button>
            </div>
            <div>
              {errors.email && (
                <>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8,2.5c-3.03757,0 -5.5,2.46243 -5.5,5.5c0,3.0376 2.46243,5.5 5.5,5.5c3.0376,0 5.5,-2.4624 5.5,-5.5c0,-3.03757 -2.4624,-5.5 -5.5,-5.5zM15,8c0,3.866 -3.134,7 -7,7c-3.86599,0 -7,-3.134 -7,-7c0,-3.86599 3.13401,-7 7,-7c3.866,0 7,3.13401 7,7zM6.03033,4.96967l1.96967,1.96967l1.96967,-1.96967l1.06063,1.06066l-1.96964,1.96967l1.96964,1.96967l-1.06063,1.06063l-1.96967,-1.96964l-1.96967,1.96964l-1.06066,-1.06063l1.96967,-1.96967l-1.96967,-1.96967z" />
                  </svg>
                  <span>{errors.email.message}</span>
                </>
              )}
            </div>
          </Form> */
}
