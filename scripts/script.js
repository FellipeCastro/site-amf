
const topHeader = document.querySelector('.top-header')
const header = document.querySelector('.hdr')
const nav = document.querySelector('.nav-list')
const abaCar = document.querySelector('.aba-carrinho-aberta')
const logo = document.querySelector('.logo-header')
var cardProduto = document.getElementsByClassName('swiper-slide')
var icon = document.getElementById('icon-carregando')
var total = 0
var SomandoValores = 0

// MOSTRAR ABA DO CARRINHO / OCULTAR ABA DO CARRINHO

const mostrarCarrinho = () =>{
   
    abaCar.style.transform = ' translateX(0%)' 
    document.body.style.overflowY = 'hidden'
}

const fecharCarrinho = () =>{
    const abaCar = document.querySelector('.aba-carrinho-aberta')
    abaCar.style.transform = ' translateX(100%)' 
    document.body.style.overflowY = 'scroll'
}

const activeScroll = () =>{

   if( window.scrollY > 50){
    header.classList.remove('hdr')
    header.classList.add('header-scroll')
    nav.style.top = '10vh'
    abaCar.style.top = '0'
    logo.style.transform = 'scale(0.9)'
   }else if( window.scrollY < 150){
    topHeader.style.transform = 'translateY(0%)'
    topHeader.classList.add('top-header')
    header.classList.add('hdr')
    nav.style.top = '16vh'
    logo.style.transform = 'scale(1)'
   }

}


window.addEventListener('scroll', activeScroll)

// ADICIONANDO ITEM AO CARRINHO ----------------------------------------------



const calcularTotal = (operador) =>{
    var SomandoValores = 0
    const baseContainer = document.querySelector('.produtos-carrinho')
    const QntValores = baseContainer.querySelectorAll('.valor-produto')
    const valorAtualizado = document.querySelector('.valor-calculado') 

    console.log(QntValores)

    for(i = 0 ; i < QntValores.length ; i++){
      SomandoValores = parseFloat(SomandoValores) + parseFloat(QntValores[i].innerHTML.replace(',' , '.'))
    }
    
    valorAtualizado.innerHTML = 'R$'+ SomandoValores.toFixed(2)
} 

const tirarUmProduto = (event) => {
  const ouvinte = event.target.parentNode.parentNode
  const quantProduto = ouvinte.querySelector('.qnt-produto')
  const convert = parseInt(quantProduto.innerHTML)

  if(convert == 1){
    console.log('executou if')
    return;
  }else{ 
    const paiMaisUm =  event.target.parentNode.parentNode
    const valorAtual = paiMaisUm.querySelector('.valor-produto')
    const valorInicial = parseFloat(valorAtual.getAttribute('data-valorin').replace(',', '.'))
    console.log(paiMaisUm)
    quantProduto.innerHTML = convert - 1

    const valorSubtraido = parseFloat(valorAtual.innerHTML.replace(',', '.')) - valorInicial

    valorAtual.innerHTML = valorSubtraido.toFixed(2)
    
    console.log('executou else')
  }
  calcularTotal()
}

const removerProduto = (event) =>{
  const contCar = document.querySelector('.qnt-indicada')
  const pai = document.querySelector('.produtos-carrinho')
  const filhoRemover = event.target.parentNode.parentNode.parentNode.parentNode

  pai.removeChild(filhoRemover)
  contCar.innerHTML = Number(contCar.innerHTML) - 1
  calcularTotal()
}

  const AddUmProduto = (event) => {
    const quantProduto = event.target.parentNode.querySelector('.qnt-produto')
    const convert = parseInt(quantProduto.innerHTML)
   const paiMaisUm =  event.target.parentNode.parentNode.parentNode
   const valorAtual = paiMaisUm.querySelector('.valor-produto') 
   const valorInicial = parseFloat(valorAtual.getAttribute('data-valorin').replace(',', '.'))

   var cont = convert + 1 

  quantProduto.innerHTML =  cont

  const valorSomado = cont * valorInicial

  valorAtual.innerHTML = valorSomado.toFixed(2)
  
  calcularTotal()
}


