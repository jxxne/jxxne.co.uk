function revealWindow(pageId) {
    const pages = document.querySelectorAll("div.content");

    for(let i=0; i < pages.length; i++) {
        if(!pages[i].classList.contains("hidden")) {
            pages[i].classList.add("hidden");
        }
    }
    document.getElementById(pageId).classList.remove("hidden");

    menu = document.getElementById("mobile-menu");
        toggle = document.getElementById("menu-button");

    if(menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.classList.remove("active");
        document.body.style.backgroundColor = "#000000"; 
    } 
}

$.getJSON('../api/getTopTracks', function(data) {

    document.getElementById("abouttrackname").setAttribute("href",data["toptracks"]["track"][0]["url"]);
    document.getElementById("abouttrackname").innerHTML = document.getElementById("abouttrackname").innerHTML.replace("INSERTTRACKHERE", data["toptracks"]["track"][0]["artist"]["name"].toLowerCase() + " - " + data["toptracks"]["track"][0]["name"].toLowerCase());
    for (let i = 0; i < 10; i++) {
        document.getElementById("listening").innerHTML = document.getElementById("listening").innerHTML + '<div class="item">             <p class="artistname" style="left: 10px;">'+ truncateString(data["toptracks"]["track"][i]["artist"]["name"].toLowerCase(), 36) +'</p>             <p class="trackname" style="left: 10px;">'+ data["toptracks"]["track"][i]["name"].toLowerCase() +'</p>             <p class="position">' + (i+1) + '</p>           </div>';
    }
    /*document.getElementById("abouttrackname").innerHTML = document.getElementById("abouttrackname").innerHTML.replace("INSERTTRACKHERE", data["toptracks"]["track"][0]["artist"]["name"].toLowerCase() + " - " + data["toptracks"]["track"][0]["name"].toLowerCase())
    document.getElementById("abouttrackname").setAttribute("href",data["toptracks"]["track"][0]["url"]);
    for (let i = 0; i < 10; i++) {
        document.getElementById("listening").innerHTML = document.getElementById("listening").innerHTML + '<div class="item">             <img src="' + data["toptracks"]["track"][0]["image"][1]["#text"] + '" class="backgroundimage">             <img style="z-index: 5;" src="' + data["toptracks"]["track"][i]["image"][1]["#text"] + '">             <p class="artistname">'+ data["toptracks"]["track"][i]["artist"]["name"].toLowerCase() +'</p>             <p class="trackname">'+ data["toptracks"]["track"][i]["name"].toLowerCase() +'</p>             <p class="position">' + (i+1) + '</p>           </div>';

       $.getJSON('../api/getTrackInfo/'+data["toptracks"]["track"][i]["name"]+"/"+data["toptracks"]["track"][i]["artist"]["name"], function(trackdata) {
            document.getElementById("listening").innerHTML = document.getElementById("listening").innerHTML + '<div class="item">             <img src="' + trackdata["track"]["album"]["image"][1]["#text"] + '" class="backgroundimage">             <img style="z-index: 5;" src="' + trackdata["track"]["album"]["image"][1]["#text"] + '">             <p class="artistname">'+ data["toptracks"]["track"][i]["artist"]["name"].toLowerCase() +'</p>             <p class="trackname">'+ data["toptracks"]["track"][i]["name"].toLowerCase() +'</p>             <p class="position">' + (i+1) + '</p>           </div>';
        })
    }*/
});

$.getJSON('../api/getRecentTracks', function(data) {
    for (let i = 0; i < 10; i++) {
        document.getElementById("recent").innerHTML = document.getElementById("recent").innerHTML + '<div class="item">             <img src="' + data["recenttracks"]["track"][i]["image"][1]["#text"] + '" class="backgroundimage">             <img style="z-index: 5;" src="' + data["recenttracks"]["track"][i]["image"][2]["#text"] + '">             <p class="artistname">'+ truncateString(data["recenttracks"]["track"][i]["artist"]["#text"].toLowerCase(), 28) +'</p>             <p class="trackname">'+ truncateString(data["recenttracks"]["track"][i]["name"].toLowerCase(), 22) +'</p>             <p class="position">' + (i+1) + '</p>           </div>';
    }
});


