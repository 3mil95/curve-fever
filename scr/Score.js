const score = document.getElementById("score")
const startFrame = document.getElementById("start")
const startCont = document.getElementById("start-cont")


function showScore(scoreList) {
    var list = scoreList.slice();
    while (score.firstChild) {
        score.removeChild(score.firstChild);
    }
    list.sort((a, b) => {
        return b.score - a.score;
    })
    list.forEach(scoreEntery => {
        let div = document.createElement("div")
        div.className = "score-entery"
        let sc = document.createElement("p")
        sc.innerHTML = scoreEntery.score;
        sc.style.color = scoreEntery.color
        let name = document.createElement("p")
        name.innerHTML = scoreEntery.name
        name.style.color = scoreEntery.color
        div.appendChild(name)
        div.appendChild(sc)
        score.appendChild(div)
    });
}

function setStartVisible(state) {
    startFrame.style.display = state ? "block" : "none";
}

function showStart(player) {
    while (startCont.firstChild) {
        startCont.removeChild(startCont.firstChild);
    }
    player.forEach((playerEntery, i) => {
        let div = document.createElement("div")
        div.className = "start-entery"
        let name = document.createElement("p")
        name.innerHTML = playerEntery.name
        name.style.color = playerEntery.color
        let left = document.createElement("button")
        left.innerHTML = playerEntery.left===null ? "left" : String.fromCharCode(playerEntery.left)
        left.style.background = playerEntery.color
        left.addEventListener('click', () => {setEdeting(i, "left")})
        let right = document.createElement("button")
        right.innerHTML = playerEntery.right===null ? "right" : String.fromCharCode(playerEntery.right)
        right.style.background = playerEntery.color
        right.addEventListener('click', () => {setEdeting(i, "right")})
        div.appendChild(name)
        div.appendChild(left)
        div.appendChild(right)
        startCont.appendChild(div)
    });
}