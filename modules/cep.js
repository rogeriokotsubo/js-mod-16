
import { btnCep, btnMap } from '../index.js';

export const cepInputObj = document.querySelector("#cep");
let cepValue=cepInputObj.value;

cepInputObj.addEventListener('keyup', limit8);
cepInputObj.addEventListener('keydown', validateBackSpace);
cepInputObj.addEventListener('input', validateInput);

export function validateBackSpace(e) {
  if (e.key==='Backspace'){
    const lenCEP = cepValue.length 
    if (lenCEP > 0){
      cepValue = cepValue.substr(0, lenCEP-1);
    }    
    activeButtonCep();
  }
}

export function limit8(e){
  const newcep = cepInputObj.value.replace('-','');
  const lenCEP = newcep.length;
  if (lenCEP > 8){
    cepInputObj.value = cepValue;
  } else 
  if (lenCEP>5) {
    cepInputObj.value = newcep.substr(0,5)+'-'+newcep.substr(5);        
  } 
  cepValue=cepInputObj.value;
  activeButtonCep();
}

export function validateInput(e){
  switch (e.data){
    case '0':  // 0 
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':   //9
      break;
    default:
      cepInputObj.value = cepValue;
      activeButtonCep();     
  }    
}

function activeButtonCep(){
  if (cepValue.length===9){
    btnCep.disabled = false; 
  } else {
    btnCep.disabled = true;
  }
  btnCepHover();
};

export function btnCepHover(){
  if (btnCep.disabled){
    btnCep.style.backgroundColor='#787878';
    btnCep.style.color='#ffffff';
    btnCep.style.cursor='default'
  } else {
    btnCep.style.backgroundColor='#78787870';
    btnCep.style.color='#000000';
    btnCep.style.cursor='pointer';
  };
}
