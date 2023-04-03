/* ---- MODULES ---- */

import getElement from "./modules/getElement.js";

/* ---- SCRIPT ---- */

const grandTotal = getElement(".grand-total"); // to do
const mainCardContainer = getElement(".main-cards-container");
const subCardsContainer = getElement(".sub-cards-container");
const toggleSwitch = getElement(".toggle-switch");

const url = "./api/data.json";

// Fetch API
const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    mapMainCards(data);
    mapSubCards(data);
  } catch (error) {
    console.log(error);
  }
};

// On Load
fetchData();

/* ---- FUNCTIONS ---- */

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
      // display INT
      let displayValue = followers;
      if (followers > 10000) {
        displayValue = followers / 1000 + "K";
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
        <h2>${displayValue}</h2>
        <p class="followers-title">followers</p>
      </div>
      <div class="flex-wrapper stats">
        <img src="${statIcon}" alt="chevron" />
        <p class="stat ${statColor}">${statConversion} today</p>
      </div>
    </article>`;
    })
    .join("");
  mainCardContainer.innerHTML = displayMainCards;
}

function mapSubCards(data) {
  // display Page INFO cards
  const displayPageCards = data
    .map((pagecard) => {
      // destructure
      const { id, logo, views, pageGrowth, pageHeading } = pagecard;
      // check growth value & assign icon + color
      let statColor = "positive";
      let statIcon = "./img/icon-up.svg";
      if (pageGrowth < 0) {
        statColor = "negative";
        statIcon = "./img/icon-down.svg";
      }
      // display INT
      let displayValue = views;
      if (views > 10000) {
        displayValue = views / 1000 + "K";
      }
      // convert Negative numbers for DOM display
      const statConversion = Math.abs(pageGrowth);
      // return
      return `<article class="sub-card data-id="${id}">
          <div class="flex-between-wrapper">
            <h4>${pageHeading}</h4>
            <img src="${logo}" alt="${id} icon" />
          </div>
          <div class="flex-between-wrapper align-end">
            <h5>${displayValue}</h5>
            <div class="flex-wrapper stats">
              <img src="${statIcon}" alt="chevron" />
              <p class="stat ${statColor}">${statConversion}%</p>
            </div>
          </div>
        </article>`;
    })
    .join("");
  // display Likes INFO cards
  const displayLikeCards = data
    .map((likecard) => {
      // destructure
      const { id, logo, likes, likesGrowth } = likecard;
      // check growth value & assign icon + color
      let statColor = "positive";
      let statIcon = "./img/icon-up.svg";
      if (likesGrowth < 0) {
        statColor = "negative";
        statIcon = "./img/icon-down.svg";
      }
      // convert Negative numbers for DOM display
      const statConversion = Math.abs(likesGrowth);
      // return
      return `<article class="sub-card data-id="${id}">
          <div class="flex-between-wrapper">
            <h4>Likes</h4>
            <img src="${logo}" alt="${id} icon" />
          </div>
          <div class="flex-between-wrapper align-end">
            <h5>${likes}</h5>
            <div class="flex-wrapper stats">
              <img src="${statIcon}" alt="chevron" />
              <p class="stat ${statColor}">${statConversion}%</p>
            </div>
          </div>
        </article>`;
    })
    .join("");

  // merge 2 maps to 1 output array
  const mergeSubMaps = [...[displayPageCards], ...[displayLikeCards]].join("");
  //display output
  subCardsContainer.innerHTML = mergeSubMaps;
}

toggleSwitch.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark-theme");
});
