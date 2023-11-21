function init () {
   
//cargamos carrito
cargarCarrito();
}



function incrementInCart(path){
   

var actualQuantity=contentCartMap.get(path);
var newQuantity = actualQuantity+1;


if(newQuantity>10);
else{
    contentCartMap.set(path,newQuantity);
    cargarCarrito()
}
}
const summaryCart = document.getElementById('summaryCart');

function cargarCarrito(){

  cargar();
    var totalSummary=0;
    
//cargamos carrito
var i=0;


contentCart.innerHTML=``;
for (var [prodPath, quantity] of contentCartMap) {
    
   i+=quantity;
    let path = prodPath.split(',');
    //path[0] is category
    //path[1] is product.id
    mapWhereProducIs = categoriesMap.get(path[0]);
    productToAdd=mapWhereProducIs.get(path[1])
    let prce = (productToAdd.price).replace('.','')
    totalSummary+=parseInt(prce*quantity);
    var totalProductCart = formatoMoneda(prce);
    
    //once we know this product is in DB, we add it to cart
    contentCart.innerHTML+=`<li class="cart-card__product product-cart-card" role="listitem">
<div class="product-cart-card__img-wrapper">
    <img class="product-cart-card__img" src="${productToAdd.srcImgSmall}" alt="" width="48" height="48" srcset="${productToAdd.srcImgSmall} 1x, ${productToAdd.srcImgSmallx2} 2x">
  </div>

  <div class="product-cart-card__info">
    <h3 class="product-cart-card__title" id="pcTitle">${productToAdd.title}</h3>
    <p class="product-cart-card__price">$ ${totalProductCart}</p>
    <div class="product-cart-card__count">
      <div class="number-controls number-controls--small">
        <p class="number-controls__count">
          <span class="visually-hidden">Count</span>
          <span class="number-controls__count-value">${quantity}</span>
        </p>
        <button class="number-controls__button number-controls__button--decrement" onclick="decrementInCart('${prodPath}')" type="button" aria-label="Subtract one">-</button>
        <button class="number-controls__button number-controls__button--increment" onClick="incrementInCart('${prodPath}')" type="button" aria-label="Add one">+</button>
      </div>
    </div>
  </div>
</li>`
}
quantityShow.innerText="Cart("+i+")";
userOnline.quantitycar=i
cargar();
totalSummary= formatoMoneda(totalSummary);
summaryCart.innerHTML=`<dt class="cart-card-summary__title">Total</dt>
<dd class="cart-card-summary__value">$ ${totalSummary}</dd>`;

const cartCountElement = document.getElementById('cart-count');
if(i>0){
  cartCountElement.textContent = i.toString();
  cartCountElement.style.display='block';
}
else cartCountElement.style.display='none';


}




