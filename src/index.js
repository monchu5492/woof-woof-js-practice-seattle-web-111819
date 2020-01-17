    document.addEventListener("DOMContentLoaded", () => { 
        getAllPups()
        getFilterButton() 
    })
    
    const baseURL = "http://localhost:3000/pups"

    const clearDogBar = () => {
        let dogBar = document.getElementById("dog-bar")
        while (dogBar.children[0]) {
            dogBar.children[0].remove()
        }
    }

const getAllPups = () => {
    clearDogBar()
    fetch(baseURL)
    .then(res => res.json())
    .then(json => json.forEach(pup => spanPupName(pup)))
}

const spanPupName = (pup) => {
    let spanEl = document.createElement("span")
    let thisPup = pup
    spanEl.classList.add(`pup-span`)
    spanEl.innerText = pup.name
    spanEl.onclick = () => {
        showPup(thisPup)
    }
    appendPup(spanEl)
}

const appendPup = (spanEl) => {
    let dogSpanBar = document.getElementById("dog-bar")
    dogSpanBar.appendChild(spanEl)
}

const showPup = thisPup => {
    const dogInfo = document.querySelector("#dog-info")
        dogInfo.textContent = ""
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
        .then(json => showPup(json))
}

const getFilterButton = () => {
    document.getElementById("good-dog-filter")
    .onclick = (e) => {
        changeGoodDogFilterText(e)
    }
}

const getDogsAgain = () => {
    fetch(baseURL)
    .then(res => res.json())
    .then(json => allGoodDogs(json))
}

const changeGoodDogFilterText = (e) => {
    if (e.target.innerText.includes("OFF")) {
        e.target.innerText = "Filter good dogs: ON"
        getDogsAgain()
    } else {
        e.target.innerText = "Filter good dogs: OFF"
        getAllPups()
    }
}

const allGoodDogs = (pups) => {
    let goodDogs = []
    clearDogBar()
    pups.forEach(pup => {
        pup.isGoodDog ? goodDogs.push(pup) : null
    })
    goodDogs.forEach(goodPup => {
        spanPupName(goodPup)
    })
    goodDogs = []
}