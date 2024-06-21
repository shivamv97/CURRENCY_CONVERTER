const BASE_URL = "https://api.currencyapi.com/v3/latest";
const API_KEY = "cur_live_aRJ5y4XJ612f5xSBVffoLDjxcJxHRIld2r4MjArC";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currCode;
    newoption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}?base_currency=${fromcurr.value}&currencies=${tocurr.value}&apikey=${API_KEY}`;
  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.data[tocurr.value].value;

    let finalamt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalamt.toFixed(2)} ${
      tocurr.value
    }`;
  } catch (error) {
    console.error("Fetch error: ", error);
    msg.innerText = "Failed to fetch exchange rate. Please try again later.";
  }
};

window.addEventListener("load", () => {
  updateExchangeRate();
});
