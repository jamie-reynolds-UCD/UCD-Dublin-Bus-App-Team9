import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Typography } from "@material-ui/core";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
} from "./Navbar.elements";
import AuthContext from "../Auth/AuthContext";
import { Logout } from "../../Api/ApiFunctions";
import Weather from "../Weather/Weather";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/" onClick={closeMobileMenu}>
              <NavIcon />
              <Typography variant="h6"> Explore Dublin</Typography>
            </NavLogo>

            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>

            <Weather />
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to="/" onClick={closeMobileMenu}>
                  Home
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/Events" onClick={closeMobileMenu}>
                  Events
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/Attractions" onClick={closeMobileMenu}>
                  Attractions
                </NavLinks>
              </NavItem>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

/*<NavItemBtn>
{button ? (
  <NavBtnLink to={button_link}>
    <Button primary>{profile_button_text}</Button>
  </NavBtnLink>
) : (
  <NavBtnLink to={button_link}>
    <Button onClick={closeMobileMenu} fontBig primary>
      {profile_button_text}
    </Button>
  </NavBtnLink>
)}
</NavItemBtn>*/
