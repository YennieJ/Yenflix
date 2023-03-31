import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;

  font-size: 100px;
  font-weight: 600;
`;

const NotFound = () => {
  return <Wrapper>NOT FOUND</Wrapper>;
};

export default NotFound;
