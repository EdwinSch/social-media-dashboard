/* ---- TARGETS && INITIALIZERS ---- */
/* ---- SCRIPT ---- */
/* ---- FUNCTIONS ---- */

const mainCardContainer = getElement(".main-cards-container");
const url = "./api/data.json";

// fetch
const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    mapMainCards(data);
  } catch (error) {
    console.log(error);
  }
};

fetchData();

function mapMainCards(data) {
  const displayMainCards = data
    .map((card) => {
      // destructure
      const { id, logo, borderColor, handle, followers, followersGrowth } =
        card;
      // check growth value & assign icon + color
      let statColor = "positive";
      let statIcon = "./img/icon-up.svg";
      if (followersGrowth < 0) {
        statColor = "negative";
        statIcon = "./img/icon-down.svg";
      }
      // convert Negative numbers for DOM display
      const statConversion = Math.abs(followersGrowth);
      // return
      return `<article class="main-card" style="border-top: solid 3px ${borderColor}" data-id=${id}>
      <div class="main-card-header">
        <img src="${logo}" alt="${id} icon" />
        <p class="handle">${handle}</p>
      </div>
      <div class="wrapper">
        <h2>${followers}</h2>
        <p class="followers-title">followers</p>
      </div>
      <div class="flex-wrapper stats">
        <img src="${statIcon}" alt="up icon" />
        <p class="stat ${statColor}">${statConversion} today</p>
      </div>
    </article>`;
    })
    .join("");
  mainCardContainer.innerHTML = displayMainCards;
}

//-- Get DOM element function
function getElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    return element;
  }
  throw new Error(`${element} is not found`);
}
