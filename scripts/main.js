/**
 * @file main.js
 * @description Main JavaScript file for the Coffee Sales Dashboard.
 */

// Formateador de moneda USD
const fmtUSD = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

let loadData = () => {

    try {
        fetch('https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Coffee/Coffe_sales.xml')
            .then(response => response.text())
            .then(xml => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(xml.trim(), 'application/xml');
                return doc;
            })
            .then(doc => {
                const transactions = Array.from(doc.querySelectorAll('row')).slice(0, 20);
                const tbody = document.getElementById('transacciones');

                tbody.innerHTML = transactions.map(transaction => {
                    const date = transaction.querySelector('Date')?.textContent ?? '';
                    const coffeeName = transaction.querySelector('coffee_name')?.textContent ?? '';
                    const money = Number(transaction.querySelector('money')?.textContent ?? 0);

                    return `
                        <tr>
                            <td>${date}</td>
                            <td>${coffeeName}</td>
                            <td class="money">${fmtUSD.format(money)}</td>
                        </tr>
                    `;
                }).join('');
            })

    } catch (err) {
        console.error(err);
    }

}

window.addEventListener('DOMContentLoaded', loadData);