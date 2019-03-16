
let height = 0
let width = 0
let vidas = 1
let tempo = 15
let defineTempo = 1500 //criaMosquitoTempo

let niveljs = window.location.search
niveljs = niveljs.replace('?', '')

if (niveljs === 'normal'){
    //tempo 1,5s
    defineTempo = 1500
} else if (niveljs === 'dificil'){
    //tempo 1s
    defineTempo = 1000
} else { 
    // 0,75s
    defineTempo = 750
}

//saber qual é a altura e largura disponíveis e ajustá-las automaticamente
function ajustaTamanhoPalcoJogo(){
    height = window.innerHeight
    width = window.innerWidth
    //console.log(height, width)
}

ajustaTamanhoPalcoJogo()


//cronometro e ajustes
let cronometro = setInterval(function(){ //variável que guarda a função
    tempo -= 1 //decremento do tempo a cada um segundo (parametro 2 do setInterval)

    if(tempo < 0){ 
        clearInterval(cronometro) //limpa o var cronometro, que carrega o tempo
        clearInterval(criaMosquito) //limpa a função criaMosquito(index.html) que cria os mosquitos
        window.location.href = 'vitoria.html'
    } else
    document.getElementById('cronometroid').innerHTML = tempo
    
},1000)

function posicaoRandomica(){ //função para o body

//remover mosquito anterior
if(document.getElementById('mosquitoid')){
    document.getElementById('mosquitoid').remove()
//mudar o id da imagem de vidas de acordo com o desaparecimento dos mosquitos quando
//estes nao forem clicados:
if(vidas > 3){
    window.location.href = 'gameover.html'
} else {
    document.getElementById('v' + vidas).src = "imagens/imagens/coracao_vazio.png"
    vidas++
}
}

//posições aleatórias dos mosquitos
let Xposition = Math.floor(Math.random() * width) - 90
//variavel X/Y multiplica a Largura/altura pelo valor aleatório
//gerado pela Math.random, e é arredondado para baixo (.floor)
//e depois é decrementado 90(px?) para que nao gere a barra de rolagem
//quando a imagem for gerada perto das extremidades da tela
let Yposition = Math.floor(Math.random() * height) - 90

//caso X/Y for menor que zero (o que esconderia a imagem):
Xposition = Xposition < 0 ? 0 : Xposition
//X/Y = ele mesmo < 0? se sim (?), então recebe 0 (e nao o valor)
//negativo que tinha recebido), se não é < 0 (:) , continua com o valor atual
Yposition = Yposition < 0 ? 0 : Yposition


//crianto um elemento (imagem) html pelo js
let mosquito = document.createElement('img')
mosquito.src = 'imagens/imagens/mosca.png'
//atribuir tamanho e lado aleatório para a imagem atravez de classes encapsuladas em funções:
mosquito.className = tamanhoAleatório() + ' ' + ladoAleatorio() 
mosquito.style.left = Xposition + 'px'
mosquito.style.top = Yposition + 'px'
mosquito.style.position = 'absolute'
mosquito.id = 'mosquitoid'
mosquito.onclick = function(){
    this.remove() //remove o mosquito qnd ele for clicado
}

//add um filho ao body, que é o elemento que eu criei agora
document.body.appendChild(mosquito)

tamanhoAleatório()
ladoAleatorio()
}

function tamanhoAleatório() {
    let classe = Math.floor(Math.random() * 3)

    switch(classe){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }//nao tem break porque o return já faz o js pausar a aplicação

}

function ladoAleatorio() {
    let classe = Math.floor(Math.random() * 2)

    switch(classe){
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB' 
    }

}