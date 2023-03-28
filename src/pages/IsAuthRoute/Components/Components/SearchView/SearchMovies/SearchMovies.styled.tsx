import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 20px 0;
  padding: 0 60px;
`;

export const GridContainer = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));

  padding-bottom: 70px;
`;

export const GridBox = styled.div<{ idx: number }>`
  display: flex;
  justify-content: center;

  /* transform-origin: ${(props) => props.idx === 0 && "center left"};
  transform-origin: ${(props) => props.idx === 5 && "center right"}; */

  /* border: 1px solid green; */
`;
