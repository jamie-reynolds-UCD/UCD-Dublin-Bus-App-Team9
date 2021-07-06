import React from 'react'

export default function MoreInfo(SelEvent) {

    return (
        <div>
            <p>{SelEvent.name}</p>
            <p>{SelEvent.dates.start.localTime}</p>
            <p>{SelEvent.dates.start.localDate}</p>
            <p>{SelEvent._embedded.venues[0].name}</p>
            <p>{SelEvent._embedded.venues[0].address.line1}</p>
            <p>{SelEvent._embedded.venues[0].location.latitude}</p>
            <p>{SelEvent._embedded.venues[0].location.longitude}</p>
            <form action={SelEvent.url} method="get" target="_blank">
            <button type="submit">Buy Tickets</button>
            </form>
        </div>
    )
}
