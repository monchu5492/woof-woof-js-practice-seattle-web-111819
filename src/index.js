document.addEventListener("DOMContentLoaded", () => { 
   getAllPups()
})

const getAllPups = () => {
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(json => singlePup(json))
}

const singlePup = (json) => {
    json.forEach(pup => {
        spanPupName(pup)
    })
}

const spanPupName = (pup) => {
    let thisPup = pup
    let spanEl = document.createElement("span")
    spanEl.classList.add(`pup-span`)
    spanEl.innerText = pup.name
    spanEl.onclick = () => {
        showPup(thisPup)
    }
    appendPup(spanEl)
}

const appendPup = (spanEl) => {
    document.getElementById("dog-bar").appendChild(spanEl)
}

const showPup = thisPup => {
    const dogInfo = document.querySelector("#dog-info")
        dogInfo.innerHTML = ""
    let tPup = thisPup
    
    let pupImg = document.createElement("img")
        pupImg.src = tPup.image

    let pupNameH2 = document.createElement("h2")
        pupNameH2.innerText = tPup.name

    let goodDogButton = document.createElement("button")
        goodDogButton.classList = "good-dog"
        goodDogButton.innerText = tPup.isGoodDog ? "Good Dog!" : "Bad Dog"
        goodDogButton.onclick = (e) => {
            goodDogButtonClick(e, tPup)
        } 
        dogInfo.append(pupImg, pupNameH2, goodDogButton)
    }

    const goodDogButtonClick = (e, tpup) => {
        let myPup = tpup
        if (e.target.innerText.includes("Good")){
            e.target.innerText = "Bad Dog"
        } else {
            e.target.innerText = "Good Dog"
        }
        updateIsGoodBoy(myPup)
}

const baseURL = "http://localhost:3000/pups"


const updateIsGoodBoy = (myPup) => {
    let opoGoodDog = myPup.isGoodDog
    opoGoodDog = !opoGoodDog
    fetch(baseURL + '/' + myPup.id,{
        method: "PATCH",
        headers:{
            "Content-Type": "Application/json",
            Accept: "Application/json"
        },
        body:
            JSON.stringify({
                isGoodDog: opoGoodDog
            })
        })
        .then(res => res.json())
        .then(json => console.log(json))
}