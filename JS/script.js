const url = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts';
const itens = [];

const linkImg = document.querySelector('.linkImg');
const confirmBtn = document.querySelector('.confirmBtn');
const allOptions = document.querySelectorAll('.options');

function buscarItens() {
    const promessa = axios.get(url);
    promessa.then(renderizar);
}
buscarItens()

function renderizar(resposta) {
    const ArrayItens = resposta.data;
    ArrayItens.forEach(element => {
        itens.push(element);
    });
    console.log(itens);
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

}

function olar(){
    console.log("olar");
}

function coloredbutton() {
    const selecteds = document.querySelectorAll('.selected');
    if(linkImg.value.startsWith('https://') && selecteds.length === allOptions.length){
        confirmBtn.classList.add('filled');
        confirmBtn.setAttribute("onclick", "olar()")
    }
}

linkImg.addEventListener("keydown", coloredbutton);