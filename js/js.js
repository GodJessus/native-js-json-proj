let tovar = null;
window.onload = () => findFilter('all');

fetch('json/content.json')
    .then(response => response.json())
    .then(summary => {
        loadCategory(summary.category);
        loadFirm(summary.firm);
        initTovar(summary.content);
    });

const aa = document.createElement('div');
const tov = document.getElementById('tovar');
const sum = document.getElementById('sum');
const dropMenu = document.getElementsByClassName('dropdown-menu');
const cart = document.getElementsByClassName('table')[0];

let costSum = 0;

const summa = (obj, s) => {
    if (obj.category === 'Phones') {
        if (document.getElementById("mem128" + obj.id).checked)
            costSum += (obj.cost + 220);
        else if (document.getElementById("mem64" + obj.id).checked)
            costSum += (obj.cost + 150);
        else costSum += obj.cost;
    } else costSum += s;

    sum.innerHTML = `Всего: ${costSum} $`;
};

//да, это костыль
function initTovar(t) {
    return tovar = t;
}

function loadCategory(category) {
    for (let tov of category) {
        let drop = document.createElement('div');
        drop.innerHTML = `<a class="dropdown-item" onclick=findFilter('${tov}')>${tov}</a>`;
        dropMenu[0].appendChild(drop);
    }
}

function loadFirm(firm) {
    for (let tov of firm) {
        let drop = document.createElement('div');
        drop.innerHTML = `<a class="dropdown-item" onclick=findFilter('${tov}')>${tov}</a>`;
        dropMenu[1].appendChild(drop);
    }
}

const findFilter = (value) => {
    var memory;

    tov.innerHTML = '';
    for (let i = 0; i < tovar.length; i++) {

        memory = `  <div class="form-check form-check-inline">
                          <input type="radio" class="form-check-input" id="mem64${tovar[i].id}"
                          name="inlineMaterialRadiosExample"> 
                          <label class="form-check-label" for="materialInline2">64</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                          <input type="radio" class="form-check-input" 
                           id="mem128${tovar[i].id}" name="inlineMaterialRadiosExample">
                          <label class="form-check-label" for="materialInline3">128</label>
                        </div>`;

        if (value === tovar[i].category || value === tovar[i].firm || value === 'all') {
            let tovCont = document.createElement('div');
            tovCont.className = "tovContainer";
            tovCont.innerHTML =
                `<div class="card">
                <div class="card-header bg-transparent">c ${tovar[i].firm}</div>
                <img class="card-img-top" 
                src='${tovar[i].img}' alt="Card image cap">
                <div class="card-body">
                  <h4 class="card-title"><a>${tovar[i].name}</a></h4>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                    content.</p>`
                    .concat(tovar[i].category === 'Phones' ? memory : '')
                    .concat(
                        `<button onclick="var obj = tovar[${i}]; tovar[${i}].onCart++; summa(obj, tovar[${i}].cost)" class="btn btn-success" style="margin-top: 5px;">
                   <i class="fas fa-shopping-cart"><br>${tovar[i].cost}</i>
                   </button>
                </div>
            </div>`);
            tov.appendChild(tovCont);
        }
    }
};

const isOnCart = () => {
    cart.innerHTML =
        `<thead class="bg-dark ">
                <tr>
                  <th scope="col" class="border-0 bg-dark">
                    <div class="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" class="border-0 bg-dark">
                    <div class="py-2 text-uppercase">Name</div>
                  </th>
                  <th scope="col" class="border-0 bg-dark">
                   <img alt="" width="70" class="img-fluid rounded shadow-sm">
                    <div class="py-2 text-uppercase"></div>
                  </th>
                  <th scope="col" class="border-0 bg-dark">
                    <div class="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" class="border-0 bg-dark">
                    <div class="py-2 text-uppercase">Quantity</div>
                  </th>
                </tr>
              </thead>`;
    for (let i = 0; i < tovar.length; i++) {
        if (tovar[i].onCart) {
            let tovCont = document.createElement('tr');
            tovCont.innerHTML = `
			     <td>${tovar[i].category}</td>
			     <th>${tovar[i].name}</th>
			     <th><img src="${tovar[i].img}" style="height: 100px; width: 100px"></th>
			     <td>${tovar[i].cost}</td>
			     <td>${tovar[i].onCart}</td>`;
            cart.appendChild(tovCont);
        }
    }
}