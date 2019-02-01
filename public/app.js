const clearArticles = document.querySelector("#clear-articles");

document.addEventListener("DOMContentLoaded", event => {
    clearArticles.addEventListener("click", event => {
        fetch("/", {
            method: "DELETE"
        });
        location.reload();
    });

    

});