import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiBus } from 'react-icons/bi';


export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Quicksand", "sans-serif";
  text-align: center;
`;


export const FooterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1000px;
  margin: 40px auto 0 auto;
  text-align: center;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const FooterLinkItems = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  text-decoration: none;
  text-align: center;
  width: 160px;

  @media screen and (max-width: 600px) {
    margin: 0;
    display: inline-block;
  } 
`;

export const FooterLink = styled(Link)`
  color: #101522;
  text-decoration: none;
  &:hover {
    color: #0467fb;
  }
  @media screen and (max-width: 600px) {
    padding-bottom: 20px;
    padding-left: 8px;
  } 
`;

export const Logo = styled(Link)`
  color: #101522;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-left: 25px;
  text-decoration: none;
`;

export const Icon = styled(BiBus)`
  margin-right: 8px;
`;

export const WebsiteRights = styled.p`
  color: #101522;
  margin-bottom: 16px;
  font-size: 12px;
`;


