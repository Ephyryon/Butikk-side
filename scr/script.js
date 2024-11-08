let list = JSON.parse(sessionStorage.getItem("list")) || [];
let payment = JSON.parse(sessionStorage.getItem("payment")) || 0;

const items = {
    '/scr/1.html': { name: 'Type1Shooter', price: 150 },
    '/scr/2.html': { name: 'Platform Survival', price: 239},
    '/scr/3.html': { name: 'jarlsberg', price: 139},
    '/scr/4.html': { name: 'Musikk Spiller', price: 199 }
};

function calculatePayment() {
    payment = list.reduce((total, itemName) => {
        const item = Object.values(items).find(i => i.name === itemName);
        return total + (item ? item.price : 0);
    }, 0);
    sessionStorage.setItem("payment", JSON.stringify(payment));
    if (payment) {
        document.getElementById('payment').innerText = `Total Payment: ${payment}`;
    }
}

function updateCartContents() {
    const cartContents = document.getElementById("cartContents");
    if (cartContents) {
        cartContents.innerHTML = ""; // Clear the contents
        list.forEach(function(item, index) {
            const li = document.createElement("li");
            li.textContent = item;
            li.addEventListener("click", function() {
                list.splice(index, 1);
                sessionStorage.setItem("list", JSON.stringify(list));
                updateCartContents();
                calculatePayment();
            });
            cartContents.appendChild(li);
        });
    }
}

function Choice() {
    const handlevogn = document.getElementById("handlevogn");
    const addItem = document.getElementById("addItem");

    handlevogn?.addEventListener("click", function() {
        window.location.href = "handlevogn.html";
    });

    addItem?.addEventListener("click", function() {
        const currentPage = window.location.pathname;
        const item = items[currentPage];
        if (item) {
            list.push(item.name);
            sessionStorage.setItem("list", JSON.stringify(list));
            console.log(list);
            updateCartContents();
            calculatePayment();
        }
    });
}

Choice();
updateCartContents();
calculatePayment();