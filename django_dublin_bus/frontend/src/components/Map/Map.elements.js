import styled from 'styled-components';
import { Container } from '../../globalStyles';

export const MapContainer = styled(Container)`

  display: block;
  width: 60vw;
  height: 60vh;
  right: 5vw;
  top: 20vh;
  position: absolute;
  align-items: right;

  ${Container}
`;