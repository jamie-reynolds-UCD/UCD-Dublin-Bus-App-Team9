import React, { useState, useEffect } from 'react';
import axios from "../../../Api/Events/axios";
import { RowContainer, PosterImg, PosterInfo, PosterText, PosterHead, RowPosters, RowHeading } from "./Row.elements";
import MoreInfo from '../MoreInfo/MoreInfo';


function Row({ title, fetchUrl }) {

    const [events, setEvents] = useState([]);
    const [selEvent, setEvent] = useState("");

    // Snippet of code that runs based on a specific condition/variable
    // Function pulls information from Ticketmaster when the row function is called
    useEffect(() => {
        
        async function fetchData() {
            //wait for answer to come back and then do something
            const request = await axios.get(fetchUrl);
            setEvents(request.data._embedded.events);
            return request;
        }
        fetchData();
        // if [], run once when the row loads and don't run again
        //Have to include variable below because useEffect depends on the variable
        //Using a var which is passed from outside the block, need to tell useEffect this
    }, [fetchUrl]);

    const HandleClick = (event) => {
        if (selEvent) {
            setEvent("");
        } else {
            setEvent(event);
        }  
    }
    console.log(events);

    return (
        <RowContainer>
            <RowHeading>{title}</RowHeading> 
                <RowPosters>
                {events.map(event => [
                    <PosterInfo key={event.id} onClick={() => HandleClick(event)}>
                        <PosterImg key={event.id}  
                        src={event.images[0]['url']} 
                        alt={event.name}></PosterImg>
                        <PosterHead>{event.name}</PosterHead>
                        <PosterText>{event.dates.start.localTime}{'\n'}{event.dates.start.localDate}</PosterText>
                    </PosterInfo>
                ])}
                </RowPosters>
            {/*If an event is selcted, show the information window  */}  
            { selEvent && MoreInfo(selEvent) }
        </RowContainer>
    );
}

export default Row
