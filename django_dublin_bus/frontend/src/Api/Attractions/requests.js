const requests  = {
    fetchAttractions: `opendata-api/v1/attractions?$filter=search.ismatch(%27Dublin%27,%27address/addressRegion%27)`,
} 

export default requests;