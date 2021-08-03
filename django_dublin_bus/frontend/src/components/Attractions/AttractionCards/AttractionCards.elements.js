import styled from 'styled-components';

export const LoadButton = styled.button`

    align-content: center;
    width: 100%;
    height: 5%;
    display:inline-block;
    padding:2em 1.2em;
    border:0.1em solid #FFFFFF;
    margin:0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
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

    overflow: auto;
    white-space: nowrap;
    padding-top: 1%;
    width: 100%;

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
    border:0.16em solid #706f6f;
    margin:0 0.3em 0.3em 0;
    box-sizing: border-box;
    text-decoration:none;
    text-transform:uppercase;
    font-family:'Roboto',sans-serif;
    font-weight:400;
    color:#706f6f;
    text-align:center;
    transition: all 0.15s;
    
    &:hover {
    color: #000;
    border-color: #000;
    }

    &:active{
    color:#4B59F7;
    border-color:#4B59F7;
    }

    &:focus{
    color:#4B59F7;
    border-color:#4B59F7;
    }
`

export const attractionWindow = styled.div`
    padding-left: 10%;
    align-content: center;
    width: 30%;
    height: 10%;
    float: right;
`