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
    game.style.display = "flex";
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
        showResult(1);
    else if (lives <= 0)
        showResult(0);
}

function showResult(win){
    let result = (win) ? "Congratulation, you win" : "oh nooo... you loose";
    game.style.display = "none";
    document.getElementById("result").innerHTML = result;
    document.getElementById("word").innerHTML = random;
    document.getElementById("end").style.display = "flex";
    reset();
}

function reset(){
    while (game.firstChild) {
        game.removeChild(game.firstChild);
    }
    document.onkeydown = null;
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