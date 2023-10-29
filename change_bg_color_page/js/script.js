function changeColor() {
    const body = document.querySelector("body");
    let randomColor = (Math.random().toString(16)).substring(2, 8).toUpperCase();

    body.style.background = `#${randomColor}`;

    document.getElementById("color").innerHTML = randomColor;
    document.getElementById("color").style.color = `#${randomColor}`;

    console.log(randomColor);
}

document.querySelector("button").addEventListener("click", changeColor);