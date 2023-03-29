import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  margin: 20px 0;
  padding: 0 60px;
`;

export const GridContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  padding-bottom: 70px;
`;

export const GridBox = styled.div<{ idx: number }>`
  display: flex;
  justify-content: center;
`;

export const MovieContainer = styled(motion.div)`
  position: relative;

  width: 300px;
  height: 400px;

  cursor: pointer;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
  }
`;
