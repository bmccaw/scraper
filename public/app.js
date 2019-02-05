const clearArticles = document.querySelector("#clear-articles");
const saveArticle = document.querySelector(".save");
const articleDiv = document.querySelector("#articles");
let noteModalElem;
let noteModalInst;

document.addEventListener("DOMContentLoaded", event => {
    clearArticles.addEventListener("click", event => {
        fetch("/", {
            method: "DELETE"
        });
        location.reload();
    });

    articleDiv.addEventListener("click", async (event) => {

        if (event.target && event.target.matches(".save")) {
            console.log(`clicked ${event.target.id}`);
            const id = event.target.id;
            await fetch(`/${id}`, {
                method: "PUT"
            });
            window.location.assign("/");
        }

        if (event.target && event.target.matches(".note")) {
            console.log(`clicked ${event.target.id}`);
            const id = event.target.dataset.id;
            noteModalElem = document.querySelector(`#modal${id}`);
            noteModalInst = M.Modal.init(noteModalElem);
            noteModalInst.open();
        }

    })

});