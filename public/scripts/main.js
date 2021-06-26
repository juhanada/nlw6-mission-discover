import Modal from './modal.js'

const modal = Modal()

// pegar botoes da classe check
const checkButtons = document.querySelectorAll(".actions a.check")

// pegar botoes delete
const deleteButtons = document.querySelectorAll(".actions a.delete")

const modalButton = document.querySelector('.modal button')
const modalTitle = document.querySelector('.modal h2') 
const modalDescription = document.querySelector('.modal p')


// adicionar event listener no delete
// nao entendi event event rs
deleteButtons.forEach(button => { 
    button.addEventListener("click", (event) => handleClick(event, false))
})

 //adicionar event listener no check
checkButtons.forEach(button => {
    button.addEventListener("click", handleClick)
})

//padrao do check é true
function handleClick(event, check = true){
    
    //links n comportam como links
    event.preventDefault()

    const room = document.querySelector("#room-id").dataset.id
    const question = event.target.dataset.id
    const action = check ? 'check' : 'delete' 

    console.log(room)
    
    const form = document.querySelector('.modal form')

    console.log(form.dataset.id)
    form.setAttribute("action", `/question/${room}/${question}/${action}`)
    console.log(form.action)

    modalTitle.innerHTML = check ? 'Marcar como lida' : 'Excluir essa pergunta'
    modalDescription.innerHTML = check ? 'Deseja realmente marcar essa pergunta como lida?' : 'Deseja realmente excluir essa pergunta?'
    modalButton.innerHTML = check ? 'Prosseguir' : 'Excluir'

    if (check)
        modalButton.classList.remove('red')
    else
        modalButton.classList.add('red')

    modal.open()
}