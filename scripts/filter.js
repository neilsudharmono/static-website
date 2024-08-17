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

  const eventsPerPage = 6;
  let currentPage = 1;
  let currentCategory = "ALL";
  let filteredEvents = events;

  function getTotalPages() {
    return Math.ceil(filteredEvents.length / eventsPerPage);
  }

  function filterEventsByTime(timeFilters) {
    const now = new Date();
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      if (timeFilters.includes("thisWeek")) {
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(now.setDate(weekStart.getDate() + 6));
        if (eventDate >= weekStart && eventDate <= weekEnd) return true;
      }
      if (timeFilters.includes("thisMonth")) {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        if (eventDate >= monthStart && eventDate <= monthEnd) return true;
      }
      if (timeFilters.includes("nextMonth")) {
        const nextMonthStart = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          1
        );
        const nextMonthEnd = new Date(now.getFullYear(), now.getMonth() + 2, 0);
        if (eventDate >= nextMonthStart && eventDate <= nextMonthEnd)
          return true;
      }
      if (timeFilters.includes("thisYear")) {
        const yearStart = new Date(now.getFullYear(), 0, 1);
        const yearEnd = new Date(now.getFullYear(), 11, 31);
        if (eventDate >= yearStart && eventDate <= yearEnd) return true;
      }
      return false;
    });
  }

  function filterEvents() {
    let timeFilters = [];
    document
      .querySelectorAll('.time-filter input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        timeFilters.push(checkbox.getAttribute("data-time"));
      });

    if (timeFilters.length > 0) {
      filteredEvents = filterEventsByTime(timeFilters);
    } else {
      filteredEvents = events;
    }

    if (currentCategory !== "ALL") {
      filteredEvents = filteredEvents.filter(
        (event) => event.category === currentCategory
      );
    }

    currentPage = 1;
    renderEvents();
    renderPagination();
  }

  function filterEventsByCategory(category) {
    currentCategory = category;
    filterEvents();
  }

  function renderEvents() {
    const container = document.getElementById("filtered-event-tiles-container");
    container.innerHTML = "";

    const start = (currentPage - 1) * eventsPerPage;
    const end = start + eventsPerPage;
    const eventsToShow = filteredEvents.slice(start, end);

    eventsToShow.forEach((event) => {
      const eventTile = document.createElement("div");
      eventTile.classList.add("filtered-event-tile");
      eventTile.innerHTML = `
                <div class="category-tag">${event.category}</div>
                <img src="${event.imgSrc}" alt="${event.title}" />
                <div class="filtered-event-info">
                    <h4 class="event-date">${event.date}</h4>
                    <h3 class="event-title">${event.title}</h3>
                    <p>${event.description}</p>
                    <a href="#" class="event-cta">Learn More</a>
                </div>
            `;
      container.appendChild(eventTile);
    });
  }

  function renderPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    const totalPages = getTotalPages();

    const prevButton = createArrowButton(
      "prevPage",
      "img/left-arrow.png",
      currentPage === 1,
      function () {
        if (currentPage > 1) {
          currentPage--;
          renderEvents();
          renderPagination();
        }
      }
    );
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("a");
      pageButton.href = "#";
      pageButton.classList.add("page");
      if (i === currentPage) pageButton.classList.add("active");
      pageButton.textContent = i;
      pageButton.addEventListener("click", function (e) {
        e.preventDefault();
        currentPage = i;
        renderEvents();
        renderPagination();
      });
      paginationContainer.appendChild(pageButton);
    }

    const nextButton = createArrowButton(
      "nextPage",
      "img/right-arrow.png",
      currentPage === totalPages,
      function () {
        if (currentPage < totalPages) {
          currentPage++;
          renderEvents();
          renderPagination();
        }
      }
    );
    paginationContainer.appendChild(nextButton);
  }

  function setupTimeFilter() {
    const timeCheckboxes = document.querySelectorAll(
      '.time-filter input[type="checkbox"]'
    );
    timeCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", filterEvents);
    });
  }

  function setupCategoryFilter() {
    const categoryButtons = document.querySelectorAll(".filter-button");
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
        const selectedCategory = this.getAttribute("data-category");
        filterEventsByCategory(selectedCategory);
      });
    });
  }

  setupCategoryFilter();
  setupTimeFilter();
  filterEvents();
});

function createArrowButton(id, imgSrc, isDisabled, onClick) {
  const button = document.createElement("button");
  button.id = id;
  button.classList.add("arrow");
  if (isDisabled) {
    button.disabled = true;
    button.style.opacity = 0.5;
  }

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = id;

  button.appendChild(img);

  button.addEventListener("click", onClick);

  return button;
}
