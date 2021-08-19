import styled from 'styled-components';

export const LoadButton = styled.button`

    align-content: center;
    overflow: hidden;
    width: 100%;
    height: 5%;
    display:inline-block;
    padding:2em 1.2em;
    border:0.1em solid #FFFFFF;
    margin-top: 1.7em;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Quicksand', 'sans-serif';
    font-weight:300;
    color:#000;
    text-align:center;
    transition: all 0.2s;
    
    &:hover {
    color:#000;
    background-color:#FFFFFF;

    }
`
export const LoadButtonCont = styled.div`
    padding-top: 2%;
    align-content: center;
    width: 100%;
`

export const TagButtons = styled.div`

    overflow-x: auto;
    white-space: nowrap;
    padding-top: 1%;
    width: 100%;
    font-family: 'Quicksand', 'sans-serif';

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
`


export const TagButton = styled.button`

    display:inline-block;
    padding:0.5em 3em;
    border:0.16em solid #64b5f6;
    margin:0 0.3em 0.3em 0;
    box-sizing: border-box;
    text-decoration:none;
    text-transform:uppercase;
    font-family: 'Quicksand', 'sans-serif';
    font-weight:400;
    color:#000;
    text-align:center;
    transition: all 0.15s;
    
    &:hover {
    color: #000;
    border-color: #e57373;
    }

    &:active{
    color:#000;
    border-color:#e57373;
    }

    &:focus{
    color:#000;
    border-color:#e57373;
    }
`