function decrementInCart(path){
    
var actualQuantity=contentCartMap.get(path);
var newQuantity = actualQuantity-1;

if(newQuantity<=0){
    contentCartMap.delete(path,newQuantity);
    
} 
else{
    contentCartMap.set(path,newQuantity);
    
}


cargarCarrito() 
}


  function formatoMoneda (number){
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    let arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp,rep);
    return arr[1] ? arr.join('.'): arr[0];
  }

  const MINIMUM_ITEM_COUNT = 1;
    const MAXIMUM_ITEM_COUNT = 10;
  
    // Header
    const elHeader = document.querySelector('.header');
    const elsHeaderToggler = elHeader.querySelectorAll('.header__toggler');
  
    // Click outside
    // Esc keyup
  
    function closeHeaderCart () {
      elHeader.classList.remove('header--cart-open');
    }
  
    function closeHeaderMenu () {
      elHeader.classList.remove('header--menu-open');
    }
  
    function elHeaderEscKeyupHandler (evt) {
      if (evt.key === 'Escape') {
        closeHeaderCart();
        closeHeaderMenu();
        document.removeEventListener('keyup', elHeaderEscKeyupHandler);
      }
    }
  
    elsHeaderToggler.forEach(function (elHeaderToggler) {
      elHeaderToggler.addEventListener('click', function () {
        const target = elHeaderToggler.dataset.target;
  
        if (target === 'menu') {
          elHeader.classList.toggle('header--menu-open');
          closeHeaderCart();
        }
  
        if (target === 'cart') {
          elHeader.classList.toggle('header--cart-open');
          closeHeaderMenu();
        }
  
        // Close header popups when click outside and Esc keyup
        let isHeaderPopupsOpen = elHeader.classList.contains('header--menu-open') || elHeader.classList.contains('header--cart-open');
  
        if (isHeaderPopupsOpen) {
          document.addEventListener('keyup', elHeaderEscKeyupHandler);
        } else {
          document.removeEventListener('keyup', elHeaderEscKeyupHandler);
        }
      });
    });

    
   function uploadSummary(){
cargar()
    }
   
  
    // CHECKOUT FORM
    const elCheckoutForm = document.querySelector('#checkout-form');
    let elFormPaymentMethodTabs = '';
    let elsFormPaymentMethodTab = '';
    let elsFormPaymentEMoneyField = '';
  
    if (elCheckoutForm) {
      elFormPaymentMethodTabs = elCheckoutForm.querySelector('.form-payment-method__tabs');
      elsFormPaymentMethodTab = elCheckoutForm.querySelectorAll('.form-payment-method__tab');
      elsFormPaymentEMoneyField = elCheckoutForm.querySelectorAll('.form-payment-method__e-money-field');
    }
  
    function hidePaymentMethodTabs () {
      elsFormPaymentMethodTab.forEach(function (elFormPaymentMethodTab) {
        elFormPaymentMethodTab.setAttribute('hidden', 'true');
      });
    }
  
    function enableEMoneyFields() {
      elsFormPaymentEMoneyField.forEach(function (elFormPaymentEMoneyField) {
        elFormPaymentEMoneyField.removeAttribute('disabled');
      });
    }
  
    function disableEMoneyFields() {
      elsFormPaymentEMoneyField.forEach(function (elFormPaymentEMoneyField) {
        elFormPaymentEMoneyField.setAttribute('disabled', 'true');
      });
    }
  
    // TODO: move change event listener to list and capture input change
    if (elCheckoutForm) {
      const elsPaymentMethodRadioInputs = elCheckoutForm.querySelectorAll('.form-payment-method__radio-input');
  
      elsPaymentMethodRadioInputs.forEach(function (elPaymentMethodRadioInput) {
        elPaymentMethodRadioInput.addEventListener('change', function () {
          hidePaymentMethodTabs();
          disableEMoneyFields();
  
          const target = elPaymentMethodRadioInput.dataset.target;
          elFormPaymentMethodTabs.querySelector(`[data-tab="${target}"]`).removeAttribute('hidden');
  
          if (target === 'e-money') {
            enableEMoneyFields();
          }
        });
      });
    }
    // MODAL
    if (elCheckoutForm) {
      elCheckoutForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
  
        const elModal = document.querySelector('.modal');
        elModal.classList.add('modal--open');
      });
    }
  
  


    // PRODUCTS-LIST
    const elProductsList = document.querySelector('.products-list');
    if (elProductsList) {
      const elProductsListToggler = elProductsList.querySelector('.products-list__toggler');
  
      if (elProductsListToggler) {
        elProductsListToggler.addEventListener('click', function () {
          elProductsList.classList.toggle('products-list--collapsed');
  
          elProductsListToggler.textContent = elProductsList.classList.contains('products-list--collapsed') ? 'and 2 other item(s)' : 'View less';
        });
      }
    }

  
  document.addEventListener('DOMContentLoaded', init);
  
  class Producto {
    constructor(srcimgBig, srcimgBigx2, srcImgMed, srcImgMedX2, srcImgSmall, srcImgSmallx2, title, neww, text, price, id, features, inBox) {
      this.srcimgBig = srcimgBig;
      this.srcimgBigx2 = srcimgBigx2;
      this.srcImgMed = srcImgMed;
      this.srcImgMedX2 = srcImgMedX2;
      this.srcImgSmall=srcImgSmall;
      this.srcImgSmallx2=srcImgSmallx2
      this.title = title;
      this.neww = neww;
      this.text = text;
      this.price=price;
      this.id = id;
      this.features=features;
      this.inBox=inBox;
    }
  
    
  
  }

  //delete later for localStorage persistency
 
var headphone1 = new Producto("img/xx99-mark2-big.png", "img/xx99-mark2-big@2x.png", 
"img/xx99-mark2-medium.png", "img/xx99-mark2-medium@2x.png", 
"img/xx99-mark2-small.png", "img/xx99-mark2-small@2x.png", 
"XX99 Mark II Headphones", true,
"The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
"136.900", "1", 
["Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you’re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you’ll never miss a beat.","The advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hourbattery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic."], 
["Headphone Unit,1x","Replacement Earcups,2x","User Manual,1x","3.5mm 5m Audio Cable,1x","Travel Bag,1x"]);

