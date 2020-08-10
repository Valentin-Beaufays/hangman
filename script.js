const dict = ["hello", "world", "anticonstitutionnellement", "valentin"];
const alpha = "abcdefghijklmnopqrstuvwxyz";
let random = "";
let lives = 0;
let find = "";
let guessed = "";
let startBtn = document.getElementById("startBtn");
let game = document.getElementById("game")


startBtn.addEventListener("click", () => {
    random = getRandom();
    document.getElementById("start").style.display = "none";
    document.getElementById("game").style.display = "flex";
    setupGame();
    startGame();
});

function setupGame(){
    for(let i = 0; i < random.length; i++){
        let div = document.createElement("div");
        div.className = "letter";
        div.innerHTML = "_";
        div.setAttribute("id", "letter" + i);
        game.appendChild(div);
    }
}

function startGame(){
    lives = 5;
    find = 0;
    guessed = "";
    document.onkeydown = startTurn;
}

function startTurn(e){
    if(checkInput(e.key)){
        guessed += e.key;
        if (checkInWord(e.key)){
            showLetter(e.key);
        }
        else{
            lives--;
        }
    }
    checkWin();
    console.log("find = " + find + "\nlives = " + lives);
}

function checkWin(){
    if (find == random.length)
        console.log("winner");
    else if (lives <= 0)
        console.log("looser!");
}

function showLetter(key){
    for (let i = 0; i < random.length; i++){
        if (random[i] == key){
            find++;
            document.querySelector("#letter" + i).innerHTML = key;
        }
    }
}

function checkInput(key){
    if (alpha.includes(key) && !guessed.includes(key))
        return 1;
    else
        return 0;
}

function checkInWord(key){
    if (random.includes(key))
        return 1;
    else
        return 0;
}

function getRandom(){
    return dict[Math.floor(Math.random() * dict.length)].toLowerCase();
}