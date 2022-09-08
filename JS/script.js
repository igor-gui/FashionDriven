const url = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts';
const promessa = axios.get(url);
promessa.then(console.log(promessa));



function select(objToSelect) {
    const gFatherOption = objToSelect.parentNode.parentNode;
    const brothers = gFatherOption.querySelectorAll('.circle');

    for(let i = 0; i < brothers.length; i++){
        if(brothers[i].classList.contains('selected')){
            brothers[i].classList.remove('selected');
        }
    }
    objToSelect.classList.add('selected');

}

/* let filledLink = document.querySelector('.linkImg').startsWith('https://');

if(filledLink){
    document.querySelector('.confirmBtn').classList.add('filled')
} */