var headphone2 = new Producto("img/xx99-mark1-big.png", "img/xx99-mark1-big@2x.png", 
"img/xx99-mark1-medium.png", "img/xx99-mark1-medium@2x.png", 
"img/xx99-mark1-small.png", "img/xx99-mark1-small@2x.png", 
"XX99 Mark I Headphones", false,
"As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
"106.900", "2", 
["As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience. This pair of closed-back headphones are made of industrial, aerospace-grade materials to emphasize durability at a relatively light weight of 11 oz.","From the handcrafted microfiber ear cushions to the robust metal headband with inner damping element, the components work together to deliver comfort and uncompromising sound. Its closed-back design delivers up to 27 dB of passive noise cancellation, reducing resonance by reflecting sound to a dedicated absorber. For connectivity, a specially tuned cable is included with a balanced gold connector."], 
["Headphone Unit,1x","Replacement Earcups,2x","User Manual,1x","3.5mm 5m Audio Cable,1x"]);

var headphone3 = new Producto("img/xx59-big.png", "img/xx59-big@2x.png", 
"img/xx59-medium.png", "img/xx59-medium@2x.png", 
"img/xx59-small.png", "img/xx59-small@2x.png", 
"XX59 Headphones", false,
"Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
"86.900","3", 
["These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.","More than a simple pair of headphones, this headset features a pair of built-in microphones for clear, hands-free calling when paired with a compatible smartphone. Controlling music and calls is also intuitive thanks to easy-access touch buttons on the earcups. Regardless of how you use the XX59 headphones, you can do so all day thanks to an impressive 30-hour battery life that can be rapidly recharged via USB-C."], 
["Headphone Unit,1x","Replacement Earcups,2x","User Manual,1x","3.5mm 5m Audio Cable,1x"]);



var Speaker1 = new Producto("img/zx9-big.png", "img/zx9-big@2x.png", 
"img/zx9-medium.png", "img/zx9-medium@2x.png", 
"img/zx9-small.png", "img/zx9-small@2x.png", 
"ZX9 speaker", true,
"Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
"236.000","4",
["Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).","Discover clear, more natural sounding highs than the competition with ZX9’s signature planar diaphragm tweeter. Equally important is its powerful room-shaking bass courtesy of a 6.5” aluminum alloy bass unit. You’ll be able to enjoy equal sound quality whether in a large room or small den. Furthermore, you will experience new sensations from old songs since it can respond to even the subtle waveforms."], 
["Speaker Unit,2x","Speaker Cloth Panel,2x","User Manual,1x","3.5mm 10m Audio Cable,1x","10m Optical Cable,1x"]
);

var Speaker2 = new Producto("img/zx7-big.png", "img/zx7-big@2x.png", 
"img/zx7-medium.png", "img/zx7-medium@2x.png", 
"img/zx7-small.png", "img/zx7-small@2x.png", 
"ZX7 speaker", false,
"Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
"186.900","5",
["Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.","The ZX7 speaker is the perfect blend of stylish design and high performance. It houses an encased MDF wooden enclosure which minimises acoustic resonance. Dual connectivity allows pairing through bluetooth or traditional optical and RCA input. Switch input sources and control volume at your finger tips with the included wireless remote. This versatile speaker is equipped to deliver an authentic listening experience."], 
["Speaker Unit,2x","Speaker Cloth Panel,2x","User Manual,1x","3.5mm 7.5m Audio Cable,1x","7.5m Optical Cable,1x"]);


var earphone1 = new Producto("img/yx1-big.png", "img/yx1-big@2x.png", 
"img/yx1-medium.png", "img/yx1-medium@2x.png", 
"img/yx1-small.png", "img/yx1-small@2x.png", 
"YX1 wireless earphones", true,
"Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
"150.000","6",
["Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.","The YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black."], 
["Earphone Unit,2x","Multi-size Earplugs,6x","User Manual,1x","USB-C Charging Cable,1x","Travel Pouch,1x"]);


let headphonesMap = new Map();
headphonesMap.set("1", headphone1);
headphonesMap.set("2", headphone2);
headphonesMap.set("3", headphone3);

let speakersMap = new Map();
speakersMap.set("4", Speaker1);
speakersMap.set("5", Speaker2);

