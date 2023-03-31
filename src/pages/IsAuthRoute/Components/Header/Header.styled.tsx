import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const navVariants = {
  top: {
    background: "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
  },
  scroll: {
    background: "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))",
  },
};

export const Wrapper = styled(motion.nav).attrs({
  variants: navVariants,
  initial: "top",
})`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  width: 100%;
  top: 0;

  padding: 10px;

  font-size: 14px;

  z-index: 4;
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled(motion.svg).attrs({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 276.742",
})`
  width: 95px;
  height: 25px;

  margin-right: 50px;

  cursor: pointer;

  path {
    fill: ${(props) => props.theme.red};
  }
`;

export const Pages = styled.ul`
  display: flex;
  align-items: center;
`;

// 무슨 타입인지 찾아내기
export const Page = styled.li<{ currentPage: any }>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: relative;

  margin-right: 20px;

  > a {
    ${(props) =>
      props.currentPage
        ? css`
            color: ${(props) => props.theme.white.lighter};
            cursor: default;
          `
        : css`
            color: ${(props) => props.theme.white.darker};
            cursor: pointer;
          `}

    &:hover {
      color: ${(props) => props.theme.white.lighter};
    }
  }
`;

export const RedDot = styled(motion.span)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -7px;

  width: 5px;
  height: 5px;
  margin: 0 auto;

  border-radius: 5px;

  background-color: ${(props) => props.theme.red};
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  margin-right: 10px;

  color: ${(props) => props.theme.white.lighter};

  cursor: pointer;
`;

export const SearchInput = styled(motion.input)`
  position: absolute;
  right: 0px;

  padding: 5px 10px 5px 40px;

  border: 1px solid ${(props) => props.theme.white.lighter};
  background-color: rgba(0, 0, 0, 0.8);

  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;

  z-index: -1;

  transform-origin: right center;
  :focus {
    outline: none;
  }
`;

export const UserButton = styled(motion.button)`
  position: relative;

  padding: 0;

  border: none;
  background: none;

  img {
    border-radius: 5px;
  }

  div {
    position: absolute;
    right: 0;

    padding-top: 3px;

    color: ${(props) => props.theme.white.lighter};

    span {
      display: block;

      padding-right: 7px;

      font-size: 18px;
      text-align: end;
    }
    ul {
      width: 200px;
      padding: 20px 0;

      border: 1px solid rgb(100, 100, 100);
      background-color: rgba(0, 0, 0, 0.9);

      li {
        font-size: 15px;
        :hover {
          text-decoration: underline;
          text-underline-offset: 6px;
        }
      }
    }
  }
`;
