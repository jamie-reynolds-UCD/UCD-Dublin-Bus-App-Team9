import styled from 'styled-components';


export const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(17rem, 18rem));
    gap: 2rem;
    justify-content: center;
    padding-top: 40px;
    padding-left: 5%;
    padding-right: 5%;
    @media screen and (max-width:600px) {
        margin: 2rem;
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr;
        justify-content: center;
    }
`

export const WholeCard = styled.div`
    overflow: hidden;
  box-shadow: 0 2px 20px #e1e5ee;
  border-radius: 0.2rem;
  height: 40vh;
  width: 275px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 200ms ease-in;

    ::before,
    ::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    }
    &:hover {
    transform: scale(1.01); 
    }

    @media screen and (max-width:600px) {
        min-width: 28rem;
        display: flex;
        flex-direction: unset;
        height: 11rem;
    }
`

export const CardBody = styled.div`

    @media screen and (max-width:600px) {
        width: 50%;
        display: flex;
        flex-direction: column;
    }
`

export const CardImage = styled.img`
    float: left;
    width:  300px;
    height: 125px;
    object-fit: cover;

    @media screen and (max-width:600px) {
        width: 12rem;
        height: 11rem;
        display: flex;
    }
`
export const CardTitle = styled.h1`
    line-height: 1.4rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    font-size: 20px;
    font-family: 'Quicksand', 'sans-serif';

    @media screen and (max-width:600px) {
        line-height: 1.4rem;
        margin-bottom: 0.5rem;
        display: flex;
        padding-left: 5%;

    }
`
export const CardLocation = styled.p`
    line-height: 1.2rem;
    font-family: 'Quicksand', 'sans-serif';
    display: flex;
`

export const CardTags = styled.div`

    font-size: 0.8rem;
    margin-top: 0.6rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: center;
    font-family: 'Quicksand', 'sans-serif';

    @media screen and (max-width:600px) {
        float: left;
        white-space: pre-line;
    }

`

export const Buttons = styled.div`
    width: 100%;
    align-content: center;
    justify-content: flex-end;
    display: flex;
    font-family: 'Quicksand', 'sans-serif';
    padding-bottom: 5px;
    padding-right: 7%;
    
    @media screen and (max-width:600px) {
        float: left;
        bottom: 0;
    }
`
export const Divider = styled.div`
  width:5px;
  display:inline-block;
`
