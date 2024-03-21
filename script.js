let colorSelected = undefined;
let winner = null;
let money = 0;
let profit = 0;
let isReady = false;
let runners = [];
let playerBet = undefined;

class runner{
  constructor(name, chance, div, divName, multiplier){
    this.name = name;
    this.chance = chance;
    this.div = div;
    this.divName = divName;
    this.multiplier = multiplier;
  }
}

function init(){
    money = 100;
    profit = 0;
    let red = new runner("red", 5,document.getElementById("red"), "redBet", 2);
    let white = new runner("white", 1,document.getElementById("white"), "whiteBet", 10);
    let blue = new runner("blue", 2,document.getElementById("blue"), "blueBet", 5);
    let green = new runner("green", 5, document.getElementById("green"), "greenBet", 2);
    let pink = new runner("pink", 2,document.getElementById("pink"), "pinkBet", 5);
    runners = [red, blue, white, pink, green];
    document.getElementById("moneyDisplay").innerHTML = money + "$";
    setWinner();
}

function startGame(val){
    moneyUpdate(val, true);
    if (moneyCheck() === false) {return};
    document.getElementById("betValue").innerHTML = "você apostou: " + val;
    run(winner.div, true);
    for(let i = 0; i < 5; i++){
      if(runners[i] != winner){
        run(runners[i].div, false);
      }
    }
    

    setTimeout(function reset(){
      if (winner.divName === playerBet){
        moneyUpdate(val * winner.multiplier, false);
        profit += val * winner.multiplier - val;
      } else{
        profit -= val;
      }
      document.getElementById("profitValue").innerHTML = "você lucrou "+ profit + " reais no total!";
      document.getElementById("betValueInpt").disabled = false;
      document.getElementById("betButton").disabled = false;
      setWinner();
    }, 2500);
}


function run(element, isWinner){
  let finalPos = Math.floor(Math.random() * (610 - 500 +1)) + 500;
  console.log(finalPos);
  if (isWinner) {finalPos = 700};

  let pos = 0;
  let vel = 6;

  let interval = setInterval(function(){
    if(pos >= finalPos){
      clearInterval(interval);
    }
    element.style.left = pos + "px";
    pos += vel;
  },1);

}



function setWinner(cheat){
  let winnerArray = [];
  for(let i = 0; i < runners.length; i++){
    for(let u = 0; u < runners[i].chance; u++){
      winnerArray.push(runners[i]);
    }
  }
  if(cheat != undefined) {winner = cheat}
  else {winner = winnerArray[Math.floor(Math.random() * winnerArray.length)];}
  console.log(winner);
}

function betClick(div){
  if (colorSelected === div) return;
  if (colorSelected != undefined){
      colorSelected.style.borderColor = null;
  } 

  colorSelected = div; 
  let divClass = colorSelected.getAttribute("class");
  console.log(divClass);
  if(divClass === "whiteBet"){
    colorSelected.style.borderColor = "red";
  } else{
    colorSelected.style.borderColor = "black";
  }
  playerBet = divClass;
  console.log(playerBet);
}

function betBtn(){
  document.getElementById("betValueInpt").disabled = true;
  document.getElementById("betButton").disabled = true;
  startGame(document.getElementById("betValueInpt").value);
} 


function moneyUpdate(val, subtract){
  if(subtract) {money -= val;}
  else{money += val;}
  document.getElementById("moneyDisplay").innerHTML = money + "$";
}

function moneyCheck(){
  if(money > 0) return true;
  let gameContainer = document.getElementById("principalPage");
    while(gameContainer.firstChild){
      gameContainer.removeChild(gameContainer.firstChild);
    }
    document.getElementById("gameOver").innerHTML = "VOCÊ GASTOU TODO SEU DINHEIRO E PERDEU!";
  return false;
}