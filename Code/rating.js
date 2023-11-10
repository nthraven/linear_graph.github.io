const starsContainer = document.getElementsByClassName("stars")[0];
const stars = starsContainer.querySelectorAll(".star");
const rating = starsContainer.querySelector(".rating");

let width = starsContainer.getBoundingClientRect().width;
let height = starsContainer.getBoundingClientRect().height;
let x = starsContainer.getBoundingClientRect().left;
let y = starsContainer.getBoundingClientRect().top;
let right = starsContainer.getBoundingClientRect().right;
let bottom = starsContainer.getBoundingClientRect().bottom;

let starsRect = [];
stars.forEach((star) => {
  starsRect.push(star.getBoundingClientRect());
});

let sumOfRatings = 0;
let normalValOfRatings = 0;
let decimalValOfRatings = 0;

function initials(e) {
  if (e.target !== starsContainer) return;

  let container = e.target;

  width = container.getBoundingClientRect().width;
  height = container.getBoundingClientRect().height;
  x = container.getBoundingClientRect().left;
  y = container.getBoundingClientRect().top;
  right = container.getBoundingClientRect().right;
  bottom = container.getBoundingClientRect().bottom;

  for (let i = 0; i < stars.length; i++) {
    starsRect[i] = stars[i].getBoundingClientRect();
  }
}

starsContainer.addEventListener("mouseover", (e) => {
  initials(e);
  moveMouseOnStarsCreatEvent(); // remove the commentting on this line of code to have the ability to re-add the event listener after removing it
}); //for when the height or width of the viewport or the element changes

function moveMouseOnStarsCreatEvent() {
  starsContainer.addEventListener("mousemove", moveMouseOnStarsFunction);
}
moveMouseOnStarsCreatEvent();

function moveMouseOnStarsFunction(e) {
  let mousePos = e.clientX - x;
  starsContainer.style.setProperty("--rating-pos", `${mousePos}`);

  let starIndex = whichStar(e.clientX);

  if (starIndex < 0) {
    stars.forEach((star) => {
      star.style.setProperty("--star-rate", "0");
    });

    sumOfRatings = 0;
    normalValOfRatings = 0;
    decimalValOfRatings = 0;
  } else if (starIndex < stars.length) {
    sumOfRatings = 0;
    normalValOfRatings = 0;
    decimalValOfRatings = 0;

    for (let i = 0; i < starIndex; i++) {
      stars[i].style.setProperty("--star-rate", "100");
      sumOfRatings++;
      normalValOfRatings++;
    }

    let starPercentage =
      ((e.clientX - starsRect[starIndex].left) * 100) /
      starsRect[starIndex].width;
    if (starPercentage < 100) {
      starPercentage = starPercentage > 0 ? starPercentage : 0;
      sumOfRatings += starPercentage / 100;
      decimalValOfRatings = starPercentage / 100;
    } else {
      starPercentage = 100;
      sumOfRatings++;
      normalValOfRatings++;
    }

    stars[starIndex].style.setProperty("--star-rate", `${starPercentage}`);

    for (let i = stars.length - 1; i > starIndex; i--) {
      stars[i].style.setProperty("--star-rate", "0");
    }
  } else {
    stars.forEach((star) => {
      star.style.setProperty("--star-rate", "100");
    });

    sumOfRatings = 5;
    normalValOfRatings = 5;
    decimalValOfRatings = 0;
  }

  sumOfRatings = sumOfRatings.toFixed(1);
  rating.setAttribute("data-rating", `${sumOfRatings}`);
}

function whichStar(mousePos) {
  let starIndex = -1;

  for (let i = 0; i < starsRect.length; i++) {
    let star = starsRect[i];

    if (mousePos < star.left) return starIndex;
    starIndex++;
    if (mousePos < star.right) return starIndex;
  }
}

starsContainer.addEventListener("click", (e) => {
  starsContainer.removeEventListener("mousemove", moveMouseOnStarsFunction);
});
