
const topHeader = document.querySelector('.top-header')
const header = document.querySelector('.hdr')
const nav = document.querySelector('.nav-list')
const abaCar = document.querySelector('.aba-carrinho-aberta')
const logo = document.querySelector('.logo-header')




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

   if( window.scrollY > 100){
    topHeader.style.transform = 'translateY(-100%)'
    header.classList.remove('hdr')
    header.classList.add('header-scroll')
    nav.style.top = '10vh'
    abaCar.style.top = '0'
    logo.style.transform = 'scale(0.9)'
   }else{
    topHeader.style.transform = 'translateY(0%)'
    topHeader.classList.add('top-header')
    header.classList.add('hdr')
    nav.style.top = '16vh'
    logo.style.transform = 'scale(1)'
   }

}


window.addEventListener('scroll', activeScroll)

// API 

const apiUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=';

const container01 = document.getElementById('container-01');
const container02 = document.getElementById('container-02');

const getItems = async (search, container) => {
    try {
        const response = await fetch(apiUrl + search)
        const data = await response.json()

        const items = data.results

        items.forEach((item) => {
            const card = document.createElement('div')
            card.className = 'swiper-slide'

            card.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="descricao-produto">
                    <span class="nome produto">${item.title}</span>
                    <span class="valor produto">R$ ${item.price}</span>
                    <button class="btn produto">Comprar</button>
                </div>
            `

            container.appendChild(card)
        })
    } catch (error) {
        console.log('Erro ao conectar API', error)
    }
}

getItems('camisetas streetwear', container01)
getItems('bones nba', container02)

