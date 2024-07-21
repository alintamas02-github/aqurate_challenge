import './stylesheet.css';

const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const TARGET_URL = 'https://storage.googleapis.com/aqurate-careers/products.json';

async function fetchProducts() {
  try {
    const response = await fetch(CORS_PROXY + encodeURIComponent(TARGET_URL));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const products = JSON.parse(data.contents);
    console.log('Fetched products:', products);
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

function initCarousel(products) {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  swiperWrapper.innerHTML = ''; // Clear previous slides if any
  products.forEach(product => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <h2>${product.name}</h2>
      <img src="${product.image}" alt="${product.name}">
      <p class="price">Pret intreg: <span>${product.original_price}</span> <span class="discounted-price">${product.discounted_price ? `Pret redus: ${product.discounted_price}` : ''}</span></p>
      <div class="action-buttons">
        <button class="add-to-cart"><i class="fas fa-shopping-cart"></i></button>
        <button class="add-to-wishlist"><i class="fas fa-heart"></i></button>
      </div>
    `;
    slide.addEventListener('click', () => {
      window.location.href = product.link;
    });
    swiperWrapper.appendChild(slide);
  });

  new Swiper('.mySwiper', {
    loop: true,
    slidesPerView: 3,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      
      320: {  
        slidesPerView: 1,
        spaceBetween: 10
      },
      640: { 
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {  
        slidesPerView: 2,
        spaceBetween: 30
      },
      1024: { 
        slidesPerView: 3,
        spaceBetween: 40
      },
    }
  });
}

fetchProducts().then(initCarousel);
