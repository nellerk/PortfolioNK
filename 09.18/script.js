// tomb = [];
// fuggveny = () => {
//     elem = document.getElementById("X");
//     tomb.push[elem.value];
//     elem.value = '';
//     console.log(tomb);
//     document.getElementById("XX").innerHTML = tomb.sort().join("<br>");
// }

function clearDisplay() {
    document.getElementById('display').value = '';
}

function clearEntry() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'Error';
    }
}
