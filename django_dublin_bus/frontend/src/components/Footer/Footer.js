import React from 'react';
import {
    FooterContainer,
    FooterLinkItems,
    FooterLink,
    FooterWrap,
    WebsiteRights,
    Logo,
    Icon
  } from './Footer.elements';
  

export default function Footer() {
    return (
        <>
    <FooterContainer> 
        <FooterWrap>
            <Logo to='/'>
                <Icon />
                Explore Dublin
            </Logo>
            <WebsiteRights>Explore Dublin 2021</WebsiteRights>
                    <FooterLinkItems>
                        <FooterLink to='/'>Home</FooterLink>
                        <FooterLink to='/Events'>Events</FooterLink>
                        <FooterLink to='/Attractions'>Attractions</FooterLink>
                    </FooterLinkItems>
        </FooterWrap>
    </FooterContainer>
        </>
    );
};
