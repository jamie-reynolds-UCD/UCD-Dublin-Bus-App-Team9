import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../../globalStyles";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink,
} from "./Navbar.elements";
import AuthContext from "../Auth/AuthContext";
import { Logout } from "../../Api/ApiFunctions";

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

  let { loggedin, updatecredentials } = useContext(AuthContext);

  let profile_button_text = loggedin ? "PROFILE" : "SIGN UP";

  let button_link = loggedin ? "/profile" : "/signup";

  const LogoutUser = async () => {
    await Logout();
    updatecredentials();
  };

  window.addEventListener("resize", showButton);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/" onClick={closeMobileMenu}>
              <NavIcon />
              Dublin Bus
            </NavLogo>
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to="/" onClick={closeMobileMenu}>
                  Home
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/services" onClick={closeMobileMenu}>
                  Timetables
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='/Events' onClick={closeMobileMenu}>
                  Events
                </NavLinks>
              </NavItem>

              {loggedin ? (
                <NavItem>
                  <NavLinks to="/" onClick={LogoutUser}>
                    Logout
                  </NavLinks>
                </NavItem>
              ) : null}
              <NavItemBtn>
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
              </NavItemBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
