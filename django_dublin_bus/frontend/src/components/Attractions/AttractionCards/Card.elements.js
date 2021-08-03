import styled from 'styled-components';


export const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(17rem, 18rem));
    gap: 2rem;
    justify-content: center;
    padding-top: 40px;
`

export const CardBody = styled.div`
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

    @media screen and (min-width:600px) {
        flex-direction: column;
        text-align: center;
        min-width: 14rem;
    }
`

export const CardImage = styled.img`
    float: left;
    width:  300px;
    height: 100px;
    object-fit: cover;

`
export const CardTitle = styled.h1`
    line-height: 1.4rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
`
export const CardLocation = styled.p`
    line-height: 1.2rem;
`

export const CardTags = styled.div`

    font-size: 0.8rem;
    margin-top: 0.6rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    
`

export const Tag = styled.p`

`

export const Buttons = styled.div`
    display: inline-flex;
    width: 100%;
    height: 20%;
    padding-left: 40%;
    align-content: center;
    right: 0;
    
`

export const Button = styled.button`

    align-content: center;
    width: 50px;
    margin-right: 15px;
    
`