const AdCarrinho = ({target}) =>{
    const contCar = document.querySelector('.qnt-indicada')
    const containerCar = document.querySelector('.produtos-carrinho')
    const name = target.getAttribute("data-nome")
    const valor = target.getAttribute("data-valor")
    const imgCard = target.getAttribute("data-img")

    contCar.innerHTML = Number(contCar.innerHTML) + 1

    const infoProduto = document.createElement('div')
    infoProduto.className = 'produto-adicionado'
   

    infoProduto.innerHTML = `
        <div class="imagem-produto-adicionado">
            <img src="${imgCard}" alt="">
        </div>
        <div class="descricao-produto-adicionado">

            <div class="top-descricao-carrinho">
                <span class="nome-produto-carrinho"><p>${name}</p></span>
                <span class="cont-deletar-produto"><strong>X</strong></span>
            </div>
             
            <div class="bottom-descricao-carrinho">
                <div class="btn-cont-produto"><p class="menos-produto">-</p> <strong class="qnt-produto">1</strong> <p class="mais-produto">+</p></div>
                <span class="valor-produto-adicionado"><strong >R$<span class="valor-produto" data-valorin="${valor}">${valor}</span> </strong></span>
            </div>
          </div>
    `
 
  containerCar.appendChild(infoProduto)

  // Adicionando evento para apagar item do carrinho no icone X

  const clickremoverProduto = document.querySelectorAll('.cont-deletar-produto')
    for(i = 0 ; i < clickremoverProduto.length ; i++){
      var iconClicado = clickremoverProduto[i]
      iconClicado.addEventListener('click' , removerProduto)
    }  
  // Adicionando evento para diminuir a quantidade de items do carrinho

  const menosUmProduto = document.querySelectorAll('.menos-produto')
  for(a = 0; a < menosUmProduto.length ; a++){
      var menosUmClicado = menosUmProduto[a]
      menosUmClicado.addEventListener('click', tirarUmProduto)
  }

  // Adicionando evento para aumentar a quantidade de items do carrinho
  
  const maisUmProduto = document.querySelectorAll('.mais-produto')
  
  for(b = 0; b < maisUmProduto.length ; b++){
      var maisUmClicado = maisUmProduto[b]
       maisUmClicado.addEventListener('click', AddUmProduto)
  }

  calcularTotal()
 
}



// CONECTANDO COM A API E CRIANDO OS CARDS DE PRODUTOS DINÂMICAMENTE DE ACORDO COM A QUANTIDADE DE ITEMS -------------------

document.addEventListener('DOMContentLoaded', () => {
const apiUrl = 'https://api.mercadolibre.com/sites/MLB/search?q='

const container01 = document.querySelector('#container01')
const container02 = document.querySelector('#container02')
const container03 = document.querySelector('#container03')

const containerCalcas = document.querySelector('#container-calcas')
const containerCamisas = document.querySelector('#container-camisas')
const containerImportados = document.querySelector('#container-importados')
const containerNacionais = document.querySelector('#container-nacionais')
const containerTenis = document.querySelector('#container-tenis')

let currentCard = 0 
let maxCards = 0

const getItems = async (search, container) => {
try {
  const response = await fetch(apiUrl + search)
  const data = await response.json()
  const items = data.results

  maxCards += items.length

  items.forEach((item) => {
      const card = document.createElement('div')
      if (search == 'camisetas streetwear' || search == 'oversized' || search == 'camiseta canelada') {
        card.className = 'swiper-slide'
      } else {
        card.className = 'card-produto'
      }                
      // card.classList.add('swiper-slide')

      card.innerHTML = `
          <img src="${item.thumbnail}" data-img="${item.thumbnail}" class="img-produto" alt="${item.title}">
          <div class="descricao-produto">
          <h2 class="produto nome">${item.title}</h2>
          <strong class="produto valor">R$ ${item.price.toFixed(2).replace("." , ",")}</strong>
          <button
          class="produto btn add-to-cart-btn"
          id="btn" 
          data-img="${item.thumbnail}"
          data-nome="${item.title}" 
          data-valor="${item.price.toFixed(2).replace("." , ",")}">
          Comprar
          </button>
          </div>
      `
      container.appendChild(card)
      const addToCartBtn = card.querySelector('.add-to-cart-btn')
        addToCartBtn.addEventListener('click', AdCarrinho)
  })

      initSwiper() 
      
  } catch (error) {
      console.log('Erro ao conectar API', error)
  }
}

getItems('camisetas streetwear', container01)
getItems('oversized', container02)
getItems('camiseta canelada', container03)

getItems('calcas cargo', containerCalcas)
getItems('camisas oversized', containerCamisas)
getItems('camiseta canelada americana', containerImportados)
getItems('camisas oversized', containerNacionais)
getItems('sapato social', containerTenis)


})

// ORGANIZANDO OS CARDS -------------------------------------------------------------------

const initSwiper = () => {
    swiper = new Swiper(".container-produtos", {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    })
    var swiper = new Swiper(".carrosel-container", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
  }
 



  
 
 
 
 
 
 
 