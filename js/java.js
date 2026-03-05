const input = document.querySelector("input");
const icon = document.querySelector(".icon");
const selectTop = document.querySelector(".selecttop");
const selectBtm = document.querySelector(".selectbtm");
const imgTop = document.querySelector(".img_top");
const imgBtm = document.querySelector(".img_btm");
const btnConvert = document.querySelector(".convert");
const h1 = document.querySelector("h1");

let options = "";
for (let i in COUNTRY_NAMES) {
  options += `<option value="${i}">${i} || ${COUNTRY_NAMES[i]}</option>`;
}
selectTop.innerHTML = options;
selectBtm.innerHTML = options;

function Switch() {
  let amount = input.value;
  if (amount == "") {
    amount = 1;}
  fetch(`https://v6.exchangerate-api.com/v6/9797b48fa097d9062473913a/latest/${selectTop.value}`)
    .then((res) => res.json())
    .then((data) => {
      let result = data.conversion_rates[selectBtm.value] * amount;
      h1.innerHTML = `${amount} ${selectTop.value} = ${result.toFixed(3)} ${selectBtm.value}`;
     });
}
icon.addEventListener("click", () => {
  let swap = selectTop.value;
  selectTop.value = selectBtm.value;
  selectBtm.value = swap;
  Switch();
  Flags();
});

btnConvert.addEventListener("click", () => {
  Switch();
});

function Flags() {
  let countryTop =country_Flags[selectTop.value];
  let countryBtm =country_Flags[selectBtm.value];
  imgTop.src = `https://flagsapi.com/${countryTop}/shiny/32.png`;
  imgBtm.src = `https://flagsapi.com/${countryBtm}/shiny/32.png`;
}
selectTop.addEventListener("change", Flags);
selectBtm.addEventListener("change", Flags);
