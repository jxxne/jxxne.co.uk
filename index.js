const express = require('express') 
const config = require('./config')
const path = require('path') 
const hbs = require('hbs') 
const app = express() 
const lastfmkey = config.LASTFM_KEY
const lastfmusername = "jxxne"
  
// View Engine Setup 
app.set('views', path.join(__dirname)) 
app.set('view engine', 'hbs') 
app.use(express.static('public'))
  
app.get('/', function(req, res){ 
    
}) 

app.get('/api/getTopTracks', (req, res) => {
    fetch("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" + lastfmusername + "&api_key=" + lastfmkey + "&period=7day&format=json", {method: "Get"})
    .then(res => res.json())
    .then((json) => {
        res.status(200).json(json);
    });
  });  
  
app.listen(8080, function(error){ 
    if(error) throw error 
    console.log("Server created Successfully") 
}) 
