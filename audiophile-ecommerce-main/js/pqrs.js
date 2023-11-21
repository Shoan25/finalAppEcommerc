  
let userMap;  let contentCartMap;let userOnline; let user;
function init () {
 if(localStorage.getItem("orderCount"))
if(localStorage.getItem('contentCartMap'));
else{
  var newMap = new Map();
  localStorage.setItem('contentCartMap', JSON.stringify(Array.from(newMap.entries())));
}
  try {
    userMap= new Map(JSON.parse(localStorage.userMap));
  } catch (error) {
    console.log(error.message+" se creo la BD para usuarios")
    var newMap = new Map();
    localStorage.setItem("userMap", JSON.stringify(Array.from(newMap.entries())));
  }

if(localStorage.getItem('userOnline'))  ;
else{
  let map = new Map();
 
  console.log("No puede haber usuario en linea");
  localStorage.setItem('userOnline', "sin usuario");

  if(userMap.size>0) localStorage.setItem('userOnline', "jhoan.vera2509@hotmail.com");
} 
 user = localStorage.getItem('userOnline');

  try {
    user = localStorage.getItem('userOnline');
  } catch (error) {
    console.log(error.message+" se creo la BD para usuarios")
    var newMap = new Map();
    localStorage.setItem("userMap", JSON.stringify(Array.from(newMap.entries())));
  }

  userOnline = userMap.get(user)


  try {
    contentCartMap = new Map(JSON.parse(userOnline.contentcarmap));
    
  } catch (error) {
    
  }
  
  let contentCart = document.getElementById('contentCart');
  const quantityShow = document.getElementById('quantityShow');  

   

  cargarCarrito()
  //cargamos carrito
  
  }

  function cargar(){
    userOnline.contentcarmap=JSON.stringify(Array.from(contentCartMap.entries()));
    userMap.set(user,userOnline);
    localStorage.userMap = JSON.stringify(Array.from(userMap.entries()));
    localStorage.contentCartMap=JSON.stringify(Array.from(contentCartMap.entries()));
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

        
          

        emailjs.init("JXa_VvsrF2FFaeqA6");  // Reemplaza "your_user_id" con tu User ID

        let contenidopqr = document.getElementById('address-input')
        userMap= new Map(JSON.parse(localStorage.userMap));
        userOnline = userMap.get(localStorage.getItem('userOnline'))
        let destinatario = userOnline.email;
        var userName = userOnline.name;
       
        var templateParams = {
          enterprise_name: "Audiophile",
          to_name: userName,
          to: destinatario,
          
          replyto: "jhoana.verav@uqvirtual.edu.co",
          message: "Hemos recibido tu solicitud de PQRS, tan pronto tengamos respuesta, te la notificaremos a este medio de contacto \n\n Resumen de tu PQR:\n"+contenidopqr.value.toString(),
        };
       
        emailjs.send("service_y4nrdwm", "template_3nhpxxd", templateParams)
          .then(response => {
            alert('Correo electrónico enviado con éxito a: '+destinatario);
          })
          .catch(error => {
            console.error('Error al enviar el correo electrónico:', error);
            alert('Error al enviar el correo electrónico.');
          });
        
           
        });
      }

      var pinCorrecto = 1;
      function generarNumeroAleatorio() {
        // Generar un número aleatorio entre 1000 y 9999
         pinCorrecto = Math.floor(Math.random() * 9000) + 1000;
      }
      
  
 

   function mostrarVentana() {
    document.getElementById('fondoOscuro').style.display = 'flex';
  }
  
  function cerrarVentana() {
    document.getElementById('fondoOscuro').style.display = 'none';
    // Limpiar el campo de entrada del PIN al cerrar la ventana
    document.getElementById('pinInput').value = '';
  }
  
  function cerrarVentana2() {

    
    const pinIngresado = document.getElementById('pinInput').value;
     // PIN de ejemplo (reemplaza con tu lógica de validación)
  
    if (pinIngresado.toString() == pinCorrecto.toString()) {
      alert('PIN correcto. Orden realizada con exito');
      cerrarVentana();

      const elModal = document.querySelector('.modal');
    elModal.classList.add('modal--open');
    createOrder()
     

    } else {
      alert('PIN incorrecto. Inténtelo de nuevo.');
    }
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
// inicializadores de la pagina "category"



  
const categoryTitle = document.querySelector('.category-hero__title')

if(localStorage.getItem("categoryTitle"));
else{
 
}
const category = localStorage.getItem("categoryTitle")
try {
  categoryTitle.innerText=category
} catch (error) {
  
}

//cargamos catalogo, partimos en paginas que contengtan de a 6
let categoryPageContent = document.getElementById('categoryPageContent');
let lista;
try {
  lista = categoriesMap.get(category);
} catch (error) {

  localStorage.setItem('category', "sin categoria");
}
try {
  
lista.forEach(element => {

  var productPath=category+","+element.id;
  var newText = ``;
  if(element.neww){
    newText = `<p class="product-info__new">New product</p>`;
  }

  try {
    categoryPageContent.innerHTML+=` 
  
<li class="product product--category-page" role="listitem">
<div class="product__img-wrapper">
  <picture class="product__picture">
    <source srcset="${element.srcimgBig} 1x, ${element.srcimgBigx2} 2x" media="(min-width:62em)">
    <img class="product__img" src="${element.srcImgMed}"  width="220" height="243" srcset="${element.srcImgMedX2} 1x, ${element.srcImgMedX2} 2x">
  </picture>
</div>

<div class="product__product-info product-info product-info--category-page product-info--center">
  <h2 class="product-info__title">${element.title}</h2>
  ${newText}
  <p class="product-info__text">${element.text}</p>

  <footer class="product-info__actions">
    <a class="button button--primary" href="productPage.html" onclick="setProductToShow('${productPath}')">See Product</a>
  </footer>
</div>
</li>
  `
  } catch (error) {
    
  }
  

})
} catch (error) {
  
}

// codigo activar titulo naranja de objetos en el navlink: sitenav__item--active
function setCategoryTitle(cat){

  
  localStorage.setItem("categoryTitle", cat)
  

}


function uploadSummary(){
  cargar()
      }
function setProductToShow(productPath){

  localStorage.setItem("productToShow", productPath);

}

function removeAllProducts(){
 
  quantity=0;
  userOnline.quantitycar=0
  quantityShow.innerText="Cart("+quantity+")";
  contentCartMap=new Map();
  cargar()  
cargarCarrito()

}


/*
IF DB IS ERRASED, HERE IS SOLUTION LOL

var contentCartMap = new Map();
 contentCartMap.set("Speakers,4",1).set("Speakers,4",1);
localStorage.contentCartMap = JSON.stringify(Array.from(contentCartMap.entries()))
*/

//checkout
  