import styled from 'styled-components';

export const RowContainer = styled.div`
    padding-top: 20px;
`;

export const RowHeading = styled.h1`
  font-size: 30px;
  padding-left: 2%;
`;

export const RowPosters = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 2%;

  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-track {
  background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
  }
`;


export const PosterImg = styled.img`
  height: 170px;
  width: 300px;
  object-fit: fill;
  position: flex;
`;


export const PosterInfo = styled.div`
 height: 170px;
  width: 300px;
  margin-right: 2%;
  position: relative;
  display: inline-block; 
  transition: transform 450ms;

  &:hover {
    transform: scale(1.07); 
  }

  &::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: linear-gradient(
    to top,
    black,
    transparent
  ); }
`;

export const PosterHead = styled.h1`
  font-size: 15px;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  position: absolute;
  margin: 0 auto;
  left: 5%;
  right: 0;
  bottom: 10%; 
`;

export const PosterText = styled.h1`
  font-size: 12px;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  position: absolute;
  margin: 0 auto;
  font-family: sans-serif;
  left: 10%;
  right: 0;
  bottom: 1%; 
`;


