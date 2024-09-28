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
    console.log(data["toptracks"]["track"][0]["artist"]["name"].toLowerCase() + " - " + data["toptracks"]["track"][0]["name"].toLowerCase());

    for (let i = 0; i < 10; i++) {
        document.getElementById("listening").innerHTML = document.getElementById("listening").innerHTML + '<div class="item">             <img src="' + data["toptracks"]["track"][0]["image"][1]["#text"] + '" class="backgroundimage">             <img style="z-index: 5;" src="' + data["toptracks"]["track"][i]["image"][1]["#text"] + '">             <p class="artistname">'+ data["toptracks"]["track"][i]["artist"]["name"].toLowerCase() +'</p>             <p class="trackname">'+ data["toptracks"]["track"][i]["name"].toLowerCase() +'</p>             <p class="position">' + (i+1) + '</p>           </div>';
        console.log(i);
      }
});

console.log