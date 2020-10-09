var cartArray = [];

function calcTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++){
        total += parseInt(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;
    calcEnvio()
}


function calcSubtotal(unitCost, i){

    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = cantidad * unitCost;      
    document.getElementById(`cartSubtotal${i}`).innerHTML = subtotal;
    calcTotal();
}


function showCart(array) {

    let contenido = "";

    for (let i = 0; i < array.length; i++) {

        let cart = array[i];

        let sub = cart.unitCost * cart.count;

        contenido += `
    <tr>
         <td><img src='${cart.src}' widith="50px"</td>
         <td>${cart.name}</td>

         <td>${cart.unitCost}</td>
         <td>${cart.currency}</td>
         
         <td><input style="widith:60px;" onchange="calcSubtotal(${cart.unitCost}, ${i})"
             type="number" id="cantidad${i}" value="${cart.count}" min="1"></td>
             
         <td><span class="subtotal" id="cartSubtotal${i}" style="font-weight:bold;">${sub}</span></td>
    </tr>
    `

        document.getElementById('cart').innerHTML = contenido;
    }

    calcTotal();

}


function calcEnvio(){
    let total = parseInt(document.getElementById("total").innerHTML);
    let envio;

    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envio = parseInt(elements[i].value);
        }
    }

    let totalConEnvio = total + envio;

    let contenido = `
    <tr>

        <td class="envioYTot">${totalConEnvio}</td>

    </tr>
    `

    document.getElementById("totalEnvio").innerHTML = contenido;
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
        elements[i].addEventListener("change", function(){
            calcEnvio()
        });
    }





});

