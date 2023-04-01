import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 50px;

  > h3 {
    margin-bottom: 15px;

    font-size: 25px;
    font-weight: 500;
  }
`;

export const Row = styled.div<{ isOpen: boolean; overData?: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;

  width: 100%;
  height: ${(props) =>
    props.overData ? (props.isOpen ? "100%" : "700px") : "100%"};

  overflow: hidden;

  @media (max-width: 860px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Box = styled.div<{ bgPhoto: string }>`
  height: 320px;

  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};

  > div {
    :nth-child(1) {
      width: 100%;
      height: 50%;

      background-size: cover;
      background-image: url(${(props) => props.bgPhoto});
      border-radius: 5px 5px 0 0;
    }

    :nth-child(2) {
      padding: 15px 10px 0px 10px;

      > h4 {
        margin-bottom: 5px;

        font-size: 20px;
        font-weight: 400;
      }
      > p {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;

        height: 5em;

        font-size: 17px;
        line-height: 1.3;

        text-align: left;
        text-overflow: ellipsis;
        white-space: normal;
        word-wrap: break-word;

        overflow: hidden;
      }
    }
  }

  @media (max-width: 860px) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 130px;

    padding: 0 10px;
    > div {
      :nth-child(1) {
        width: 33%;
        height: 70%;
      }
      :nth-child(2) {
        width: 65%;

        padding: 0;
        > p {
          -webkit-line-clamp: 3;

          height: 4em;

          font-size: 15px;
        }
      }
    }
  }
`;

export const Openbar = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;

  position: relative;

  width: 100%;
  height: 70px;
  border-bottom: 2px solid #404040;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    bottom: -21px;

    width: 42px;
    height: 42px;

    border: 2px solid hsla(0, 0%, 100%, 0.5);
    border-radius: 50%;
    background-color: rgba(42, 42, 42, 0.6);

    color: ${(props) => props.theme.white.lighter};

    i {
      display: inline-block;

      padding: 6px;

      border: solid white;
      border-width: 0 1px 1px 0;

      transform: ${(props) =>
        props.isOpen ? "rotate(225deg)" : "rotate(45deg)"};
      -webkit-transform: ${(props) =>
        props.isOpen ? "rotate(225deg)" : "rotate(45deg)"};
    }
    :hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: white;
    }
    :active {
      border: 5px solid white;
    }
  }
`;
