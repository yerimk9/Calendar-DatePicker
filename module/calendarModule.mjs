import { makeDOMWithProperties, appendChildrenList } from "./dom.mjs";

export function renderCalendar(calendarContainer, year, month, day) {
  const calendarNav = makeDOMWithProperties("div", {
    className: "calendar-nav",
  });

  // 이전 달로 넘어가는 버튼
  const prevMonthBtn = makeDOMWithProperties("i", {
    className: "bi bi-caret-left-fill",
  });

  // 현재 월과 년도 표시
  const monthAndYear = makeDOMWithProperties("div", {
    className: "month-year",
  });
  const monthDisplay = makeDOMWithProperties("div", { className: "month" });
  const yearDisplay = makeDOMWithProperties("div", { className: "year" });

  // 다음 달로 넘어가는 버튼
  const nextMonthBtn = makeDOMWithProperties("i", {
    className: "bi bi-caret-right-fill",
  });

  appendChildrenList(monthAndYear, [monthDisplay, yearDisplay]);
  appendChildrenList(calendarNav, [prevMonthBtn, monthAndYear, nextMonthBtn]);

  // 요일 표시
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dayHeader = makeDOMWithProperties("div", { className: "day" });
  daysOfWeek.forEach((day) => {
    const dayElement = makeDOMWithProperties("div", { textContent: `${day}` });

    dayHeader.appendChild(dayElement);
  });

  // 달력 그리드
  const calendarGrid = makeDOMWithProperties("div", {
    className: "calendar-grid",
  });

  // 달력 그리기 함수
  function renderCalendar(month, year) {
    calendarGrid.innerHTML = "";

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 월의 전체 일수
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 해당 월의 첫 번째 날의 요일

    const totalDays = firstDayOfMonth + daysInMonth;

    const dateContainer = makeDOMWithProperties("div", { className: "dates" });
    appendChildrenList(calendarGrid, [dayHeader, dateContainer]);

    // 이전 달의 마지막 날짜와 다음 달의 첫 번째 날짜
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    const nextMonthFirstDate = 1;

    // 이전 달 날짜 채우기
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const dayElement = makeDOMWithProperties("div", {
        textContent: `${prevMonthLastDate - i}`,
        className: "prev-month-date date",
      });

      dateContainer.appendChild(dayElement);
    }

    // 현재 달 날짜 채우기
    const today = new Date();

    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = makeDOMWithProperties("div", {
        textContent: `${day}`,
        className : 'date'
      });

      if ((firstDayOfMonth + day - 1) % 7 === 0) {
        dayElement.classList.add("red");
      }

      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayElement.classList.add("today");
      }

      dateContainer.appendChild(dayElement);
    }

    // 해당 월의 주 수 계산
    const weeksInMonth = Math.ceil((firstDayOfMonth + daysInMonth) / 7);

    // 다음 달 날짜 채우기
    let remainingDays = weeksInMonth === 6 ? 42 - totalDays : 35 - totalDays;
    for (let i = 0; i < remainingDays; i++) {
      const dayElement = makeDOMWithProperties("div", {
        textContent: `${nextMonthFirstDate + i}`,
        className: "next-month-date date",
      });
      dateContainer.appendChild(dayElement);
    }

    monthDisplay.textContent = getMonthName(month);
    yearDisplay.textContent = year;

    addClickEventListeners();
  }
  function addClickEventListeners() {
    const dateDivs = calendarContainer.querySelectorAll(".dates div");

    // 이전에 추가된 클릭 이벤트 리스너 제거
    dateDivs.forEach((div) => {
      div.removeEventListener("click", dateClickHandler);
    });

    // 클릭 이벤트 리스너 다시 추가
    dateDivs.forEach((div) => {
      div.addEventListener("click", dateClickHandler);
    });
  }

  function dateClickHandler() {
    // 클릭된 날짜에 'clicked' 클래스를 추가하고 다른 날짜의 'clicked' 클래스를 제거합니다.
    const dateDivs = calendarContainer.querySelectorAll(".dates div");
    dateDivs.forEach((otherDiv) => {
      otherDiv.classList.remove("clicked");
    });

    this.classList.add("clicked");

    const year = calendarContainer.querySelector(".year").textContent;
    const month = calendarContainer.querySelector(".month").textContent;
    const day = this.textContent;
    const date = `${year}-${month}-${day}`;
    console.log(date);
  }

  // 초기 달력 세팅
  var currentDate = new Date();
  
  if(year, month, day) {
    currentDate = new Date(year, month, day);
  }
  renderCalendar(currentDate.getMonth(), currentDate.getFullYear());

  // 버튼 클릭 이벤트
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
  });

  appendChildrenList(calendarContainer, [calendarNav, calendarGrid]);

  function getMonthName(month) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  }

  addClickEventListeners();
}
