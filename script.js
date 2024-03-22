//declarando variaveis

let colorSelected = undefined;
let winner = null;
let money = 0;
let profit = 0;
let isReady = false;
let runners = [];
let playerBet = undefined;

//criando uma classe pros carros (apenas por organização)

class runner{
  constructor(name, chance, img, divName, multiplier){
    this.name = name; //cor do carro
    this.chance = chance; //chance daquele carro vencer
    this.img = img; //imagem do carro no html
    this.divName = divName; //nome da div que representa a aposta do jogador (playerBet)
    this.multiplier = multiplier; //quanto aquele carro ira multiplicar a aposta do jogador
  }
}

//a funçao inicial do jogo irá definir algumas variaveis declaradas anteriormente no codigo, alem de ja definir o vencedor
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

//função que inicia o jogo, basicamente a função "princial" do codigo
function startGame(val){
    setMoney(val, true); //subtrai a quantia apostada na carteira do jogador
    if (moneyCheck() === false) {return}; //checando se o jogador ainda possui dinheiro pra jogar, caso não tenha o jogo sera interrompido
    document.getElementById("betValue").innerHTML = "você apostou: " + val;
    run(winner.img, true); //função pra animação do carro vencedor
    for(let i = 0; i < 5; i++){
      if(runners[i] != winner){
        run(runners[i].img, false); //função pra animação do carro perdedor
      }
    }
    
    //função de resetar o jogo, essa função só será executada apos a corrida finalizar, assim evitando mostrar imediatamente se o jogador venceu ou nao a aposta
    setTimeout(function reset(){
      if (winner.divName === playerBet){
        setMoney(val * winner.multiplier, false);
        profit += val * winner.multiplier - val;
      } else{
        profit -= val;
      }
      document.getElementById("profitValue").innerHTML = "você lucrou "+ profit + "!";
      document.getElementById("betValueInpt").disabled = false;
      document.getElementById("betButton").disabled = false;
      setWinner();
    }, 2500);
}

//animação dos carros
function run(element, isWinner){
  let finalPos = Math.floor(Math.random() * (610 - 500 +1)) + 500; //"finalPos" é o fim do percurso do carro
  console.log(finalPos);
  if (isWinner) {finalPos = 700};// o percurso do carro vencedor acaba em 700 pixels, diferente dos perdedores que não passarão de 610

  let pos = 0; //posiçõa inicial
  let vel = 5; //velocidade dos carros

  let interval = setInterval(function(){
    if(pos >= finalPos){
      clearInterval(interval); //caso o carro chegue em sua posição final, a animação irá se encerrar
    }
    element.style.left = pos + "px"; //codigo pra mover o carro para a direita
    pos += vel;
  },1); //intervalo que roda de 1 em 1 milisegundo, assim dando fluidez a animação

}


//função que define o vencedor
function setWinner(cheat){
  let winnerArray = []; //esse array será utilizado pra multiplicar os carros de acordo com suas chances de vitoria
  for(let i = 0; i < runners.length; i++){ //loop para ler o array dos carros
    for(let u = 0; u < runners[i].chance; u++){ //loop para multiplicar o carro dentro do array
      winnerArray.push(runners[i]);
    }
  }
  if(cheat != undefined) {winner = cheat} //cheat para definir o vencedor atraves do console do navegador
  else {winner = winnerArray[Math.floor(Math.random() * winnerArray.length)];} //sorteando o vencedor pelo array "winnerArray"
  console.log(winner);
}

//função para selecionar o carro que o jogador apostar e mudar o estilo do botão
function betClick(div){
  if (colorSelected === div) return; //caso o jogador selecione o mesmo carro varias vezes, nada vai acontecer
  if (colorSelected != undefined){
      colorSelected.style.borderColor = null; //comando pra tirar a borda do botão que foi selecionado anteriormente
  } 

  colorSelected = div; //definindo a cor selecionada
  let divClass = colorSelected.getAttribute("class"); //pegando o nome da classe da div selecionada
  console.log(divClass);
  if(divClass === "whiteBet"){
    colorSelected.style.borderColor = "red";
  } else{
    colorSelected.style.borderColor = "black"; 
  }
  playerBet = divClass; //definindo a escolha do jogador
  console.log(playerBet);
}

//função para o botão de aposta
function betBtn(){ 
  document.getElementById("betValueInpt").disabled = true;
  document.getElementById("betButton").disabled = true;
  startGame(document.getElementById("betValueInpt").value); //pega o valor que o jogador apostou e inicia o jogo
} 

//função pra incrementar ou subtrair o dinheiro do jogador e atualizar o display
function setMoney(val, subtract){
  if(subtract) {money -= val;}
  else{money += val;}
  document.getElementById("moneyDisplay").innerHTML = money + "$";
}

//função pro gameOver
function moneyCheck(){
  if(money > 0) return true;
  let gameContainer = document.getElementById("principalPage");
    while(gameContainer.firstChild){
      gameContainer.removeChild(gameContainer.firstChild);
    }
    document.getElementById("gameOver").innerHTML = "VOCÊ GASTOU TODO SEU DINHEIRO E PERDEU!";
  return false;
}