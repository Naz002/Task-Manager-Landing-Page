const ToggleBtn = document.querySelector(".toggle-btn");
const ToggleBtnIcon = document.querySelector(".toggle-btn i")
const DropDownMenu = document.querySelector(".dropdown-menu")

ToggleBtn.addEventListener("click", () =>{
    DropDownMenu.classList.toggle("active")

    const isActive = DropDownMenu.classList.contains ("active")

    ToggleBtnIcon.classList = isActive
    ?'fa-solid fa-xmark' 
    : 'fa-solid fa-bars'
})