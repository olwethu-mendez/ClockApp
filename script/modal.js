function modal(openModalSelector, modalWrapperSelector, modalContentSelector, closeModal = false){
    const openModalBtn = document.querySelector(openModalSelector);
    const modalWrapperElement = document.querySelector(modalWrapperSelector);
    const modalContentElement = document.querySelector(modalContentSelector);

    modalWrapperElement.classList.add("modal-wrapper");
    modalContentElement.classList.add("modal-content");
    openModalBtn.classList.add("open-modal")


    openModalBtn.addEventListener("click", () =>{
        modalWrapperElement.style.display = "block";
    });

    modalWrapperElement.addEventListener("click", (event) => {
        if(event.target === modalWrapperElement){
            modalWrapperElement.style.display = "none";
        }
    });

    if(closeModal) {
        modalContentElement.innerHTML += '<span class="close-modal">&times;</span>';
        const closeModalBtn = modalContentElement.querySelector(".close-modal");

        closeModalBtn.addEventListener("click", () => {
            modalWrapperElement.style.display = "none";
        });
    }

}