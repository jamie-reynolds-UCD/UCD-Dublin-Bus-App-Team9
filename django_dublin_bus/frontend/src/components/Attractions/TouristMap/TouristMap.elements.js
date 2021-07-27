import styled from "styled-components";

export const MapContainer = styled.div`
  display: block;
  flex: 1;
  height: 60vh;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin: auto;
    flex: none;
    padding-left: 5px;
    padding-right: 5px;
  }
`;


