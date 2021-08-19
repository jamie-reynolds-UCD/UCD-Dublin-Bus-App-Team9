import styled from "styled-components";
import { Container } from "../../globalStyles";

export const MapContainer = styled(Container)`
  display: block;
  flex: 1;
  height: 60vh;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin: auto;
    flex: none;
    padding-left: 10px;
    padding-right: 10px;
  }

  ${Container}
`;
