const express = require('express') 
const config = require('./config')
const path = require('path') 
const hbs = require('hbs') 
const app = express() 
const cache = require('memory-cache')
const { Client, GatewayIntentBits } = require('discord.js');

const lastfmkey = config.LASTFM_KEY
const lastfmusername = "jxxne"
  
const discordtoken = config.DISCORD_TOKEN
const discordid = "1096132124983165039";

// View Engine Setup 
app.set('views', path.join(__dirname)) 
app.set('view engine', 'hbs') 
app.use(express.static('public'))
app.use(express.json());
  
app.get('/', function(req, res){ 
    
}) 

const discordclient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages
    ]
});

app.get('/api/getDiscordUser', async (req, res) => {
    try {
        const userId = discordid;
        const user = await discordclient.users.fetch(userId);
        const userData = {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            avatar: user.displayAvatarURL({ size: 512 }),
            banner: user.bannerURL({ size: 512 }),
        };
        res.json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.get('/api/getTopTracks', (req, res) => {
    const cachedTopTracks = cache.get('cachedTopTracks');
    if(cachedTopTracks) {
        res.status(200).json(cachedTopTracks)
    } else {
        fetch("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" + lastfmusername + "&api_key=" + lastfmkey + "&period=7day&format=json", {method: "Get"})
        .then(res => res.json())
        .then((json) => {
            res.status(200).json(json)
            cache.put('cachedTopTracks', json, 60*60*1000)
            console.log("Top tracks cache is empty/has expired, saving cache")
        });
    }
  });  

  app.get('/api/getTrackInfo/:track/:artist', (req, res) => {
    const track = req.params.track;
    const artist = req.params.artist;

    const cachedTrackInfo = cache.get('cachedTrackInfoFor' + track + artist);
    if(cachedTrackInfo) {
        res.status(200).json(cachedTrackInfo)
    } else {
        fetch("http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=" + lastfmkey + "&artist=" + artist + "&track="+track+"&format=json", {method: "Get"})
        .then(res => res.json())
        .then((json) => {
            res.status(200).json(json)
            cache.put('cachedTrackInfoFor' + track + artist, json)
            console.log(track + " by " + artist + " hasn't had it's album info cached. Saving Cache.")
        });
    }
  });  

  app.get('/api/getRecentTracks', (req, res) => {
    const cachedRecentTracks = cache.get('cachedRecentTracks');
    if(cachedRecentTracks) {
        res.status(200).json(cachedRecentTracks)
    } else {
        fetch("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + lastfmusername + "&api_key=" + lastfmkey + "&format=json", {method: "Get"})
        .then(res => res.json())
        .then((json) => {
            res.status(200).json(json)
            console.log("Recent tracks cache is empty/has expired, saving cache")
            cache.put('cachedRecentTracks', json, 60*60*1000)
        });
    }
  });  
  
app.listen(8080, function(error){ 
    if(error) throw error 
    console.log("Server created Successfully") 
}) 

discordclient.once('ready', () => {
    console.log(`Logged in as ${discordclient.user.tag}`);
});

discordclient.login(discordtoken);