$.getJSON('../api/getDiscordUser', function(data) {
    document.getElementById("discordpfp").setAttribute("src", data["avatar"]);
    document.getElementById("discordbanner").setAttribute("src", data["banner"]);
    document.getElementById("discorddisplayname").innerText = data["displayName"];
    document.getElementById("discordusername").innerText = data["username"];
    if (Array.isArray(data["activities"]) && data["activities"].length > 0) {
        const activity = data["activities"][0];
        if (activity && activity["type"] !== undefined) {
            switch (activity["type"]) {
                case 0: {
                    const pastDate = new Date(activity["timestamps"]["start"]);
                    console.log(pastDate);
                    const currentDate = new Date();
                    let timeElapsed = "";
                    if ((currentDate - pastDate) / (1000 * 60 * 60) >= 1) {
                        timeElapsed = Math.floor((currentDate - pastDate) / (1000 * 60 * 60)) + " hours";
                    } else {
                        timeElapsed = Math.floor((currentDate - pastDate) / (1000 * 60)) + " minutes";
                    }
                    document.getElementById("discordactivity").innerText = 
                        "on " + activity["name"].toLowerCase() + " for " + timeElapsed;
                    break;
                }
                case 1:
                    // streaming
                    break;
                case 2:
                    document.getElementById("discordactivity").innerText = 
                        "listening to " + activity["details"].toLowerCase() + 
                        " by " + activity["state"].toLowerCase();
                    break;
                case 3:
                    // watching
                    break;
                case 4:
                    document.getElementById("discordactivity").innerText = 
                        "\"" + activity["state"] + "\"";
                    break;
                case 5:
                    // competing
                    break;
                default:
                    break;
            }
        }
    }
    switch(data["status"]) {
        default:
            document.getElementById("discordstatus").innerText = "offline";
            document.getElementById("discordstatusbg").style.backgroundColor = "rgb(124, 127, 136)";
            break;
        case 'dnd':
            document.getElementById("discordstatus").innerText = "do not disturb";
            document.getElementById("discordstatusbg").style.backgroundColor = "rgb(223, 79, 75)";
            break;
        case 'idle':
            document.getElementById("discordstatus").innerText = "idle";
            document.getElementById("discordstatusbg").style.backgroundColor = "rgb(231, 181, 78)";
            break;
        case 'online':
            document.getElementById("discordstatus").innerText = "online";
            document.getElementById("discordstatusbg").style.backgroundColor = "rgb(80, 163, 97)";
            break;
    }
});

function truncateString(string, maxlength) {
    if(string.length > maxlength) {
        return string.substring(0, maxlength-3) + "...";
    } else{
        return string;
    }
}
/*
for (let i = 0; i < 10; i++) {
    document.getElementById("listening").innerHTML = document.getElementById("listening").innerHTML + '<div class="item">             <img src="' + data["recenttracks"]["track"][i]["image"][1]["#text"] + '" class="backgroundimage">             <img style="z-index: 5;" src="' + data["recenttracks"]["track"][i]["image"][1]["#text"] + '">             <p class="artistname">'+ data["recenttracks"]["track"][i]["artist"]["#text"].toLowerCase() +'</p>             <p class="trackname">'+ data["recenttracks"]["track"][i]["name"].toLowerCase() +'</p>             <p class="position">' + (i+1) + '</p>           </div>';
    console.log(i);
  }*/

    function mobileMenu() {
        menu = document.getElementById("mobile-menu");
        toggle = document.getElementById("menu-button");
        if(menu.classList.contains("active")) {
            menu.classList.remove("active");
            toggle.classList.remove("active");
            document.body.style.backgroundColor = "#000000"; 
        } else {
            menu.classList.add("active");
            toggle.classList.add("active");
            document.body.style.backgroundColor = "#180e4c";
        }
    }