import "./monthsData.js";

let lastDay = [0, 0];
let UpperSpaceInGrid = 0;
const mainDateButton = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const mainGrid = document.querySelector(".date-picker-grid-dates");
let dates = document.querySelectorAll(".date");
let month = new Date().getMonth();
let currentMonth = months[month];
let year = new Date().getFullYear();
const day = new Date().getDate();
addEventListener("load", (e) => {
  dates.forEach((date) => {
    if (date.innerHTML === day.toString()) {
      mainDateButton.innerHTML = `${currentMonth} ${day}${postFixer(
        date
      )}, ${year}`;
      date.classList.add("selected");
    }
  });
});

console.log();
// show dates
document.addEventListener("click", (e) => {
  if (!e.target.matches(".date-picker-button")) return;
  datePicker.classList.toggle("show");
});

//next month
document.addEventListener("click", (e) => {
  if (!e.target.matches(".next-month-button")) return;
  nextMonth();
});

document.addEventListener("click", (e) => {
  if (!e.target.matches(".prev-month-button")) return;
  previousMonth();
});
// highlight selected date
document.addEventListener("click", (e) => {
  if (!e.target.matches(".date")) return;
  dates.forEach((date) => {
    if (date.classList.contains("selected")) {
      date.classList.toggle("selected");
    }
  });
  e.target.classList.toggle("selected");
  datePicker.classList.toggle("show");

  mainDateButton.innerHTML = `${currentMonth} ${e.target.innerHTML}${postFixer(
    e.target
  )}, ${year}`;
});

// first-second-third-th
function postFixer(day) {
  let postFix = "th";

  if (parseInt(day.innerHTML) < 4 || parseInt(day.innerHTML.split("")[1]) < 4) {
    if (
      parseInt(day.innerHTML.split("")[0]) === 1 &&
      isNaN(parseInt(day.innerHTML.split("")[1])) === false
    ) {
      var num = "";
    } else if (isNaN(parseInt(day.innerHTML.split("")[1]))) {
      var num = parseInt(day.innerHTML);
    } else {
      var num = parseInt(day.innerHTML.split("")[1]);
    }
    switch (num) {
      case 1:
        postFix = "st";
        break;
      case 2:
        postFix = "nd";
        break;
      case 3:
        postFix = "rd";
        break;
    }
  }
  return postFix;
}

// eliminates dates outside of the length of month
// returns the length of the selected month
function monthLength(seletecMonth, selectedYear = year) {
  switch (seletecMonth) {
    case "April":
    case "June":
    case "September":
    case "November":
      dates.forEach((date) => {
        if (parseInt(date.innerHTML) > 30) {
          date.style.color = "#888";
          date.style.pointerEvents = "none";
          date.classList.remove("selected");
          date.style.display = "none";
        }
      });
      return 30;
    // February is a special case because in leap years it has 29 days and in normal years it has 28.
    case "February":
      let limit = 0;
      if (
        selectedYear % 400 == 0 ||
        (selectedYear % 4 == 0 && selectedYear % 100 != 0)
      ) {
        limit = 29;
      } else {
        limit = 28;
      }
      dates.forEach((date) => {
        if (parseInt(date.innerHTML) > limit) {
          date.style.color = "#888";
          date.style.pointerEvents = "none";
          date.classList.remove("selected");
          date.style.display = "none";
        }
      });
      return limit;
    default:
      dates.forEach((date) => {
        if (parseInt(date.innerHTML) > 28) {
          date.style.color = "black";
          date.style.pointerEvents = "all";
          date.style.display = "flex";
        }
      });
      return 31;
  }
}

monthLength(currentMonth);

