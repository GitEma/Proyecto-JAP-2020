const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const SOLD_COUNT = "soldCount.";
const ORDER_BY_HIGH_PRICE = "cost->COST";
const ORDER_BY_LOW_PRICE = "COST->cost";

var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var buscar = undefined;

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_HIGH_PRICE) {
        result = array.sort(function (a, b) {

            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });

    } else if (criteria === ORDER_BY_LOW_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {

            if (buscar == undefined || category.name.toLowerCase().indexOf(buscar) != -1) {


                htmlContentToAppend += /*
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name + `</h4>


                            <small class="text-muted">` + category.soldCount + ` artículos vendidos.</small>


                        </div>
                        <p class="mb-1">` + category.description + `</p>
                        <div class="precio">
                        <p>` + category.cost + ' ' + category.currency + `</p>
                        <button id="buyBtn">Comprar.</button>
                        </div>
                    </div>
                </div>
            </a>
            */

            `
<div class="col-sm-1 col-md-2 col-lg-3 mb-1" style="max-width: 20rem;">
    <div class="card bg-dark border-primary">
      <div class="inner"><img src="${category.imgSrc}" class="img card-img-top" alt="..."></div>

      <div class="card-body">
         <div class="card-header border-primary">
             <h5 class="card-title">${category.name}</h5>
             
         </div>
             <div class="text-right"><small style="color: lightblue">${category.soldCount} articulos vendidos.</small></div>
             <p class="card-text-white">${category.description}</p>
      </div>


      <div class="card-footer bg-transparent border-primary">
         <div class="text-right"><strong>${category.cost} ${category.currency}</strong></div><hr>
         <a href="product-info.html" class="btn btn-md btn-primary btn-block">Ver producto</a></div>

    </div>
</div>         
            `
            }
        }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortVendidos").addEventListener("click", function () {
        sortAndShowCategories(SOLD_COUNT);
    });

    document.getElementById("sortAlto").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_HIGH_PRICE);
    });

    document.getElementById("sortBajo").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_LOW_PRICE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById('rangeFilterCount').addEventListener("click", function (e) {
        minCount = document.getElementById('rangeFilterCountMin').value;
        maxCount = document.getElementById('rangeFilterCountMax').value;

        if (((minCount != undefined) && minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if (((maxCount != undefined) && maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxPag = undefined;
        }
        showCategoriesList();
    });

    document.getElementById('buscador').addEventListener('input', function (e) {
        buscar = document.getElementById('buscador').value.toLowerCase();

        showCategoriesList();
    });

    document.getElementById('limpBusc').addEventListener("click", function (e) {
        document.getElementById('buscador').value = '';

        buscar = undefined;

        showCategoriesList();
    });

});
