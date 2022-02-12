/* Lista as pizzas */
let modalQt = 1;
let cart = [];
let modalKey = 0;

const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);

pizzaJson.map((pizza, i) => {
  /* mapeia cada pizza */
  let pizzaItem = c(".models .pizza-item").cloneNode(true); //pega a model do index e clona
  // preenche as infos em pizza item
  pizzaItem.setAttribute("data-key", i); //seta a key de cada pizza
  //colocar a imagem da pizza
  pizzaItem.querySelector(".pizza-item--img img").src = pizza.img;
  //nome da pizza
  pizzaItem.querySelector(".pizza-item--name").innerHTML = pizza.name;
  //descricao
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = pizza.description;
  //preço
  pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$ ${pizza.price
    .toFixed(2)
    .replace(".", ",")}`;

  pizzaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();

    let key = e.target.closest(".pizza-item").getAttribute("data-key"); //pega a pizza clicada
    modalQt = 1;
    modalKey = key;

    c(".pizzaBig img").src = pizzaJson[key].img;
    c(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
    c(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;
    c(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[key].price
      .toFixed(2)
      .replace(".", ",")}`;
    c(".pizzaInfo--size.selected").classList.remove("selected");

    cs(".pizzaInfo--size").forEach((size, i) => {
      if (i == 2) {
        size.classList.add("selected");
      }

      size.querySelector("span").innerHTML = pizzaJson[key].sizes[i];
    });

    //abrir modal
    c(".pizzaInfo--qt").innerHTML = modalQt;

    c(".pizzaWindowArea").style.opacity = 0;
    c(".pizzaWindowArea").style.display = "flex";
    setTimeout(() => {
      c(".pizzaWindowArea").style.opacity = "1";
    });
  });
  c(".pizza-area").append(pizzaItem); // junta essa .pizza-area a outra área
});

// eventos do modal
function closeModal() {
  c(".pizzaWindowArea").style.opacity = 0;
  setTimeout(() => {
    c(".pizzaWindowArea").style.display = "none";
  }, 500);
}

cs(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach(
  (item) => {
    item.addEventListener("click", closeModal);
  }
);

c(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (modalQt > 1) {
    //só diminui se for maior que 1
    modalQt--;
    c(".pizzaInfo--qt").innerHTML = modalQt;
  }
});
c(".pizzaInfo--qtmais").addEventListener("click", () => {
  modalQt++;
  c(".pizzaInfo--qt").innerHTML = modalQt;
});

cs(".pizzaInfo--size").forEach((size, i) => {
  size.addEventListener("click", (e) => {
    c(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  });
});

c(".pizzaInfo--addButton").addEventListener("click", () => {
  let size = parseInt(c(".pizzaInfo--size.selected").getAttribute("data-key"));
  let identifier = pizzaJson[modalKey].id + "@" + size;
  let key = cart.findIndex((item) => item.identifier == identifier);

  if (key > -1) {
    cart[key].qt += modalQt;
  } else {
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size: size,
      qt: modalQt,
    });
  }
  updateCart();
  closeModal();
});

function updateCart() {
  if (cart.length > 0) {
    c("aside").classList.add("show");
    for (let i in cart) {
      let pizzaItem = pizzaJson.find((item) => (item.id == cart[i].id));
    }
  } else {
    c("aside").classList.remove("show");
  }
}
