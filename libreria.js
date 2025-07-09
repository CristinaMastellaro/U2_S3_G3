const row = document.getElementById("bookShelf");
let jsonRetrieved;

const retrieveBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Non siamo riusciti a recuperare i libri");
      }
    })
    .then((books) => {
      jsonRetrieved = books;
      books.forEach((book) => {
        row.innerHTML += `<div class="card d-flex flex-column justify-content-between col-12 col-sm-5 col-md-3 bg-warning">
            <img src="${book.img}" class="card-img-top mt-3" alt="Book cover" />
            <div class="card-body d-flex flex-column justify-content-between">
                <div class="card-text">
                    <h5 class="card-title">${book.title}</h5>
                    <p>
                        Category: ${book.category} <br />
                        Price: ${book.price}€
                    </p>
                </div>
                <div class="d-flex flex-row justify-content-around flex-wrap">
                    <button class="btn btn-primary mb-1" onclick="deleteCard(event)">Scarta</button>
                    <button class="btn btn-primary buy" onclick="buyCard(event)">Compra ora</button>
                </div>
            </div>
          </div>`;
      });
    })
    .catch((error) => {
      console.log("ERROR!", error);
    });
};

retrieveBooks();

const deleteCard = (e) => {
  e.target.parentElement.parentElement.parentElement.classList.add("d-none");
};

let totalPriceBooks = 0;

const buyCard = (e) => {
  const aside = document.getElementsByTagName("aside")[0];
  const image =
    e.target.parentElement.parentElement.parentElement.firstElementChild.getAttribute(
      "src"
    );
  const title =
    e.target.parentElement.previousElementSibling.firstElementChild.innerText;
  const price =
    e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.innerText.split(
      " "
    )[
      e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.innerText.split(
        " "
      ).length - 1
    ];

  const totalPrice = document.getElementById("total");
  totalPriceBooks += Number(price.split("€")[0]);
  totalPrice.innerText = totalPriceBooks;

  aside.classList.remove("d-none");

  aside.innerHTML += `<div
            class="m-4 px-4 pb-2 d-flex justify-content-between flex-column border align-items-center bg-light">
            <img src="${image}" alt="Book cover" class="my-3" style="width:100px" />
            <div>
              <p class=fw-bold>${title}</p>
              <p>${price}</p>
            </div>
            <button class="btn btn-secondary" onclick="deleteFromCart(event)">Togli</button>
          </div>`;
};

const deleteFromCart = (e) => {
  e.target.parentElement.classList.add("d-none");
  const price =
    e.target.previousElementSibling.firstElementChild.nextElementSibling.innerText.split(
      "€"
    )[0];

  const totalPrice = document.getElementById("total");
  totalPriceBooks -= Number(price);
  totalPrice.innerText = totalPriceBooks;

  const aside = document.getElementsByTagName("aside")[0];
  console.log(
    'aside.innerHTML.includes("px-4 pb-2 d-flex justify-content-between")',
    aside.innerHTML.includes(
      `class="m-4 px-4 pb-2 d-flex justify-content-between flex-column border align-items-center"
          >`
    )
  );
  if (
    !aside.innerHTML.includes(
      `class="m-4 px-4 pb-2 d-flex justify-content-between flex-column border align-items-center bg-light">`
    )
  ) {
    aside.classList.add("d-none");
  }
};
