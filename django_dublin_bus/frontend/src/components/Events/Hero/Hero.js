import React from 'react';
import { Header, AltHeader, Text } from './Hero.elements';
import { Parallax, Background } from 'react-parallax';


const Hero = (head, text, head2, image, setheight) => {

    return (
    <Parallax strength={500}>
      <div style={{ height: setheight }} >
        <Header>{head}</Header>
        <Text>{text}</Text>
        <AltHeader>{head2}</AltHeader>
        </div>
      <Background className="custom-bg">
        <div
          style={{
            height: 2000,
            width: 2000,
            backgroundImage: "url('" + image + "')"
          }}
        />
      </Background>
    </Parallax>
    );
};

export default Hero
