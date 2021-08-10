import styled from "styled-components";

export const MapRouteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;

export const RouteInputDirectionsContainer = styled.div`
  width: 300px;

  @media screen and (max-width: 600px) {
    flex: 1;
    width: 100%;
    margin: auto;
  }
`;
