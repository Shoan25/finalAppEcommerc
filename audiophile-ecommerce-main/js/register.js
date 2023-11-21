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

    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email')
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    
    const errorField = document.querySelectorAll(".error");
    
    
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordValue2 = password2.value.trim();

    if (firstNameValue === '') {
      errorField[0].style.display = 'block';
      firstName.classList.add('error-input')
    }
  
    if (lastNameValue === '') {
      errorField[1].style.display = 'block';
      lastName.classList.add('error-input')
    }
  
    if (emailValue === '') {
      errorField[2].style.display = 'block';
      errorField[2].textContent = 'Email cannot be empty';
      email.classList.add('error-input')
    } else if (!isValidEmail(emailValue)) {
      errorField[2].textContent = 'Looks like this is not an email';
      errorField[2].style.display = 'block';
      email.classList.add('error-input')
    }
  
    if (passwordValue === '') {
      errorField[3].style.display = 'block';
      password.classList.add('error-input')
    }

    
    if (passwordValue2 === '') {
      errorField[4].style.display = 'block';
      password2.classList.add('error-input')
    }
    
    form.addEventListener('submit', (e) => {
    
      e.preventDefault();
    
    });
    
    /*** Remove the error if you write inside a input again ***/
    
    firstName.addEventListener('input', () => {
      if (firstName.value.trim() !== '') {
        errorField[0].style.display = 'none';
      
      }
    });
    
    lastName.addEventListener('input', () => {
      if (lastName.value.trim() !== '') {
        errorField[1].style.display = 'none';
       
      }
    });
    
    email.addEventListener('input', () => {
      if (email.value.trim() !== '') {
        errorField[2].style.display = 'none';
      }
    });
    
let errorPassword = document.getElementById('errorPassword');
let errorPassword2 = document.getElementById('errorPassword2');

    password.addEventListener('input', () => {
      validatePass()
    });

    password2.addEventListener('input', () => {
      validatePass()
    });
    
    function validatePass(){
proced=true;
      if (password.value.trim() !== '') {
        if(checkType(password.value.trim())!= 2){
         
          errorField[3].style.display = 'block';
         proced=false
          errorPassword.innerText="Is requiered to put lower and upper letters"
        }else{
          errorField[3].style.display = 'none';
          
        }  
      }

      if (password2.value.trim() !== '') {

        if(password2.value.trim()!=password.value.trim()){
          errorField[3].style.display = 'block';
          proced=false
          errorPassword.innerText="Passwords are not the same"
        }else{
          errorField[4].style.display = 'none';
         
  
        }
       
      }
      return proced
    }

    function checkType(words) {
      words = String(words).trim();
      const regxs = {
        "lower": /^[a-z0-9 ]+$/,
        "upper": /^[A-Z0-9 ]+$/,
        "upperLower": /^[A-Za-z0-9 ]+$/
      }
      
  if (regxs.lower.test(words)) return '0';
  if (regxs.upper.test(words)) return '1';
  if (regxs.upperLower.test(words)) return '2';
  return -1;
}

var pinCorrecto = 1;
function generarNumeroAleatorio() {
  // Generar un número aleatorio entre 1000 y 9999
   pinCorrecto = Math.floor(Math.random() * 9000) + 1000;
}

   function register(){
    proced=true;
     if(firstName.value.trim()==''){
      errorField[0].style.display = 'block';
      proced=false;
     }
     if(lastName.value.trim()==''){
      proced=false;
      errorField[1].style.display = 'block';
    }
      if(email.value.trim()==''){proced=false;
        errorField[2].style.display = 'block';}
      if(password.value.trim()==''){proced=false
        errorField[3].style.display = 'block';};
      if(password2.value.trim()==''){proced=false
        errorField[4].style.display = 'block';};
        proced=validatePass();
      
        if(proced) {

        
            generarNumeroAleatorio()
          

          emailjs.init("JXa_VvsrF2FFaeqA6");  // Reemplaza "your_user_id" con tu User ID

          
            const destinatario = email.value.trim();
            const asunto = "";
            const contenido = "Tu codigo de registro es: "+pinCorrecto;
      
            var templateParams = {
              enterprise_name: "Audiophile",
              to_name: firstName.value.trim(),
              to: destinatario,
              subject: asunto,
              replyto: "jhoana.verav@uqvirtual.edu.co",
              message: contenido,
            };
      
            emailjs.send("service_y4nrdwm", "template_3nhpxxd", templateParams)
              .then(response => {
                
              })
              .catch(error => {
                console.error('Error al enviar el correo electrónico:', error);
                
              });
          
              document.getElementById('fondoOscuro').style.display = 'flex';
              document.getElementById('1').style.display = 'flex';
              document.getElementById('2').style.display = 'flex';
        }

        

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
      
      cerrarVentana();

      let userCount=localStorage.getItem('userCount');
      let userMap = new Map(JSON.parse(localStorage.userMap));
      let map = new Map();

      userCount++;
      
      userMap.set(String(email.value.trim()), new user(String(userCount),firstName.value.trim(),lastName.value.trim(),email.value.trim(),password.value.trim(), JSON.stringify(Array.from(map.entries())),JSON.stringify(Array.from(map.entries())),0,JSON.stringify(Array.from(map.entries()))));
      console.log(userMap)
      localStorage.userMap = JSON.stringify(Array.from(userMap.entries()));
      localStorage.setItem("userCount", userCount)
      localStorage.setItem("userOnline", String(email.value.trim()))
      window.location.href = "index.html"
     

    } else {
      alert('PIN incorrecto. Inténtelo de nuevo.');
    }
  }
  

   class user {
    constructor(id,name,lastname,email,password,ordermap,contentcarmap,quantitycar, wishListMap){
      this.id = id;
      this.name = name;
      this.lastname = lastname;
      this.email = email;
      this.password = password;
      this.ordermap = ordermap;
      this.contentcarmap = contentcarmap;
      this.quantitycar = quantitycar;
      this.wishListMap =wishListMap;
    }
   }
    
    
    