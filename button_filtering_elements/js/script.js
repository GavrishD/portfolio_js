const tabNavFoxes = document.querySelectorAll(".foxes-options button");
const tabItemFoxes = document.querySelectorAll(".foxes-item");

document.addEventListener("click", function (e) {
    const targetElement = e.target;
    let currentActiveIndex = null;
    let newActiveIndex = null;

    if (targetElement.closest(".foxes-options button")) {
        tabNavFoxes.forEach((tabNavFoxes, index) => {
            if (tabNavFoxes.classList.contains("active")) {
                currentActiveIndex = index;
                tabNavFoxes.classList.remove("active");
            }
            if (tabNavFoxes === targetElement) {
                newActiveIndex = index;
            }
        });
    targetElement.classList.add("active");
    tabItemFoxes[currentActiveIndex].classList.remove("active");
    tabItemFoxes[newActiveIndex].classList.add("active");
    }
});
