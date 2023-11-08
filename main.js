const container = document.querySelector(".container")
const form = document.querySelector(".form")
const search = document.querySelector(".search");
const buttonClear = document.querySelector(".btn-clear")
const imageList = document.querySelector(".image-wrapper")

let value;
search.addEventListener("keyup", (e) => {
    value = e.target.value
})

form.addEventListener("submit", (e) => {
    e.preventDefault()

    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID eX0ypdPjtG5cwLPmKqx-llRObO4VxEdT3zeKZzhwS3s"
        }
    })
        .then(res => res.json())
        .then(data => {
            Array.from(data.results).forEach((img) => {
                addImageToUI(img.urls.small)
            })
        })
        .catch(err => console.log(err))
})




buttonClear.addEventListener("click", () => {
    search.value = "";
    imageList.innerHTML = "";
})

search.addEventListener("keyup", (e) => {
    if (e.target.value.length >= 0) {
        buttonClear.classList.remove("d-none")
        container.style.paddingTop = "10vh"
    } else {
        buttonClear.classList.add("d-none")
    }
})

const addImageToUI = (url) => {
    let html = `<li> <img src="${url}" alt="${url}" /></li>`
    imageList.innerHTML += html
}