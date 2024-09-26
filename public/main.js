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
});