let earphonesMap = new Map();
earphonesMap.set("6",earphone1);

var categoriesMap = new Map();
categoriesMap.set("Headphones",headphonesMap)
categoriesMap.set("Speakers",speakersMap)
categoriesMap.set("Earphones",earphonesMap)
  
  //here we charge products page info
  var productPath
  let productPageContent = document.getElementById('productPageContent');
  const productToShow = localStorage.getItem("productToShow")
  
  let path = productToShow.split(',');
  let arr=categoriesMap.get(path[0])
  
    
    let producto = arr.get(path[1]);

    var newText = ``;
    if(producto.neww){
      newText = `<p class="product-info__new">New product</p>`;
    }

    var inBox = ``;
    producto.inBox.forEach(element => {
        let arr = element.split(',')
        inBox+=` <div class="product-contents__item">
        <dt class="product-contents__item-title">${arr[0]}</dt>
        <dd class="product-contents__item-value">${arr[1]}</dd>
      </div>`
        

    });

    var productFeatures =``;
    producto.features.forEach(element => {
        productFeatures+=`<p>${element}<\p>`
    });

    var similarProducts = ``
    
  arr.forEach(element => {
    
    if(element.id!=path[1]){
      
      productPath=path[0]+","+element.id;
        similarProducts+=`<li class="similar-products__item" role="listitem">
    <h3 class="similar-products__item-title">${element.title}</h3>
    <div class="similar-products__item-img-wrapper">
      <picture class="similar-products__item-picture">
        <source srcset="${element.srcImgSmall} 1x, ${element.srcImgSmallx2} 2x" media="(min-width:40em)">
        <img class="similar-products__item-img" src="img/${element.srcImgSmall}" alt="${element.title}" width="88" height="96" srcset="${element.srcImgSmall} 1x, ${element.srcImgSmallx2} 2x">
      </picture>
    </div>
    <a class="button button--primary" href="productPage.html" onclick="setProductToShow('${productPath}')">See Product</a>
  </li>`}
  });



  productPageContent.innerHTML=`
  <div class="product-page__back container">
        <a class="back-link" href="categoryPage.html">Go Back</a>
      </div>
  
  
      <!-- PRODUCT -->
      <div class="product-page__product container">
        <div class="product product--product-page">
          <div class="product__img-wrapper">
            <picture class="product__picture">
              <source srcset="${producto.srcimgBig} 1x, ${producto.srcimgBigx2} 2x" media="(min-width:62em)">
              <img class="product__img" src="${producto.srcImgSmall}" alt="${producto.title}" width="181" height="201" srcset="${producto.srcImgSmall} 1x, ${producto.srcImgSmallx2} 2x">
            </picture>
          </div>
  
          <div class="product__product-info product-info product-info--product-page">
          ${newText}
            <h2 class="product-info__title">${producto.title}</h2>
            <p class="product-info__text">${producto.text}</p>
            <p class="product-info__price-wrapper">
              <span class="product-info__price">$ ${producto.price}</span>
            </p>
  
            <footer class="product-info__actions">
              <div class="number-controls" data-item-count="0">
                <p class="number-controls__count">
                  <span class="visually-hidden">Count</span>
                  <span class="number-controls__count-value" id="currentItemCount">0</span>
                </p>
                <button class="number-controls__button number-controls__button--decrement" id="decrementButton" onclick="decrement()" type="button" aria-label="Subtract one">-</button>
                <button class="number-controls__button number-controls__button--increment" id="incrementButton" onclick="increment()" type="button" aria-label="Add one">+</button>
              </div>
              <div>
              <button class="button button--primary" type="button" onclick="addToCart()">Add to cart</button>
              <button class="button button--primary" type="button" onclick="addToWL()">Add to Wish List</button>
              </div>
             
            </footer>
          </div>
        </div>
      </div>
  
  
      <!-- PRODUCT FEATURES CONTENTS -->
      <div class="product-page__product-features-contents product-features-contents">
        <div class="product-features-contents__container container">
          <section class="product-features-contents__features product-features">
            <h2 class="product-features__heading">Features</h2>
                ${productFeatures}
          </section>
  
          <section class="product-features-contents__contents product-contents">
            <h2 class="product-contents__heading">In the box</h2>
            <dl class="product-contents__list">
              ${inBox}
            </dl>
          </section>
        </div>
      </div>
  
  
      <!-- PRODUCT IMAGES -->
      <section class="product-page__product-images product-images">
        <div class="container">
          <h2 class="visually-hidden">Product images</h2>
          <ul class="product-images__grid" role="list">
            <li class="product-images__item" role="listitem">
              <picture class="product-images__picture">
                <source srcset="img/product-images-xx59-1-desktop.jpg 1x, img/product-images-xx59-1-desktop@2x.jpg 2x" media="(min-width:62em)">
                <img class="product-images__img" src="img/product-images-xx59-1-mobile.jpg" alt="Young man listening to music with headphones" width="327" height="141" srcset="img/product-images-xx59-1-mobile.jpg 1x, img/product-images-xx59-1-mobile@2x.jpg 2x">
              </picture>
            </li>
  
            <li class="product-images__item" role="listitem">
              <picture class="product-images__picture">
                <source srcset="img/product-images-xx59-2-desktop.jpg 1x, img/product-images-xx59-2-desktop@2x.jpg 2x" media="(min-width:62em)">
                <img class="product-images__img" src="img/product-images-xx59-2-mobile.jpg" alt="XX99 Mark 2 headphone on the table with other items" width="327" height="141" srcset="img/product-images-xx59-2-mobile.jpg 1x, img/product-images-xx59-2-mobile@2x.jpg 2x">
              </picture>
            </li>
  
            <li class="product-images__item" role="listitem">
              <picture class="product-images__picture">
                <source srcset="img/product-images-xx59-3-desktop.jpg 1x, img/product-images-xx59-3-desktop@2x.jpg 2x" media="(min-width:62em)">
                <source srcset="img/product-images-xx59-3-tablet.jpg 1x, img/product-images-xx59-3-tablet@2x.jpg 2x" media="(min-width:40em)">
                <img class="product-images__img" src="img/product-images-xx59-3-mobile.jpg" alt="XX99 Mark 2 headphone on the table with other items" width="327" height="141" srcset="img/product-images-xx59-3-mobile.jpg 1x, img/product-images-xx59-3-mobile@2x.jpg 2x">
              </picture>
            </li>
          </ul>
        </div>
      </section>
  
      <!-- SIMILAR-PRODUCTS -->
      <section class="product-page__similar-products similar-products">
        <div class="container">
          <h2 class="similar-products__heading">You may also like</h2>
          <ul class="similar-products__list" role="list">
           ${similarProducts}
          </ul>
        </div>
      </section>
  
       <!-- CATEGORY-CARDS -->
       <section class="product-page__category-cards container">
        <div class="category-cards">
          <h2 class="visually-hidden">Product categories</h2>
          <ul class="category-cards__list" role="list">
            <li class="category-cards__item category-card" role="listitem">
              <h3 class="category-card__title">Headphones</h3>
              <img class="category-card__img" src="img/category-img-headphones.png" alt="Headphone sample" width="103" height="104" srcset="img/category-img-headphones.png 1x, img/category-img-headphones@2x.png 2x">
              <a href="categoryPage.html" onclick="setCategoryTitle('Headphones')" class="arrow-link arrow-link--stretched">Shop</a>
            </li>
            <li class="category-cards__item category-card" role="listitem">
              <h3 class="category-card__title">Speakers</h3>
              <img class="category-card__img" src="img/category-img-speakers.png" alt="Speaker sample" width="103" height="104" srcset="img/category-img-speakers.png 1x, img/category-img-speakers@2x.png 2x">
              <a href="categoryPage.html" onclick="setCategoryTitle('Speakers')" class="arrow-link arrow-link--stretched">Shop</a>
            </li>
            <li class="category-cards__item category-card" role="listitem">
              <h3 class="category-card__title">Earphones</h3>
              <img class="category-card__img" src="img/category-img-earphones.png" alt="Earphone sample" width="103" height="104" srcset="img/category-img-earphones.png 1x, img/category-img-earphones@2x.png 2x">
              <a href="categoryPage.html" onclick="setCategoryTitle('Earphones')" class="arrow-link arrow-link--stretched">Shop</a>
            </li>
          </ul>
        </div>
      </section>
  
      <!-- MISSION -->
      <section class="mission">
        <div class="mission__container container">
          <picture class="mission__picture">
            <source srcset="img/mission-desktop.jpg 1x, img/mission-desktop@2x.jpg 2x" media="(min-width:62em)">
            <source srcset="img/mission-tablet.jpg 1x, img/mission-tablet@2x.jpg 2x" media="(min-width:48em)">
            <img class="mission__img" src="img/mission-mobile.jpg" alt="Young man listening to music using headphones" width="327" height="300" srcset="img/mission-mobile.jpg 1x, img/mission-mobile@2x.jpg 2x">
          </picture>
  
          <div class="mission__content">
            <h2 class="mission__heading">Bringing you the <strong class="mission__heading-accent">best</strong> audio gear</h2>
            <p class="mission__text">Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
          </div>
        </div>
      </section>
  `;
  
  function setCategoryTitle(cat){

  
    localStorage.setItem("categoryTitle", cat)
    
  
  }

  
  function setProductToShow(productPath){

    localStorage.setItem("productToShow", productPath);
  
  }

