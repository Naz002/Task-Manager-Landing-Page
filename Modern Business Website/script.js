const toggleBtn = document.querySelector(".toggle-btn");
const toggleBtnIcon = document.querySelector(".toggle-btn i");
const dropDownMenu = document.querySelector(".dropdown-menu");

toggleBtn.addEventListener("click", () => {
    dropDownMenu.classList.toggle("active")

    const IsActive = dropDownMenu.classList.contains("active")

    toggleBtnIcon.classList = IsActive
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars'
})