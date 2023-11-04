class Validator {
    static isNameValid(name) {
        if (typeof name === "string") {
            const patternName = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/;
            return patternName.test(name);
        }
        return false;
    }
    static isEmailValid(email) {
        if (typeof email === "string") {
            const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
            return patternEmail.test(email);
        }
        return false;
    }
    static isPasswordValid(password) {
        if (password.length >= 8) {
            const patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/;
            return patternPassword.test(password);
        }
        return false;
    }

    static changeInputStyle(input, isValid) {
        if (isValid) {
            input.classList.add("valid-input");
            input.classList.remove("invalid-input");
        } else {
            input.classList.add("invalid-input");
            input.classList.remove("valid-input");
        }
    }
    static checkName(input) {
        const isValid = this.isNameValid(input.value);
        this.changeInputStyle(input, isValid);
    }
    static checkEmail(input) {
        const isValid = this.isEmailValid(input.value);
        this.changeInputStyle(input, isValid);
    }
    static checkPassword(input) {
        const isValid = this.isPasswordValid(input.value);
        this.changeInputStyle(input, isValid);
        console.log(input.value);
    }
    static confirmPassword(input) {
        const password = document.getElementById("userPassword");
        const confirmPassword = document.getElementById("сonfirmPassword");
        
        if (password.value === confirmPassword.value) {
            input.classList.add("valid-input");
            input.classList.remove("invalid-input");
        } else {
            input.classList.add("invalid-input");
            input.classList.remove("valid-input");
        }
        console.log(confirmPassword.value);
    }
}

// input[type="range"]-------------------------------------------------------------
for (let e of document.querySelectorAll('input[type="range"]')) {
    e.style.setProperty("--value", e.value);
    e.style.setProperty("--min", e.min == "" ? "0" : e.min);
    e.style.setProperty("--max", e.max == "" ? "100" : e.max);
    e.addEventListener("input", () => e.style.setProperty("--value", e.value));
    document.getElementById("outputId").value = e.value + "K";
}