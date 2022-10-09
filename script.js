"use strict";

//  ALLLLL
async function Allcountry(num = 1) {
  $(".pagination").innerHTML = "";
  const response = await fetch("https://restcountries.com/v2/all");
  const result = await response.json();
  renderData(result);

  const currentPage = num;
  const items = 9;

  const end = currentPage * items;
  const start = end - items;

  const lastData = result.slice(start, end);

  renderData(result, lastData, items);
}

Allcountry();

function renderData(all, data = [], current) {
  let dot = [];

  for (let i = 1; i <= Math.ceil(all.length / current); i++) {
    dot.push(i);
  }

  dot.forEach((i) => {
    const li = createElement(
      "li",
      "page-item p-2 bg-light shadow m-2 rounded-2",
      i
    );
    $(".pagination").appendChild(li);
  });

  if (data.length === 0) {
    $(".all").innerHTML = `<span class="loader"></span>`;
  } else {
    $(".all").innerHTML = "";
    data.forEach((item) => {
      const card = createElement(
        "div",
        "box  p-4 my-4 d-flex   border bg-info",
        `<div class="box2">  <img src="${item.flags.png}" alt="flag" class="box-img">
          
         <h2 class="country  m-2">${item.name}</h2> 
         
         <button class="add_country p-2 bg-success text-light fs-6" name="${item.name}">ADD</button>     
         
         <button class="moreInfo p-2 bg-dark m-2 text-light fs-5">More Info</button> </div> 
              
             
          `
      );

      card.dataset.info = item.name;

      $(".all").appendChild(card);

      card.addEventListener("click", (e) => {
        if (e.target.classList.contains("moreInfo")) {
          renderModal(card.getAttribute("data-info").toLowerCase());
        }

        if (e.target.classList.contains("add_country")) {
          addCountry(e.target.name);
        }
      });
    });
  }
}

$(".pagination").addEventListener("click", (e) => {
  if (e.target.classList.contains("page-item")) {
    Allcountry(e.target.textContent);
  }
});

// SEARCH
async function searchCountry(query) {
  $(".all").innerHTML = `<span class="loader"></span>`;

  const data = await fetch(`https://restcountries.com/v2/name/${query}`);
  const res = await data.json();

  $(".all").innerHTML = "";
  if (res.message) {
    $(".all").innerHTML = "<h1>Ma'lumot topilmadi</h1>";
  } else {
    renderData(res);
  }
}

//   ============================ SEARCH

$(".search").addEventListener("keyup", (e) => {
  console.log(e.target.value.length);
  if (e.target.value.length === 0) {
    Allcountry();
  } else {
    searchCountry(e.target.value.trim().toLowerCase());
  }
});

const countryItem = [];

async function addCountry(data3) {
  const data2 = await fetch(`https://restcountries.com/v2/name/${data3}`);
  const res = await data2.json();

  res.forEach((e) => {
    const item = createElement(
      "div",
      "card-item",
      `<p class="e_name">${e.name}</p>  <img src="${e.flags.png}" alt="flag" class="box-img">`
    );
    $(".wrapper2").appendChild(item);
  });
}

async function renderModal(data4) {
  const data_t = await fetch(`https://restcountries.com/v2/name/${data4}`);
  const res_b = await data_t.json();

  const modal = createElement(
    "div",
    "modals",
    `<img src="${res_b[0].flags.png}" alt="rasm" class="rasm">
   <div class="wrapper_second">
    <h2>${res_b[0].name}</h2>
    <h6 class="text">topLevelDomain: -  ${res_b[0].topLevelDomain}</h6>
   <h6 class="text">alpha2Code - ${res_b[0].alpha2Code}</h6>
   <h6 class="text">callingCodes - ${res_b[0].callingCodes}</h6>
   <h6 class="text">alpha3Code - ${res_b[0].alpha3Code}</h6>
   <h6 class="text">capital - ${res_b[0].capital}</h6>
   <h6 class="text">subregion - ${res_b[0].subregion}</h6>
   <h6 class="text">region - ${res_b[0].region}</h6>
   <h6 class="text">population - ${res_b[0].population}</h6>
   <h6 class="text">latlng - ${res_b[0].latlng}</h6>
   <h6 class="text">demonym - ${res_b[0].demonym}</h6>
  <h6 class="text">area - ${res_b[0].area}</h6>
  <h6 class="text">timezones - ${res_b[0].timezones}</h6>
  <h6 class="text">nativeName ${res_b[0].nativeName}</h6>
  <h6 class="text">numericCode - ${res_b[0].numericCode}</h6>
  <h6 class="text">altSpellings - ${res_b[0].altSpellings}</h6>
</div>  `
  );

  $(".modal-content").style.display = "flex";
  $(".wrapper_second").appendChild(modal);
}

$(".hideelement").addEventListener("click", () => {
  $(".wrapper_second").innerHTML = "";
  $(".modal-content").style.display = "none";
});

$(".modal-content").style.display = "none";
