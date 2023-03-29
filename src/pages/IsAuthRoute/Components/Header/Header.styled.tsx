import styled from "styled-components";
import { motion } from "framer-motion";

export const Nav = styled(motion.nav)`
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  width: 100%;
  top: 0;

  font-size: 14px;

  z-index: 4;
`;

export const Col = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled(motion.svg)`
  width: 95px;
  height: 25px;
  margin-right: 50px;

  fill: ${(props) => props.theme.red};

  cursor: pointer;
`;

export const Items = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled.li`
  margin-right: 20px;

  position: relative;

  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${(props) => props.theme.white.darker};

  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

export const Search = styled.div`
  margin-right: 10px;

  display: flex;
  align-items: center;
  position: relative;

  color: ${(props) => props.theme.white.lighter};

  cursor: pointer;

  svg {
    height: 25px;
  }
`;

export const Circle = styled(motion.span)`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  margin: 0 auto;

  position: absolute;
  left: 0;
  right: 0;
  bottom: -5px;

  background-color: ${(props) => props.theme.red};
`;

export const Input = styled(motion.input)`
  padding: 5px 10px 5px 40px;
  border: 1px solid ${(props) => props.theme.white.lighter};

  position: absolute;
  right: 0px;
  font-size: 16px;
  color: ${(props) => props.theme.white.lighter};
  background-color: rgba(0, 0, 0, 0.8);

  z-index: -1;

  transform-origin: right center;
  :focus {
    outline: none;
  }
`;

export const UserButton = styled(motion.button)`
  padding: 0;
  border: none;

  position: relative;

  background: none;

  img {
    border-radius: 5px;
  }

  div {
    padding-top: 3px;

    position: absolute;
    right: 0;
    color: ${(props) => props.theme.white.lighter};

    span {
      padding-right: 7px;

      display: block;

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
