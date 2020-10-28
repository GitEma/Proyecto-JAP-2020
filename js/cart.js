var cartArray = [];

function calcTotal() {
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++) {
        total += parseInt(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;
    calcEnvio()
}


function calcSubtotal(unitCost, i) {

    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = cantidad * unitCost;
    document.getElementById(`cartSubtotal${i}`).innerHTML = subtotal;
    calcTotal();
}


function showCart(array) {

    let contenido = "";

    for (let i = 0; i < array.length; i++) {

        let cart = array[i];



        //----------conversion-------------------------

        let dolarAPeso;

        if (cart.currency === 'USD') {
            dolarAPeso = cart.unitCost * 40;
        } else {
            dolarAPeso = cart.unitCost;
        }

        //---------------------------------------------

        let sub = dolarAPeso * cart.count;

        contenido += `
    <tr>
        
         <td> <img src='${cart.src}' class="img-thumbnail" style="width:70px;"> </td>
         
         <td>${cart.name}</td>
         
         <td> ${cart.unitCost}</td>

         <td>${cart.currency}</td>
         
         <td>
             <div>
                 <input style="width:100px" onchange="calcSubtotal(${sub}, ${i})"
                 type="number" id="cantidad${i}" value="${cart.count}" min="1">
             </div>
         </td>
            
         <td><span class="subtotal" id="cartSubtotal${i}" style="font-weight:bold;">${sub}</span></td>

         <td><button class="btn btn-sm btn-outline-danger" onclick="borrarItem(${i})">X</button>
            
    </tr><br>
    `

        document.getElementById('cart').innerHTML = contenido;
    }

    calcTotal();

}

function calcEnvio() {
    let total = parseInt(document.getElementById("total").innerHTML);
    let envio;

    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envio = parseInt(elements[i].value);
        }
    }

    let totalConEnvio = total * envio / 100;

    let contenido = `
    <tr>

        <td class="envioYTot">${totalConEnvio}</td>

    </tr>
    `

    document.getElementById("totalEnvio").innerHTML = contenido;
}


function borrarItem(i) {
    if (cartArray.length > 1) {
        cartArray.splice(i, 1) //el segundo parametro es la cantidad de obj que queremos borrar.
        showCart(cartArray);
    } else {

        document.getElementById('tabla').innerHTML = `
                                                 
                                                     
                                                     <div class="container row col">

                                                          <h2>No hay artículos en el carrito.</h2>
                                                          <p>Quizá encuentres algo para agregar <a href="home.html">aquí</a></p>
                                                     </div>
                                                     
                                                 
                                                     `
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data.articles;

            showCart(cartArray);

            calcEnvio()
        }
    });


    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function () {
            calcEnvio()
        });
    }





    // Example starter JavaScript for disabling form submissions if there are invalid fields


    /* Fetch all the forms we want to apply custom Bootstrap validation styles to
    let form = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission

    form.addEventListener('submit', function (event) {
        
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    })
      */


    //////////////////////////////////


    (function() {
        'use strict';
        window.addEventListener('load', function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName('needs-validation');
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
      })();



    /////////////////////////////////



    let payAdded = document.getElementById('addPayment');

    payAdded.addEventListener('click', function (e) {

        let content = "";

        let payMethod = document.getElementById('payMethod').value;

        let tarjeta = document.getElementById('numTarj').value;

        let camposCheck = true;

        if (payMethod === '' || tarjeta === '') {
            camposCheck = false;



        }

        if (camposCheck) {



            content += `

                     <hr><div class="alert-success"><strong>Forma de pago añadida:  ${payMethod} </strong></div><hr>
        
                     `
        }
        document.getElementById('payAdded').innerHTML = content;


    });




});

