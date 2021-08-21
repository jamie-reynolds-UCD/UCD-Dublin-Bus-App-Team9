import styled from "styled-components";
import { BiBus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Container } from "../../globalStyles";

export const Nav = styled.nav`
  background: #101522;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 100000000;

  @media screen and (max-height: 700px) {
    height: 10vh;
  }
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 10vh;
  z-index: 1000000000;
  @media screen and (max-height: 700px) {
    height: 10vh;
  }

  ${Container}
`;

export const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;

  @media screen and (max-height: 700px) {
    font-size: 1.4rem;
  }
`;

export const NavIcon = styled(BiBus)`
  margin-right: 0.5rem;
  font-family: "Quicksand", "sans-serif";
`;

export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 70%);
    font-size: 1.8rem;
    cursor: pointer;
  }

  @media screen and (max-height: 700px) {
    font-size: 1.4rem;
    transform: translate(-100%, 60%);
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  font-family: "Quicksand", "sans-serif";
  z-index: 1000000000;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 10vh;
    left: ${({ click }) => (click ? 0 : "-100%")};
    opacity: 1;
    transition: all 0.5s ease;
    background: #101522;
  }

`;

export const NavItem = styled.li`
  height: 70px;
  border-bottom: 2px solid transparent;
  font-family: "Quicksand", "sans-serif";

  &:hover {
    border-bottom: 2px solid #4b59f7;
  }

  @media screen and (max-width: 960px) {
    width: 100%;

    &:hover {
      border: none;
    }
  }
`;

export const NavItemBtn = styled.li`
  @media screen and (max-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
  }
`;

export const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;

    &:hover {
      color: #4b59f7;
      transition: all 0.3s ease;
    }
  }
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`;


export const WeatherIcon = styled.img`
  height: 35px;
  width: 30px;
  padding-right: 5px;
  @media screen and (max-width: 960px) {
    display: none
  }
`;

export const WeatherDesc = styled.div`

  color: #fff;
  font-size: 14px;
  font-family: "Quicksand", "sans-serif";
  border-bottom: 2px solid transparent;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;

  @media screen and (max-width: 960px) {
    text-align: center;
    width: 100%;
    display: table;
    color: #4b59f7;

    &:hover {
      color: #fff;
      transition: all 0.3s ease;
    }
  }
`;
