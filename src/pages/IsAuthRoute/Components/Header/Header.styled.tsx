import styled from "styled-components";
import { motion } from "framer-motion";

export const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 10px;
  color: white;

  z-index: 999;
`;

export const Col = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  cursor: pointer;
`;

export const Items = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

export const Search = styled.div`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 10px;
  cursor: pointer;

  svg {
    height: 25px;
  }
`;

export const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

export const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px 5px 40px;
  z-index: -1;
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid ${(props) => props.theme.white.lighter};

  :focus {
    outline: none;
  }
`;

export const UserButton = styled(motion.button)`
  padding: 0;
  border: none;
  background: none;
  position: relative;

  img {
    border-radius: 5px;
  }

  div {
    position: absolute;
    right: 0;
    color: white;

    padding-top: 3px;
    span {
      display: block;
      text-align: end;
      font-size: 18px;
      padding-right: 7px;
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
