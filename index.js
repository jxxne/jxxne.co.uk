const express = require('express') 
const config = require('./config')
const path = require('path') 
const hbs = require('hbs') 
const app = express() 
const cache = require('memory-cache')

const lastfmkey = config.LASTFM_KEY
const lastfmusername = "jxxne"
  


// View Engine Setup 
app.set('views', path.join(__dirname)) 
app.set('view engine', 'hbs') 
app.use(express.static('public'))
  
app.get('/', function(req, res){ 
    
}) 

app.get('/api/getTopTracks', (req, res) => {
    const cachedTopTracks = cache.get('cachedTopTracks');
    if(cachedTopTracks) {
        res.status(200).json(cachedTopTracks)
    } else {
        fetch("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" + lastfmusername + "&api_key=" + lastfmkey + "&period=7day&format=json", {method: "Get"})
        .then(res => res.json())
        .then((json) => {
            cache.put('cachedTopTracks', json, 60*60*1000)
            res.status(200).json(json)
        });
    }
  });  
  
app.listen(8080, function(error){ 
    if(error) throw error 
    console.log("Server created Successfully") 
}) 
