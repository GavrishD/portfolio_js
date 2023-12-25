const parallaxFoxlife = $(".foxlife");
const inputEmail = $(".email-form input");
const inputError = $(".input-error");

// Parallax Effect - Home "foxlife"------------------------------------------
window.addEventListener("scroll", function () {
    let offset = window.pageYOffset;
    parallaxFoxlife.style.backgroundPositionY = offset * 0.7 + "px";
});

// Validation email----------------------------------------------------------
function isEmailValid(email) {
    if (typeof email === 'string') {
        const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
        return patternEmail.test(email);
    }
    return false;
}

inputEmail.addEventListener('change', (event) => {
    const targetEmail = event.target.value;

    if (isEmailValid(targetEmail)) {
        inputEmail.classList.add("valid");
        inputEmail.classList.remove("invalid");
        inputError.classList.remove("visible");
    } else {
        inputEmail.classList.add("invalid");
        inputEmail.classList.remove("valid");
        inputError.classList.add('visible');
    }
})