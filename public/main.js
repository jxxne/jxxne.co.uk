function revealWindow(pageId) {
    const pages = document.querySelectorAll("div.content");

    for(let i=0; i < pages.length; i++) {
        if(!pages[i].classList.contains("hidden")) {
            pages[i].classList.add("hidden");
            // NOTE: currently i want to add a fade animation, and this won't allow for that, as it's immediently both disabling visibility and setting the opacity to 0.
            // the solution is to transition the opacity, then remove visibility.
        }
    }
    document.getElementById(pageId).classList.remove("hidden");
}