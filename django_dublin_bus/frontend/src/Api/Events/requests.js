const API_KEY = "rUYGMs3LUMaj7vfoJMJD6uOGGi1eIimX";

const requests  = {
    fetchSport: `/discovery/v2/events.json?classificationName=sport&city=Dublin&sort=date,asc&apikey=${API_KEY}`,
    fetchMusic: `/discovery/v2/events.json?classificationName=music&city=Dublin&sort=date,asc&apikey=${API_KEY}`,
    fetchComedy: `/discovery/v2/events.json?classificationName=comedy&city=Dublin&sort=date,asc&apikey=${API_KEY}`,
    fetchArts: `/discovery/v2/events.json?classificationName=arts&theatre&city=Dublin&sort=date,asc&apikey=${API_KEY}`,
    fetchAlt: `/discovery/v2/events.json?subGenreId=KZazBEonSMnZfZ7v6dt&city=Dublin&sort=date,asc&apikey=${API_KEY}`,
    fetchPop: `/discovery/v2/events.json?subGenreId=KZazBEonSMnZfZ7v6F1&city=Dublin&sort=date,asc&apikey=${API_KEY}`,
    fetchIndieFolk: `/discovery/v2/events.json?subGenreId=KZazBEonSMnZfZ7va1F&city=Dublin&sort=date,asc&apikey=${API_KEY}`,
    fetchOther: `/discovery/v2/events.json?subGenreId=KZazBEonSMnZfZ7vk1I&city=Dublin&sort=date,asc&apikey=${API_KEY}`,
} 

export default requests;