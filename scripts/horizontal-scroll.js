function updateArrowButtons() {
  const leftArrowImg = leftArrow.querySelector("img");
  const rightArrowImg = rightArrow.querySelector("img");

  if (container.scrollLeft === 0) {
    leftArrow.disabled = true;
    leftArrowImg.style.opacity = 0.5;
    leftArrowImg.style.pointerEvents = "none";
  } else {
    leftArrow.disabled = false;
    leftArrowImg.style.opacity = 1;
    leftArrowImg.style.pointerEvents = "auto";
  }

  if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
    rightArrow.disabled = true;
    rightArrowImg.style.opacity = 0.5;
    rightArrowImg.style.pointerEvents = "none";
  } else {
    rightArrow.disabled = false;
    rightArrowImg.style.opacity = 1;
    rightArrowImg.style.pointerEvents = "auto";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const events = [
    {
      date: "20 August 2024",
      title: "Bonfire Winter Night",
      description:
        "Enjoy live music, food, and fun at our Bonfire Winter Night.",
      category: "FUNCTIONS",
      imgSrc: "img/function-event-1.png",
    },
    {
      date: "20 August 2024",
      title: "Wine Tasting",
      description: "Join us for a delightful Wine Tasting event at 7 PM.",
      category: "FUNCTIONS",
      imgSrc: "img/function-event-2.png",
    },
    {
      date: "29 August 2024",
      title: "Tennis Workshop",
      description: "Join our free Tennis Workshop and enhance your skills.",
      category: "TENNIS",
      imgSrc: "img/tennis-event-2.png",
    },
    {
      date: "02 September 2024",
      title: "Tennis Tournament",
      description: "Buy tickets online for our exciting Tennis Tournament.",
      category: "TENNIS",
      imgSrc: "img/tennis-event-1.png",
    },
    {
      date: "12 September 2024",
      title: "Lawn Bowling Tournament",
      description: "Let's cheer for our team at the Lawn Bowling Tournament!",
      category: "LAWN BOWL",
      imgSrc: "img/bowl-event-1.png",
    },
    {
      date: "15 September 2024",
      title: "Wine Tasting",
      description: "Explore refined wines in an engrossing journey. Join now!",
      category: "FUNCTIONS",
      imgSrc: "img/function-event-3.png",
    },
    {
      date: "18 September 2024",
      title: "Tennis Match",
      description: "Get ready for the most thrilling tennis event of the year!",
      category: "TENNIS",
      imgSrc: "img/tennis-event-3.png",
    },
    {
      date: "25 August 2024",
      title: "Bowling Night",
      description: "Join us for an exciting Bowling Night at 8:00 PM!",
      category: "LAWN BOWL",
      imgSrc: "img/bowl-event-2.png",
    },
  ];

  const container = document.querySelector(".events-container");

  events.forEach((event) => {
    const eventTile = document.createElement("div");
    eventTile.classList.add("event-tile");

    eventTile.innerHTML = `
      <div class="category-tag">${event.category}</div> 
      <img src="${event.imgSrc}" alt="${event.title}" />
      <div class="event-info">
        <h4 class="event-date">${event.date}</h4>
        <h3 class="event-title">${event.title}</h3>
        <p>${event.description}</p>
      </div>
    `;

    container.appendChild(eventTile);
  });

  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  leftArrow.addEventListener("click", function () {
    container.scrollBy({
      left: -300,
      behavior: "smooth",
    });
    updateArrowButtons();
  });

  rightArrow.addEventListener("click", function () {
    container.scrollBy({
      left: 300,
      behavior: "smooth",
    });
    updateArrowButtons();
  });

  container.addEventListener("scroll", updateArrowButtons);

  updateArrowButtons();
});
