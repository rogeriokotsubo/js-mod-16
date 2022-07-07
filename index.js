import { validateBackSpace, validateInput, limit8, btnCepHover, cepInputObj } from './modules/cep.js';

document.querySelector('#btn-cep').addEventListener('click', searchCep);
export const btnCep = document.querySelector('#btn-cep');
export const btnMap = document.querySelector('#btn-map');
btnCep.disabled = true;
btnCep.addEventListener('mouseover', btnCepHover);
btnCep.addEventListener('mouseout', btnCepHover);
btnMap.addEventListener('click', showMap);
const ctnMap = document.querySelector('#ctn-map');

const msg = document.querySelector("#msg");

function searchCep() {
  if (btnCep.disabled){
    return;
  }

  document.querySelector('#frm-inputs').reset();
  let addressObj={};

  const urlCep='https://cep.awesomeapi.com.br/json/'
  msg.innerHTML = `&nbsp;`
  const cepValue=(cepInputObj.value).replace("-","");

  document.querySelector('body').style.cursor='wait';
  searchCep(urlCep,cepValue);
  document.querySelector('body').style.cursor='default';

  function searchCep(urlApi,cep) {
    fetch(urlApi+cep, { method: "GET" })
    .then(response => {
      if (response.status===200){
        return response.json();
      } else if (response.status===400){
        return Promise.reject('400');
      } else if (response.status===404){
        return Promise.reject('404');
      // } else {
      //   return Promise.reject('999');
      }
    })
    .then(function(data) {
      addressObj=data;
      loadAddress(addressObj);
    })    
    .catch(err => {
      if (err === '400'){
        addressObj={"cep": "400",
        "address": "CEP inválido"};
      } else if (err === "404"){
        addressObj={"cep": "404",
        "address": "O CEP "+cep+" não foi encontrado"};
      } else if (err === "999"){
        addressObj={"cep": "999",
                    "address": "Erro não identificado"};
      } else {
        addressObj={"cep": "998",
                    "address": err.message};
      }
      loadAddress(addressObj);
    });
  }
}

function loadAddress(data){
  switch (data.cep){
    case (cepInputObj.value).replace("-",""):
      document.querySelector("#address").value=data.address;
      document.querySelector("#district").value=data.district;
      document.querySelector("#city").value=data.city;
      document.querySelector("#state").value=data.state;
      document.querySelector("#latitude").value=data.lat;
      document.querySelector("#longitude").value=data.lng;
      btnMap.style.display = "block";
      break;
    case '400':
    case '403':
    case '404':
    case '998':
    case '999':
      msg.textContent=data.address;
      ctnMap.style.display = "none";
      btnMap.style.display = "none";
      break;  
    default:
      msg.textContent='Erro não identificado';
      ctnMap.style.display = "none";
      btnMap.style.display = "none";
    break;  
  }
}

function showMap(){
  const lat = document.querySelector("#latitude").value;
  const lng = document.querySelector("#longitude").value;

  const loc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14713.595064253397!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1657141703121!5m2!1spt-BR!2sbr" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade`;
  document.getElementById('frameMap').src = loc; 
  ctnMap.style.display = "flex";
 }

