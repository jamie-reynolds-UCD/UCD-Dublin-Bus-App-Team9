import styled from "styled-components";
import { Container } from "../../globalStyles";

export const MapContainer = styled(Container)`
  display: block;
  flex: 1;
  height: 60vh;
  zindex: 1;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin: auto;
    flex: none;
    padding-left: 5px;
    padding-right: 5px;
  }

  ${Container}
`;
