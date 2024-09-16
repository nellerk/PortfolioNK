var bl = [];

function f(e) {
    bl.push(e.value);
    bl.sort();
    e.value=''
    document
    .querySelector('#output')
    .innerHTML =
    bl.map((elem, i) => `
        <div class="x${i % 2}">
        ${elem}
        </div>
    `).join('');
}