// renders the current month
function currentMonthFunc() {
  currentMonth = months[month];
  document.querySelector(
    ".current-month"
  ).innerHTML = `${currentMonth} - ${year}`;
  monthLength(currentMonth);
  document.querySelectorAll(".date").forEach((date) => date.remove());
  document
    .querySelectorAll(".date-picker-other-month-date")
    .forEach((extraDate) => {
      extraDate.remove();
    });
  let j = lastDay[0];
  for (let i = 1; i < monthLength(currentMonth) + 1; i++) {
    const template = document.querySelector("#mainbtn").content.cloneNode(true);
    const newDate = template.querySelector("button");
    newDate.innerHTML = i;
    if (i === 1) {
      newDate.style.gridArea = daysInTheWeek[new Date().getDay()];
      j = new Date().getDay();
    } else {
      newDate.style.gridArea = daysInTheMonth[j];
    }

    if (j === daysInTheMonth.length + 1) {
      j = 0;
    } else {
      j++;
    }
    if (i === 1) {
      switch (newDate.style.gridArea) {
        case "sun0 / sun0 / sun0 / sun0":
          UpperSpaceInGrid = 0;
          break;
        case "mon0 / mon0 / mon0 / mon0":
          UpperSpaceInGrid = 1;
          break;
        case "tue0 / tue0 / tue0 / tue0":
          UpperSpaceInGrid = 2;
          break;
        case "wed0 / wed0 / wed0 / wed0":
          UpperSpaceInGrid = 3;
          break;
        case "thu0 / thu0 / thu0 / thu0":
          UpperSpaceInGrid = 4;
          break;
        case "fri0 / fri0 / fri0 / fri0":
          UpperSpaceInGrid = 5;
          break;
        case "sat0 / sat0 / sat0 / sat0":
          UpperSpaceInGrid = 6;
          break;
      }
    }
    if (i === monthLength(currentMonth)) {
      let bottomSpaceInGrid = 0;
      document.querySelector(".date-picker").style.height = "280px";

      switch (newDate.style.gridArea) {
        case "sat4 / sat4 / sat4 / sat4":
          bottomSpaceInGrid = -1;
          break;
        case "fri4 / fri4 / fri4 / fri4":
          bottomSpaceInGrid = 1;
          break;
        case "thu4 / thu4 / thu4 / thu4":
          bottomSpaceInGrid = 2;
          break;
        case "wed4 / wed4 / wed4 / wed4":
          bottomSpaceInGrid = 3;
          break;
        case "tue4 / tue4 / tue4 / tue4":
          bottomSpaceInGrid = 4;
        case "mon4 / mon4 / mon4 / mon4":
          bottomSpaceInGrid = 5;
          break;
        case "sun4 / sun4 / sun4 / sun4":
          bottomSpaceInGrid = 6;
          break;
        case "sun5 / sun5 / sun5 / sun5":
          bottomSpaceInGrid = 6;
          document.querySelector(".date-picker").style.height = "320px";
          break;
        case "mon5 / mon5 / mon5 / mon5":
          bottomSpaceInGrid = 6;
          document.querySelector(".date-picker").style.height = "320px";
          break;
      }
      daysInTheMonth.forEach((day) => {
        if (day === daysInTheMonth[j]) {
          let index = daysInTheMonth[j].slice(0, -1) + "0";
          j = daysInTheMonth.indexOf(index);
          lastDay[0] = j;
          monthLength(currentMonth);

          // creating extra date elements based on the empty spaces in the grid
          for (
            let z = monthLength(months[month - 1]) - UpperSpaceInGrid;
            z < monthLength(months[month - 1]);
            z++
          ) {
            const templateExtra = document
              .querySelector("#btn")
              .content.cloneNode(true);
            const btn = templateExtra.querySelector("button");
            btn.classList.add("date-picker-other-month-date");
            btn.innerHTML = z + 1;
            mainGrid.appendChild(btn);
          }

          let area = daysInTheMonth.length - bottomSpaceInGrid;
          for (let r = 0; r < bottomSpaceInGrid; r++) {
            const templateExtra = document
              .querySelector("#btn")
              .content.cloneNode(true);
            const btn = templateExtra.querySelector("button");
            btn.classList.add("date-picker-other-month-date");
            btn.innerHTML = r + 1;
            mainGrid.appendChild(btn);
            mainGrid.style.gridArea = daysInTheMonth[area + r];
          }
          // giving the value of previous or next month to the extra dates
        }
      });
    }
    mainGrid.appendChild(newDate);
  }
  dates = document.querySelectorAll(".date");
}

