import styled from "styled-components";

export const HiddenContainer = styled.div`
  width: 0px;
  height: 0px;
  overflow: auto;
`;

export const CenteredDivContainser = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const EditBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const EditContainer = styled.div`
  position: fixed;
  width: 90%;
  left: 50%;
  top: 30%;
  overflowy: scroll;
  transform: translate(-50%, 0%);
  maxheight: 70%;
  zindex: 1000;
`;

export const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const InputRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  max-width: 700px;
  margin: auto;
  align-items: flex-end;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LocationButtonContainer = styled.div`
  width: 100%;
  max-width: 150px;
`;
