// var i = 1;
// setInterval(console.log, 1000, i++);
// console.log(i);

// myFetch = new Promise((a, b) => {
//     if (Math.random() > .1) {
//         setTimeout(a, 1000, Math.round(Math.round()*100)) // Szerver valasza.
//     } else {
//         setTimeout(b, 500, "Hiba.") // Hiba a szerver felol.
//     }    
// });

// async function f() {
//     a = 5;
//     try {
//         a = await myFetch();
//         console.log(a);
//     } catch (e) {
//         console.error(e);
//     }
// }

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fetchData').addEventListener('click', () => {
        fetchData();
    });

    function fetchData() {
        let apiCall = new Promise((resolve, reject) => {
            let success = Math.random() > 0.5;
            setTimeout(() => {
                if (success) {
                    resolve('Data fetched successfully!');
                } else {
                    reject('Failed to fetch data.');
                }
            }, 1000);
        });

        apiCall
            .then(response => {
                document.getElementById('result').innerText = response;
            })
            .catch(error => {
                document.getElementById('result').innerText = error;
            })
            .finally(() => {
                console.log('API call completed.');
            });
    }
});
