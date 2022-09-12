const url = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts';

const linkImg = document.querySelector('.linkImg');
const confirmBtn = document.querySelector('.confirmBtn');
const allOptions = document.querySelectorAll('.options');

buscarItens();
const user = prompt("OLÁ, QUAL SEU NOME?");

function buscarItens() {
    const promessa = axios.get(url);
    promessa.then(renderizar);
    promessa.catch(tratarErro);
}


function tratarErro(erro) {
    console.log(erro.response.data);
    let error = erro.response.status;
    alert(` 
            Error ${error}: ${erro.response.data} 

            Ops, não conseguimos processar a operação`)
}

function renderizar(resposta) {

    const ArrayItens = resposta.data;
    console.log(ArrayItens);
    const lastOrders = document.querySelector('.lastOrders');
    lastOrders.innerHTML = '';

    ArrayItens.forEach(element => {
        lastOrders.innerHTML += `<div onclick="ordering(this.querySelector('.data'))" class="box">
                                    <div class="SubBox"><img src="${element.image}"></div>
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

function ordering(item) {
    const confirmation = confirm('Deseja pedir a peça selecionada?');
    if (confirmation) {

        alert('Isso aí!! Sua solicitação foi enviada ao nosso servidor! :)');
        orderingAgain(item);
    }
}

function orderingAgain(item) {
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
    chamar.catch(tratarErro);
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
    if ((linkImg.value.startsWith('https://') || linkImg.value.startsWith('http://')) && selecteds.length === allOptions.length) {
        confirmBtn.classList.add('filled');
        confirmBtn.setAttribute("onclick", "sendToAPi()")
    }
}

function sendToAPi() {
    const confirmation = confirm('Você está certo disso?');
    const selecteds = document.querySelectorAll('.selected');
    if ((linkImg.value.startsWith('https://') || linkImg.value.startsWith('http://')) && confirmation && selecteds.length === allOptions.length) {
        alert('Isso aí!! A solicitação foi enviada ao nosso servidor! :)');
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
        chamar.catch(tratarErro);
    } else {
        alert('Para fazer a solicitação, por favor preencha todos os dados e confirme o pedido');
    }
}


function toArray(list) {
    const newArray = [];
    for (let i = 0; i < list.length; i++) {
        newArray.push(list[i]);
    }
    return newArray;
}