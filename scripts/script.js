
const topHeader = document.querySelector('.top-header')
const header = document.querySelector('.hdr')
const nav = document.querySelector('.nav-list')
const abaCar = document.querySelector('.aba-carrinho-aberta')
const logo = document.querySelector('.logo-header')
var cardProduto = document.getElementsByClassName('swiper-slide')
const btnComprar = document.querySelector('.btn')


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






// API 

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.mercadolibre.com/sites/MLB/search?q='

    // const container01 = document.querySelector('.container-produtos')
    // const controls = document.querySelectorAll('.control')
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
            console.log(maxCards)

            items.forEach((item) => {
                const card = document.createElement('div')
                if (search == 'camisetas streetwear' || search == 'oversized' || search == 'camiseta canelada') {
                  card.className = 'swiper-slide'
                } else {
                  card.className = 'card-produto'
                }                
                // card.classList.add('swiper-slide')

                card.innerHTML = `
                    <img src="${item.thumbnail}" class="img-produto" alt="${item.title}">
                    <div class="descricao-produto">
                    <h2 class="produto nome" data-nome="${item.title}">${item.title}</h2>
                    <strong class="produto valor" data-valor="${item.price}">R$ ${item.price}</strong>
                    <button class="produto btn">Comprar</button>
                    </div>
                `
                container.appendChild(card)
               
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

    // controls.forEach((control) => {
    //     control.addEventListener('click', () => {
    //         const isLeft = control.classList.contains('arrow-left')

    //         if (isLeft) {
    //             currentCard -= 1
    //         } else {
    //             currentCard += 1
    //         }

    //         if (currentCard >= maxCards) {
    //             currentCard = 0
    //         } else if (currentCard < 0) {
    //             currentCard = maxCards - 1
    //         }

    //         document.querySelectorAll('.card').forEach(item => item.classList.remove('current-card'))
    //         const cards = document.querySelectorAll('.card')
    //         cards[currentCard].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    //         cards[currentCard].classList.add('current-card')
    //     })
    // })
})

// Scroll

const initSwiper = () => {
    swiper = new Swiper(".container-produtos", {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
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

// carrosel


