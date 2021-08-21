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
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr;
        justify-content: center;
        padding-top: 20px;
        padding-left: 2%;
        padding-right: 2%;
    }
`

export const WholeCard = styled.div`
    overflow: hidden;
  box-shadow: 0 2px 20px #e1e5ee;
  border-radius: 0.2rem;
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
        min-width: 100%;
        display: flex;
        flex-direction: unset;
    }
`

export const CardBody = styled.div`
    @media screen and (max-width:600px) {
        width: 55%;
        display: flex;
        flex-direction: column;
        margin-left: 5%;
    }
`

export const CardImage = styled.img`
    float: left;
    width:  300px;
    height: 125px;
    object-fit: cover;

    @media screen and (max-width:600px) {
        width: 40%;
        height: 100%;
        display: flex;
    }
`
export const CardTitle = styled.h1`
    line-height: 1.4rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    font-size: 20px;
    text-align: center;
    font-family: 'Quicksand', 'sans-serif';

    @media screen and (max-width:600px) {
        line-height: 1.4rem;
        margin-bottom: 0.1rem;
        font-size: 16px;
        text-align: center;
    }
`
export const CardLocation = styled.p`
    line-height: 1.2rem;
    font-family: 'Quicksand', 'sans-serif';
    text-align: center;

    @media screen and (max-width:600px) {
        line-height: 0.5rem;
        font-size: 13px;

    }
`

export const CardTags = styled.div`
    font-size: 12px;
    margin-top: 0.6rem;
    margin-bottom: 10px;
    text-align: center;
    font-family: 'Quicksand', 'sans-serif';

    @media screen and (max-width:600px) {
        overflow-wrap: break-word;
        margin-bottom: 5px;
        font-size: 10px;
    }
`

export const Buttons = styled.div`
    width: 100%;
    align-content: center;
    justify-content: flex-end;
    display: flex;
    font-family: 'Quicksand', 'sans-serif';
    padding-bottom: 5px;
    padding-right: 10%;
    
    @media screen and (max-width:600px) {
        bottom: 0;
        padding-right: 7%;
        justify-content: center;
    }
`

export const Divider = styled.div`
  width:5px;
  display:inline-block;
`
