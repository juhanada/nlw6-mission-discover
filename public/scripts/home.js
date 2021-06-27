const modalButton = document.querySelector('.modal .buttons')

modalButton.addEventListener("click", handleClick)

function handleClick(event){ 
    modalWrapper.classList.remove("active")
}