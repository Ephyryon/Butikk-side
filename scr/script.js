let list = JSON.parse(sessionStorage.getItem("list")) || [];

ting = "";
payment = 0;
switch (window.location.pathname) {
    case '/scr/handlevogn.html':
        ting = "";
        price = 0;
    case '/scr/4.html':
        ting = "jarlsberg"
        price = 139;
    }




/* Jeg prøvde å finne en metode hvor jeg kunne skrive en liste på nettsiden. */
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
            });
            cartContents.appendChild(li);
        });
    } 
}

/* Her lagde jeg en funksjon som gir en effect til knappene på nettsiden. */
function Choice() {
    const handlevogn = document.getElementById("handlevogn");
    const jarlsberg = document.getElementById("jarlsberg");
    const remove = document.getElementById("remove");

    /* Handlevogn tar en til handlevognen hvor handlevognen (skulle blit) blir skrivd ut. */
    handlevogn?.addEventListener("click", function() {
        window.location.href = "handlevogn.html";
    });

    /* Jarlsberg leger en jarlsberg til handlevogn listen. */
    jarlsberg?.addEventListener("click", function() {
        list.push(ting);
        payment += price;
        sessionStorage.setItem("payment");
        sessionStorage.setItem("list", JSON.stringify(list));
        console.log(list);
        updateCartContents();
    });
}

Choice();
updateCartContents();