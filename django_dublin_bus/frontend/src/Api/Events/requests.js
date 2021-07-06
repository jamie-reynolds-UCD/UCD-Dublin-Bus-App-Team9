const API_KEY = "rUYGMs3LUMaj7vfoJMJD6uOGGi1eIimX";

const requests  = {
    fetchSport: `/discovery/v2/events.json?classificationName=sport&city=Dublin&apikey=${API_KEY}`,
    fetchMusic: `/discovery/v2/events.json?classificationName=music&city=Dublin&apikey=${API_KEY}`,
    fetchComedy: `/discovery/v2/events.json?classificationName=comedy&city=Dublin&apikey=${API_KEY}`,
} 

export default requests;
