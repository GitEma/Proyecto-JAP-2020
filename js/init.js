const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = /*"https://japdevdep.github.io/ecommerce-api/cart/987.json"*/ "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  let userLogged = localStorage.getItem('User-Logged');
  let infoUser = document.getElementById('info-user')
  let user = document.getElementById('user');
  let salir = document.getElementById('salir');
  let iniciar = document.getElementById('LogIn');


  if (userLogged) {
    userLogged = JSON.parse(userLogged);
    user.innerText = user.innerText + '' + userLogged.email;
    infoUser.style = "display: inline-block";
    user.style = "display: inline-block"
    
    salir.style = "display: inline-block"
    
  } else { iniciar.style = "display: inline-block;";

let debeiniciar = ""

debeiniciar = 
'Iniciar sesión.'

iniciar.innerHTML = debeiniciar;}

  document.getElementById('salir').addEventListener("click", function (e) {
    localStorage.removeItem('User-Logged');
    window.location = 'index.html';
  })
});