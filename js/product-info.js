var currentProductArray = [];
var comentariosArray = [];

function showProductInfo(producto, arrayComments) {

    let info = "";
    let imgs = "";
    let comments = "<hr>";

    info += `
        <div>
            <div>
                 <h3>${producto.name}</h3>
                 <p>${producto.description}</p>
                 <p>Precio: ${producto.cost}
                 ${producto.currency}</p>
                 <p>Vendidos: ${producto.soldCount}</p>
                 <p>Categoría: ${producto.category}</p><br>
            </div>
        </div>

            `;

    imgs += `
             <div class="imagenes">
                 <img class="img" src="` + currentProductArray.images[0] + `" width="200px">
                 <img class="img" src="` + currentProductArray.images[1] + `" width="200px">
                 <img class="img" src="` + currentProductArray.images[2] + `" width="200px">
                 <img class="img" src="` + currentProductArray.images[3] + `" width="200px">
                 <img class="img" src="` + currentProductArray.images[4] + `" width="200px">
             </div>
             `;

    arrayComments.forEach(function (comment) {

        let puntos = "";

        comments += `
                 <div class="comentario">
                     <strong>${comment.user} dice:</strong><br>
                     <p>${comment.description}</p>
        `;
        for (let i = 1; i <= comment.score; i++) {
            puntos += `<span class="fa fa-star checked"></span>`;
        }

        for (let i = comment.score + 1; i <= 5; i++) {
            puntos += `<span class="fa fa-star"></span>`;
        }
        comments += `<div style="text-align: right;">${puntos}</div>
        <p class="text-muted text-right">${comment.dateTime}</p></div><br>`;


    })


    document.getElementById("prodInfo").innerHTML = info;
    document.getElementById("prodImgs").innerHTML = imgs;
    document.getElementById("prodCom").innerHTML = comments;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let userLogged = localStorage.getItem('User-Logged');
    if (userLogged) {
        document.getElementById('sinAcceder').style = "display: none";
        document.getElementById('nuevoComentarioContenedor').style = "display: inline-block";
    }

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data
        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            currentProductArray = resultObj.data;

            showProductInfo(currentProductArray, comentariosArray);
        }
    });

    
    document.getElementById('enviarComm').addEventListener("click", function(e) {
        let newComment = {
            score: parseInt(document.getElementById('newCal').value),
            description: document.getElementById('newComm').value,
            user: JSON.parse(localStorage.getItem('User-Logged')).email
        };
        comentariosArray.push(newComment);
    
        showProductInfo(currentProductArray, comentariosArray);
    })

});