const dropdowMenu = document.querySelector(".dropdown-menu");
const toggleBtn = document.querySelector(".toggle-btn");
const toggleBtnIcon = document.querySelector(".toggle-btn i");

toggleBtn.addEventListener("click", () =>{
    dropdowMenu.classList.toggle("active")

    const isActive = dropdowMenu.classList.contains("active")

    toggleBtnIcon.classList = isActive
    ?'fa-solid fa-xmark'
    :'fa-solid fa-bars'
})