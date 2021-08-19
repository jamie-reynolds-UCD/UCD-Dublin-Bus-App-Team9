import styled from 'styled-components';

export const InfoContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex; 
  text-align: center;
  align-content: center;
  background-color: #E8E8E8;
`;

export const MapContainer = styled.div`
    position: flex;
    float: right;
    width: 30vw;
    background-color: #E8E8E8;
    @media screen and (max-width : 600px)
    {
      width: 40vw;
    }
    @media screen and (max-width : 320px)
    {
      width: 35vw;
    }
`;

export const InfoWindow = styled.div`
  width: 50vw;
  float: left;
  white-space: pre-wrap;
  padding-right: 5%;
  padding-left: 20%;
  text-align: center;

  @media screen and (max-width : 600px)
    {
      padding-left: 0%;
      width: 60vw;
    }
  @media screen and (max-width : 320px)
    {
      width: 65vw;
    }
`;

export const TextWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10%;
`;

export const TopLine = styled.h1`
  font-size: 20px;
  line-height: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: 'Quicksand', 'sans-serif';
  @media screen and (max-width : 600px)
    {
      font-size:15px;
    }
`;

export const Venue = styled.p`
  font-size: 17px;
  line-height: 22px;
  font-family: 'Quicksand', 'sans-serif';
  font-weight: bold;

    @media screen and (max-width : 600px)
    {
      font-size:13px;
      line-height: 14px;
    }
`;

export const Address = styled.p`
  font-size: 16px;
  line-height: 18px;
  font-family: 'Quicksand', 'sans-serif';
  margin-bottom: 5px;

    @media screen and (max-width : 600px)
    {
      font-size:12px;
      line-height: 14px;
    }
`;

export const Time = styled.p`
  margin-top: 10px;
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 10px;
  font-family: 'Quicksand', 'sans-serif';
  @media screen and (max-width : 600px)
    {
      font-size:11px;
      margin-bottom: 0px;
      line-height: 14px;
    }
`;

export const EventDate = styled.p`
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 5px;
  font-family: 'Quicksand', 'sans-serif';
  @media screen and (max-width : 600px)
    {
      font-size:11px;
      margin-bottom: 0px;
      line-height: 14px;
    }
`;

export const ButtonsContainer = styled.div`
  padding-left: 10%;
  display: inline-block;
  align-content: center;
`
export const Buttons = styled.div`
  display: inline-block;
  align-content: center;
  margin-bottom: 20px;
  @media screen and (max-width : 600px)
    {
      margin-top: 5px;
    }
`

export const Divider = styled.div`
  width:5px;
  display:inline-block;
`