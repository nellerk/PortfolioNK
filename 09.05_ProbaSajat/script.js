const allatok=['matka', 'kutya', 'malac', 'csacsi', 'lo', 'szamar']
function init() {
    document.getElementById('body').innerHTML = allatok.map( v=>
        `<div onclick="f('${v}')">${v}</div>`
    ).join("")
}

function f(a) {
    console.log(a);
}