var currentItemCount;
currentItemCount = 0;


const parentNumberControls = document.getElementById('currentItemCount');
const decrementButton = document.getElementById('decrementButton');
const incrementButton = document.getElementById('incrementButton');


  function increment(){

    currentItemCount = parseInt(parentNumberControls.innerText);
    if(currentItemCount<10){
        currentItemCount++;
        parentNumberControls.innerText=currentItemCount;  
    } 
    
  }

  function decrement(){
        currentItemCount = parseInt(parentNumberControls.innerText);
        if(currentItemCount>0){
            currentItemCount--;
            parentNumberControls.innerText=currentItemCount;
        } 
  }
  
  
 
  let contentCart = document.getElementById('contentCart');
  function cargar(){
    
    userOnline.contentcarmap=JSON.stringify(Array.from(contentCartMap.entries()));
    
    
    userMap.set(user,userOnline);
    localStorage.userMap = JSON.stringify(Array.from(userMap.entries()));
    localStorage.contentCartMap=JSON.stringify(Array.from(contentCartMap.entries()));

  }

  let userMap = new Map(JSON.parse(localStorage.userMap));
  let user = localStorage.getItem('userOnline');
  let userOnline = userMap.get(user)
  let contentCartMap = new Map(JSON.parse(userOnline.contentcarmap));
 

 
  const quantityShow = document.getElementById('quantityShow');  
  let quantity = contentCartMap.get(productToShow);


  let wishListm 
