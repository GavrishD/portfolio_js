const $ = document.querySelector.bind(document);
const parallaxFoxlife = $(".foxlife");
const inputEmail = $("#emailInput");
const inputError = $(".input-error");
const emailButton = $(".email-button");
const emailForm = $('.email-form');

// Parallax Effect - Home "foxlife"------------------------------------------
window.addEventListener("scroll", function () {
    let offset = window.pageYOffset;
    parallaxFoxlife.style.backgroundPositionY = offset * 0.7 + "px";
});

// Validation email----------------------------------------------------------
function isEmailValid(email) {
    const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
    return patternEmail.test(email);
}

document.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInputValue = $("#emailInput").value;

    if (isEmailValid(emailInputValue)) {
        inputEmail.className = "valid";
    } else {
        inputEmail.className = "invalid";
    }
});