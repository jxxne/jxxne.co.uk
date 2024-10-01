function revealWindow(pageId) {
    const pages = document.querySelectorAll("div.content");

    for(let i=0; i < pages.length; i++) {
        if(!pages[i].classList.contains("hidden")) {
            pages[i].classList.add("hidden");
        }
    }
    document.getElementById(pageId).classList.remove("hidden");
}

$.getJSON('../api/getTopTracks', function(data) {
    document.getElementById("abouttrackname").innerHTML = document.getElementById("abouttrackname").innerHTML.replace("INSERTTRACKHERE", data["toptracks"]["track"][0]["artist"]["name"].toLowerCase() + " - " + data["toptracks"]["track"][0]["name"].toLowerCase())
    document.getElementById("abouttrackname").setAttribute("href",data["toptracks"]["track"][0]["url"]);
    for (let i = 0; i < 10; i++) {
        document.getElementById("listening").innerHTML = document.getElementById("listening").innerHTML + '<div class="item">             <img src="' + data["toptracks"]["track"][0]["image"][1]["#text"] + '" class="backgroundimage">             <img style="z-index: 5;" src="' + data["toptracks"]["track"][i]["image"][1]["#text"] + '">             <p class="artistname">'+ data["toptracks"]["track"][i]["artist"]["name"].toLowerCase() +'</p>             <p class="trackname">'+ data["toptracks"]["track"][i]["name"].toLowerCase() +'</p>             <p class="position">' + (i+1) + '</p>           </div>';

       /*$.getJSON('../api/getTrackInfo/'+data["toptracks"]["track"][i]["name"]+"/"+data["toptracks"]["track"][i]["artist"]["name"], function(trackdata) {
            document.getElementById("listening").innerHTML = document.getElementById("listening").innerHTML + '<div class="item">             <img src="' + trackdata["track"]["album"]["image"][1]["#text"] + '" class="backgroundimage">             <img style="z-index: 5;" src="' + trackdata["track"]["album"]["image"][1]["#text"] + '">             <p class="artistname">'+ data["toptracks"]["track"][i]["artist"]["name"].toLowerCase() +'</p>             <p class="trackname">'+ data["toptracks"]["track"][i]["name"].toLowerCase() +'</p>             <p class="position">' + (i+1) + '</p>           </div>';
        })*/
    }
});

$.getJSON('../api/getRecentTracks', function(data) {
    for (let i = 0; i < 10; i++) {
        document.getElementById("recent").innerHTML = document.getElementById("recent").innerHTML + '<div class="item">             <img src="' + data["recenttracks"]["track"][i]["image"][1]["#text"] + '" class="backgroundimage">             <img style="z-index: 5;" src="' + data["recenttracks"]["track"][i]["image"][2]["#text"] + '">             <p class="artistname">'+ data["recenttracks"]["track"][i]["artist"]["#text"].toLowerCase() +'</p>             <p class="trackname">'+ truncateString(data["recenttracks"]["track"][i]["name"].toLowerCase(), 22) +'</p>             <p class="position">' + (i+1) + '</p>           </div>';
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