function addToWL(){
  
  userMap = new Map(JSON.parse(localStorage.userMap));
  user = localStorage.getItem('userOnline');
  userOnline = userMap.get(user)
  wishListm = new Map(JSON.parse(userOnline.wishListMap));
 
      addProductWL(productToShow,1);
    
}

function addProductWL(){
  

 wishListm.set(productToShow,1)
 userOnline.wishListMap=JSON.stringify(Array.from(wishListm.entries()));

  userMap.set(user,userOnline);
  localStorage.userMap = JSON.stringify(Array.from(userMap.entries()));
  parentNumberControls.innerText=0;

  console.log(wishListm)
  }


  function addToCart(){
cargar();
    
    quantity = contentCartMap.get(productToShow);

    userMap = new Map(JSON.parse(localStorage.userMap));
    user = localStorage.getItem('userOnline');
    userOnline = userMap.get(user)
    contentCartMap = new Map(JSON.parse(userOnline.contentcarmap));
    let qcart = localStorage.getItem('quantityCar');
    currentItemCount = parseInt(parentNumberControls.innerText);
    if(currentItemCount>0){
        initialQ = quantity;
        let quantitySum;
        if(quantity>0){
            
        }else quantity=0;
        quantitySum =quantity+currentItemCount;

       
        if(quantitySum>10){
            alert("En el momento el stock es de 10 y ya lo acogiste")
            quantity=10;
            currentItemCount=0;
        }
       
        totalq = parseInt(qcart)+parseInt(currentItemCount)


        userOnline.quantitycar=totalq;
        cargar()
       
        quantityShow.innerText="Cart("+totalq+")";
        parentNumberControls.innerText=0;


        addProduct(currentItemCount+quantity);
        
    }
    
   
  }
 



//localStorage.contentCartMap = JSON.stringify(Array.from(contentCartMap.entries()));

  function addProduct(quantity){
    contentCartMap.set(productToShow,quantity);
    cargarCarrito() 

  }
  
  function removeAllProducts(){
 
        quantity=0;
        userOnline.quantitycar=0;
        quantityShow.innerText="Cart("+quantity+")";
        contentCartMap=new Map();
       
    cargarCarrito()
}




