function init () {
   
  //cargamos carrito

  }
  
    
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
    
          const elModal = document.querySelector('.modal');
          elModal.classList.add('modal--open');
          createOrder()
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

  



  
const categoryTitle = document.querySelector('.category-hero__title')
const category = localStorage.getItem("categoryTitle")
try {
  categoryTitle.innerText=category
} catch (error) {
  
}


// codigo activar titulo naranja de objetos en el navlink: sitenav__item--active
function setCategoryTitle(cat){

  
  localStorage.setItem("categoryTitle", cat)
  

}

function setProductToShow(productPath){

  localStorage.setItem("productToShow", productPath);

}

function removeAllProducts(){
 
  quantity=0;
  localStorage.setItem("quantityCar",quantity)
  quantityShow.innerText="Cart("+quantity+")";
  contentCartMap=new Map();
  localStorage.contentCartMap = JSON.stringify(Array.from(contentCartMap.entries()))
  cargarCarrito()
}


/*
IF DB IS ERRASED, HERE IS SOLUTION LOL

var contentCartMap = new Map();
 contentCartMap.set("Speakers,4",1).set("Speakers,4",1);
localStorage.contentCartMap = JSON.stringify(Array.from(contentCartMap.entries()))
*/

//checkout
const checkoutSummaryContent = document.getElementById('checkoutSummaryContent');
const cartTotal = document.getElementById('cartTotal');
const shippingValue = document.getElementById('shippingValue');
const ivaCheckout = document.getElementById('ivaCheckout');
const garndTotalCheckout = document.getElementById('garndTotalCheckout');
const grandTotalFinal = document.getElementById('grandTotalFinal');
const prodListFinal = document.getElementById('prodListFinal');

