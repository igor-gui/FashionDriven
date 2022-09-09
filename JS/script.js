const url = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts';

const linkImg = document.querySelector('.linkImg');
const confirmBtn = document.querySelector('.confirmBtn');
const allOptions = document.querySelectorAll('.options');

buscarItens();
const user = prompt("OLAR, QUAL SEU NOME?");

function buscarItens() {
    const promessa = axios.get(url);
    promessa.then(renderizar);
    promessa.catch(tratarErro);
}


function tratarErro(erro) {
    console.log(erro.response.data);
}

function renderizar(resposta) {

    const ArrayItens = resposta.data;
        
    const lastOrders = document.querySelector('.lastOrders');
    lastOrders.innerHTML = '';

    ArrayItens.forEach(element => {
        lastOrders.innerHTML += `<div onclick="orderingAgain(this.querySelector('.data'))" class="box">
                                    <img src="${element.image}">
                                    <h3 class="creator"><b>Criador: </b><span>${element.owner}</span></h3>
                                    <div class="hidden data">
                                    <div class="model" >${element.model}</div>
                                    <div class="neck" >${element.neck}</div>
                                    <div class="material" >${element.material}</div>
                                    <div class="image" >${element.image}</div>
                                    <div class="owner" >${element.owner}</div>
                                    <div class="author" >${element.author}</div>
                                    </div>
                                </div>`
    })

}

function orderingAgain(item){
    const data = toArray(item.children);
    console.log(data);

    const orderObject = {
        model: data[0].innerHTML,
        neck: data[1].innerHTML,
        material: data[2].innerHTML,
        image: data[3].innerHTML,
        owner: user,
        author: data[4].innerHTML
    }
    console.log(orderObject);
    const chamar = axios.post(url, orderObject);
    chamar.then(buscarItens);
}

function select(objToSelect) {
    const gFatherOption = objToSelect.parentNode.parentNode;
    const brothers = gFatherOption.querySelectorAll('.circle');

    for (let i = 0; i < brothers.length; i++) {
        if (brothers[i].classList.contains('selected')) {
            brothers[i].classList.remove('selected');
        }

    }

    objToSelect.classList.add('selected');
    coloredbutton()

}


linkImg.addEventListener("keyup", coloredbutton);


function coloredbutton() {
    const selecteds = document.querySelectorAll('.selected');
    if (linkImg.value.startsWith('https://') && selecteds.length === allOptions.length) {
        confirmBtn.classList.add('filled');
        confirmBtn.setAttribute("onclick", "sendToAPi()")
    }
}

function sendToAPi() {
    const selecteds = document.querySelectorAll('.selected');
    const data = toArray(selecteds);
    const dataTxt = [linkImg.value];
    console.log(selecteds)
    selecteds.forEach(element => {
        dataTxt.push(element.parentNode.querySelector('.hidden').textContent);
    });
    const orderObject = {
        image: dataTxt[0],
        material: dataTxt[3],
        model: dataTxt[1],
        neck: dataTxt[2],
        owner: user,
        author: user
    }
    console.log(orderObject);
    const chamar = axios.post(url, orderObject);
    chamar.then(buscarItens);
}


function toArray(list) {
    const newArray = [];
    for (let i = 0; i < list.length; i++) {
        newArray.push(list[i]);
    }
    return newArray;
}