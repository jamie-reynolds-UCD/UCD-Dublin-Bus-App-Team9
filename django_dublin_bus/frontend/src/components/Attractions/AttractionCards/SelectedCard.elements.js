import styled from 'styled-components';

export const SCardBody = styled.div`

  float: left;
  width: 25vw;
  height: 60vh;
  padding-right: 5%;
  padding-left: 5%;
  display: flex;
  flex-direction: column;

    @media screen and (max-width:600px) {
        position: relative;
    }
`
export const SCardImage = styled.img`
    float: left;
    width: 25vw;
    height: 25wh;
    object-fit: cover;

`
export const SCardTitle = styled.h1`
    line-height: 1.4rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
`
export const SCardLocation = styled.p`
    line-height: 1.2rem;
`

export const SCardTags = styled.div`

    font-size: 0.8rem;
    margin-top: 0.6rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    
`

export const SButtons = styled.div`

    bottom: 0;
    display: inline-flex;
    width: 100%;
    height: 20%;
    padding-left: 40%;
    align-content: center;
    right: 0;
    
`

export const SButton = styled.button`

    align-content: center;
    width: 50px;
    margin-right: 15px;
    
`

