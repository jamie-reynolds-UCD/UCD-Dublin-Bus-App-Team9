import styled from "styled-components";

export const RowContainer = styled.div`
  padding-top: 20px;
`;

export const RowHeading = styled.h1`
  font-size: 22px;
  padding-left: 5%;
  left:0;
  position: absolute;
  font-family: 'Quicksand', 'sans-serif';
`;

export const PosterImg = styled.img`
  height: 150px;
  width: 290px;
  object-fit: fill;
  position: flex;

  @media screen and (max-width: 600px) {
    
    height: 200px;
    width: 300px;
    object-fit: cover;
  }


`;

export const PosterInfo = styled.div`
  height: 150px;
  width: 290px;
  margin-right: 2%;
  position: relative;
  display: inline-block;
  transition: transform 450ms;


  @media screen and (max-width: 600px) {
    height: 200px;
    width: 140px;
  }

  &:hover {
    transform: scale(1.06);
    z-index: 0;
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 50px;
    background: linear-gradient(to top, black, transparent);
  }
`;

export const PosterHead = styled.h1`
  font-size: 15px;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  position: absolute;
  margin: 0 auto;
  left: 5%;
  right: 0;
  bottom: 10%;
  font-family: 'Quicksand', 'sans-serif';
`;

export const PosterText = styled.h1`
  font-size: 12px;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  position: absolute;
  margin: 0 auto;
  font-family: sans-serif;
  left: 10%;
  right: 0;
  bottom: 1%;
  font-family: 'Quicksand', 'sans-serif';
`;

export const SpotifyPreviewContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  width: 55px;
  height: 40px;
  border-radius: 0 0 0 100px;
  -moz-border-radius: 0 0 0 100px;
  -webkit-border-radius: 0 0 0 100px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
