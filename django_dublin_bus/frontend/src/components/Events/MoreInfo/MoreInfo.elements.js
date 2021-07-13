import styled from 'styled-components';

export const MapContainer = styled.div`
    position: flex;
    float: right;

    height: 30vh;
    width: 30vw;
`;


export const InfoContainer = styled.div`
  height: 30%;
  width: 100%;
  padding-top: 20px;
  position: relative;
  display: flex; 
`;


export const InfoWindow = styled.div`
  height: 30vh;
  width: 50%;
  float: left;
  white-space: pre-wrap;
  padding-right: 10%;
  padding-left: 10%;
`;

export const TextWrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10%;
`;

export const TopLine = styled.h1`
  font-size: 18px;
  line-height: 16px;
  font-weight: 700;
  margin-bottom: 16px;

`;

export const TimeDate = styled.p`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 5px;

`;

export const Venue = styled.p`
  font-size: 16px;
  line-height: 24px;

`;

export const Buttons = styled.div`
  display: flex;
  float: right;
`

