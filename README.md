# jxxne.co.uk

the code for my website. as of writing, it's not really functional - just static html in the public directory. features need to be added like blogs, admin panel, etc.



## using api keys
the site currently requires an api key for last.fm integration, and a discord bot. to do this, create a file called `config.js` in the directory of the app, and add the following:

```
module.exports = {
    LASTFM_KEY : 'insert your last fm key here!!!',
    DISCORD_TOKEN : 'insert discord bot token here!!!',
}
```

you can get an api key for last.fm [here,](https://www.last.fm/api/authentication) and for discord [here.](https://discord.com/developers/applications) please note, you will have to enable intents on the discord bot.