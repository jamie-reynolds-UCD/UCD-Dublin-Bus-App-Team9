import React from 'react';
import { Marker, InfoWindow } from "react-google-maps";

export default class MarkerWithInfoWindow extends React.Component {

    constructor() {
        super();
        this.state = {
            isOpen: false
        }
        this.onToggleOpen = this.onToggleOpen.bind(this);
    }

    onToggleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Marker
                position={this.props.position}
                onClick={this.onToggleOpen}>
                {this.state.isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
                <React.Fragment><h3>{this.props.content}</h3></React.Fragment>
                </InfoWindow>}
            </Marker>        
        );
    };
};