var totalF=0
var shippingF=0
var ivaF=0
var granTF=0
  try {
    
  checkoutSummaryContent.innerHTML=``
  contentCartMap = new Map(JSON.parse(localStorage.contentCartMap));
  var totalSummary=0;
  var qp=0;
  prodListFinal.innerHTML=``

  for (var [pathProd, quantity] of contentCartMap) {
    let path = pathProd.split(',');
    //path[0] is category
    //path[1] is product.id
    let mapWhereProducIs = categoriesMap.get(path[0]);
    let productToAdd=mapWhereProducIs.get(path[1]);
    let prce = (productToAdd.price).replace('.','');
    totalSummary+=parseInt(prce*quantity);
    prce=formatoMoneda(prce);
    
    checkoutSummaryContent.innerHTML+=`<li class="cart-card__product product-cart-card" role="listitem">
    <div class="product-cart-card__img-wrapper">
      <img class="product-cart-card__img" src="${productToAdd.srcImgSmall}" alt="" width="48" height="48" srcset="${productToAdd.srcImgSmall} 1x, ${productToAdd.srcImgSmallx2} 2x">
    </div>

    <div class="product-cart-card__info">
      <h3 class="product-cart-card__title">${productToAdd.title}</h3>
      <p class="product-cart-card__price">$ ${prce}</p>
      <div class="product-cart-card__count product-cart-card__count--summary">x${quantity}</div>
    </div>
  </li>`
  
  prodListFinal.innerHTML+=` <li class="products-list__item product-cart-card product-cart-card--small" role="listitem">
  <div class="product-cart-card__img-wrapper">
    <img class="product-cart-card__img" src="${productToAdd.srcImgSmall}" alt="" width="48" height="48" srcset="${productToAdd.srcImgSmall} 1x, ${productToAdd.srcImgSmallx2} 2x">
  </div>

  <div class="product-cart-card__info">
    <h3 class="product-cart-card__title">${productToAdd.title}</h3>
    <p class="product-cart-card__price">$ ${prce}</p>
    <div class="product-cart-card__count product-cart-card__count--summary">x${quantity}</div>
  </div>
</li>`

  qp+=quantity;
  
  }
  var prodsFinal=contentCartMap.size;
  let buttonShowMoreFinal=document.getElementById('buttonShowMoreFinal')

  if(prodsFinal<2)
{
  let buttonShowMoreFinal=document.getElementById('buttonShowMoreFinal')
  buttonShowMoreFinal.style.display='none'
}  else
{
  prodsFinal--
  buttonShowMoreFinal.innerText="and "+prodsFinal+" other item(s)"
}
var grandtotal=0;
  var iva =0.19;
  iva=iva*totalSummary
  ivaF=iva;
  grandtotal+=iva+totalSummary
  totalF=totalSummary
  totalSummary=formatoMoneda(totalSummary)

  cartTotal.innerText="$ "+totalSummary;
  var sv = 10000
  if(qp>3)sv = 8000
  if(qp>5)sv = 7000
  if(qp>8)sv = 6500
 
  sv=qp*sv
  shippingF=sv;
  grandtotal+=sv

  granTF=grandtotal

  sv=formatoMoneda(sv)
  iva=formatoMoneda(iva)
  grandtotal=formatoMoneda(grandtotal)
shippingValue.innerText=  "$ "+sv
ivaCheckout.innerText="$ "+iva
garndTotalCheckout.innerText="$ "+grandtotal
grandTotalFinal.innerText="$ "+grandtotal



} catch (error) {
    
  }

  const form = document.querySelector('.form');

  const email = document.getElementById('email')
  const password = document.getElementById('password');
  

  
  const errorField = document.querySelectorAll(".error");
  
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();


  if (emailValue === '') {
    errorField[0].style.display = 'block';
    errorField[0].textContent = 'Email cannot be empty';
    email.classList.add('error-input')
  } else if (!isValidEmail(emailValue)) {
    errorField[0].textContent = 'Looks like this is not an email';
    errorField[0].style.display = 'block';
    email.classList.add('error-input')
  }

  if (passwordValue === '') {
    errorField[1].style.display = 'block';
    password.classList.add('error-input')
  }

  
  form.addEventListener('submit', (e) => {
  
    e.preventDefault();
  
  });
  
  /*** Remove the error if you write inside a input again ***/
  
  email.addEventListener('input', () => {
    if (email.value.trim() !== '') {
      errorField[0].style.display = 'none';
    }
  });
  
let errorPassword = document.getElementById('errorPassword');




  let userMap = new Map(JSON.parse(localStorage.userMap));
  let user 
let pass
  let userOnline 

  function validatePass(){
 
proced=true;
if (email.value.trim() !== '') {
  user = email.value.trim();
  userOnline = userMap.get(user)
  if(userOnline!=null){
    pass=userOnline.password
  }else proced=false
}


    if (password.value.trim() !== pass) {
      proced=false
    }
    
    return proced
  }

  
  
 function login(){
  
  proced=true;
   proced=validatePass();
  
      if(proced) {
     
       

        emailjs.init("JXa_VvsrF2FFaeqA6");  // Reemplaza "your_user_id" con tu User ID

          
        userMap= new Map(JSON.parse(localStorage.userMap));
        userOnline = userMap.get(localStorage.getItem('userOnline'))
        let destinatario =user;
        var userName = userOnline.name;
        
            const contenido = "Te avisamos que ha habido un ingreso a tu cuenta";
      
            var templateParams = {
              enterprise_name: "Audiophile",
              to_name: userName,
              to: destinatario,
           
              replyto: "jhoana.verav@uqvirtual.edu.co",
              message: contenido,
            };
      
            emailjs.send("service_y4nrdwm", "template_3nhpxxd", templateParams)
              .then(response => {
               
                localStorage.setItem("userOnline", user)
              window.location.href = "index.html"
              })
              .catch(error => {
                console.error('Error al enviar el correo electrónico:', error);
                
              });
      
              
 }else{
  alert("Datos incorrectos / correo no encontrado")
  //window.location.href = "registerPage.html"
 }

 
}




  
  
  