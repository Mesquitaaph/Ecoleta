

function populateUFs () {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then( states => {
    for(let state of states){  
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  } )
}

populateUFs()


function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  
  
  citySelect.innerHTML = "<option value>Selecione a cidade</option>"
  citySelect.disabled = true
  
  fetch(url)
  .then( res => res.json() )
  .then( cities => {
    

    for(let city of cities){
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false
  })
}




document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)


// Itens de Coleta
const itensToCollect = document.querySelectorAll(".itens-grid li")

for (let item of itensToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")

let selectedItensId = []

function handleSelectedItem(event) {
  const itemLi = event.target
  
  // adicionar ou remover classes com JavaScript
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  // Verificar os itens selecionados, se sim,
  // pegar os itens selecionados

  const alreadySelected = selectedItensId.findIndex( item => item == itemId)

  // Se já estiver selecionado, tirar da seleção
  if(alreadySelected >= 0) {

    const filteredItens = selectedItensId.filter( item => item != itemId)
    selectedItensId = filteredItens

  } else { // Se não estiver selecionao, adicionar à seleção

    selectedItensId.push(itemId)
  }

  // Atualizar o input escondido com os itens selecionados
  collectedItens.value = selectedItensId
}