// renders the next month
function nextMonth() {
  if (month >= 11) {
    month = -1;
    year += 1;
  }
  month += 1;

  currentMonth = months[month];
  document.querySelector(
    ".current-month"
  ).innerHTML = `${currentMonth} - ${year}`;
  monthLength(currentMonth);
  document.querySelectorAll(".date").forEach((date) => date.remove());
  document
    .querySelectorAll(".date-picker-other-month-date")
    .forEach((extraDate) => {
      extraDate.remove();
    });
  let j = 0;
  for (let i = 1; i < monthLength(currentMonth) + 1; i++) {
    const template = document.querySelector("#mainbtn").content.cloneNode(true);
    const newDate = template.querySelector("button");
    newDate.innerHTML = i;
    if (i === 1) {
      newDate.style.gridArea = daysInTheWeek[new Date(year, month, 1).getDay()];
      j = new Date(year, month, 1).getDay();
    } else {
      newDate.style.gridArea = daysInTheMonth[j];
    }

    if (j === daysInTheMonth.length) {
      j = 0;
    } else {
      j++;
    }
    if (i === 1) {
      switch (newDate.style.gridArea) {
        case "sun0 / sun0 / sun0 / sun0":
          UpperSpaceInGrid = 0;
          break;
        case "mon0 / mon0 / mon0 / mon0":
          UpperSpaceInGrid = 1;
          break;
        case "tue0 / tue0 / tue0 / tue0":
          UpperSpaceInGrid = 2;
          break;
        case "wed0 / wed0 / wed0 / wed0":
          UpperSpaceInGrid = 3;
          break;
        case "thu0 / thu0 / thu0 / thu0":
          UpperSpaceInGrid = 4;
          break;
        case "fri0 / fri0 / fri0 / fri0":
          UpperSpaceInGrid = 5;
          break;
        case "sat0 / sat0 / sat0 / sat0":
          UpperSpaceInGrid = 6;
          break;
      }
    }
    if (i === monthLength(currentMonth)) {
      let bottomSpaceInGrid = 0;
      document.querySelector(".date-picker").style.height = "280px";

      switch (newDate.style.gridArea) {
        case "sat4 / sat4 / sat4 / sat4":
          bottomSpaceInGrid = -1;
          break;
        case "fri4 / fri4 / fri4 / fri4":
          bottomSpaceInGrid = 1;
          break;
        case "thu4 / thu4 / thu4 / thu4":
          bottomSpaceInGrid = 2;
          break;
        case "wed4 / wed4 / wed4 / wed4":
          bottomSpaceInGrid = 3;
          break;
        case "tue4 / tue4 / tue4 / tue4":
          bottomSpaceInGrid = 4;
        case "mon4 / mon4 / mon4 / mon4":
          bottomSpaceInGrid = 5;
          break;
        case "sun4 / sun4 / sun4 / sun4":
          bottomSpaceInGrid = 6;
          break;
        case "sun5 / sun5 / sun5 / sun5":
          bottomSpaceInGrid = 6;
          document.querySelector(".date-picker").style.height = "320px";
          break;
        case "mon5 / mon5 / mon5 / mon5":
          bottomSpaceInGrid = 6;
          document.querySelector(".date-picker").style.height = "320px";
          break;
      }
      daysInTheMonth.forEach((day) => {
        if (day === daysInTheMonth[j]) {
          let index = daysInTheMonth[j].slice(0, -1) + "0";
          j = daysInTheMonth.indexOf(index);
          lastDay[0] = j;
          monthLength(currentMonth);

          // creating extra date elements based on the empty spaces in the grid
          for (
            let z = monthLength(months[month - 1]) - UpperSpaceInGrid;
            z < monthLength(months[month - 1]);
            z++
          ) {
            const templateExtra = document
              .querySelector("#btn")
              .content.cloneNode(true);
            const btn = templateExtra.querySelector("button");
            btn.classList.add("date-picker-other-month-date");
            btn.innerHTML = z + 1;
            mainGrid.appendChild(btn);
          }

          let area = daysInTheMonth.length - bottomSpaceInGrid;
          for (let r = 0; r < bottomSpaceInGrid; r++) {
            const templateExtra = document
              .querySelector("#btn")
              .content.cloneNode(true);
            const btn = templateExtra.querySelector("button");
            btn.classList.add("date-picker-other-month-date");
            btn.innerHTML = r + 1;
            mainGrid.appendChild(btn);
            mainGrid.style.gridArea = daysInTheMonth[area + r];
          }
        }
      });
    }
    mainGrid.appendChild(newDate);
  }
  dates = document.querySelectorAll(".date");
}

// renders the previous month
function previousMonth() {
  if (month <= 0) {
    month = 12;
    year -= 1;
  }
  month -= 1;

  currentMonth = months[month];
  document.querySelector(
    ".current-month"
  ).innerHTML = `${currentMonth} - ${year}`;
  monthLength(currentMonth);
  document.querySelectorAll(".date").forEach((date) => date.remove());
  document
    .querySelectorAll(".date-picker-other-month-date")
    .forEach((extraDate) => {
      extraDate.remove();
    });
  let j = 0;
  for (let i = 1; i < monthLength(currentMonth) + 1; i++) {
    const template = document.querySelector("#mainbtn").content.cloneNode(true);
    const newDate = template.querySelector("button");
    newDate.innerHTML = i;
    if (i === 1) {
      newDate.style.gridArea = daysInTheWeek[new Date(year, month, 1).getDay()];
      j = new Date(year, month, 1).getDay();
    } else {
      newDate.style.gridArea = daysInTheMonth[j];
    }

    if (j === daysInTheMonth.length) {
      j = 0;
    } else {
      j++;
    }
    if (i === 1) {
      switch (newDate.style.gridArea) {
        case "sun0 / sun0 / sun0 / sun0":
          UpperSpaceInGrid = 0;
          break;
        case "mon0 / mon0 / mon0 / mon0":
          UpperSpaceInGrid = 1;
          break;
        case "tue0 / tue0 / tue0 / tue0":
          UpperSpaceInGrid = 2;
          break;
        case "wed0 / wed0 / wed0 / wed0":
          UpperSpaceInGrid = 3;
          break;
        case "thu0 / thu0 / thu0 / thu0":
          UpperSpaceInGrid = 4;
          break;
        case "fri0 / fri0 / fri0 / fri0":
          UpperSpaceInGrid = 5;
          break;
        case "sat0 / sat0 / sat0 / sat0":
          UpperSpaceInGrid = 6;
          break;
      }
    }
    if (i === monthLength(currentMonth)) {
      let bottomSpaceInGrid = 0;
      document.querySelector(".date-picker").style.height = "280px";

      switch (newDate.style.gridArea) {
        case "sat4 / sat4 / sat4 / sat4":
          bottomSpaceInGrid = -1;
          break;
        case "fri4 / fri4 / fri4 / fri4":
          bottomSpaceInGrid = 1;
          break;
        case "thu4 / thu4 / thu4 / thu4":
          bottomSpaceInGrid = 2;
          break;
        case "wed4 / wed4 / wed4 / wed4":
          bottomSpaceInGrid = 3;
          break;
        case "tue4 / tue4 / tue4 / tue4":
          bottomSpaceInGrid = 4;
        case "mon4 / mon4 / mon4 / mon4":
          bottomSpaceInGrid = 5;
          break;
        case "sun4 / sun4 / sun4 / sun4":
          bottomSpaceInGrid = 6;
          break;
        case "sun5 / sun5 / sun5 / sun5":
          bottomSpaceInGrid = 6;
          document.querySelector(".date-picker").style.height = "320px";
          break;
        case "mon5 / mon5 / mon5 / mon5":
          bottomSpaceInGrid = 6;
          document.querySelector(".date-picker").style.height = "320px";
          break;
      }
      daysInTheMonth.forEach((day) => {
        if (day === daysInTheMonth[j]) {
          let index = daysInTheMonth[j].slice(0, -1) + "0";
          j = daysInTheMonth.indexOf(index);
          lastDay[0] = j;
          monthLength(currentMonth);

          // creating extra date elements based on the empty spaces in the grid
          for (
            let z = monthLength(months[month - 1]) - UpperSpaceInGrid;
            z < monthLength(months[month - 1]);
            z++
          ) {
            const templateExtra = document
              .querySelector("#btn")
              .content.cloneNode(true);
            const btn = templateExtra.querySelector("button");
            btn.classList.add("date-picker-other-month-date");
            btn.innerHTML = z + 1;
            mainGrid.appendChild(btn);
          }

          let area = daysInTheMonth.length - bottomSpaceInGrid;
          for (let r = 0; r < bottomSpaceInGrid; r++) {
            const templateExtra = document
              .querySelector("#btn")
              .content.cloneNode(true);
            const btn = templateExtra.querySelector("button");
            btn.classList.add("date-picker-other-month-date");
            btn.innerHTML = r + 1;
            mainGrid.appendChild(btn);
            mainGrid.style.gridArea = daysInTheMonth[area + r];
          }
        }
      });
    }
    mainGrid.appendChild(newDate);
  }
  dates = document.querySelectorAll(".date");
}

document.querySelector(
  ".current-month"
).innerHTML = `${currentMonth} - ${year}`;

currentMonthFunc();
