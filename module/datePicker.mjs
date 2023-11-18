import { renderCalendar } from "./calendarModule.mjs";
import { makeDOMWithProperties } from "./dom.mjs";

export function renderDatePicker() {
  const datePickers = document.querySelectorAll(".datepicker");

  datePickers.forEach((datePicker) => {
    const input = datePicker.previousElementSibling;
    const initialValue = input.value; // 인풋의 초기값 저장

    datePicker.innerHTML = ""; // 기존에 렌더링된 달력을 초기화

    const calendarContainer = makeDOMWithProperties("div", {
      className: "datepicker-calendar", 
    });
    datePicker.appendChild(calendarContainer);

    if (initialValue) {
      const dateArray = initialValue.split(" - ");
      const year = dateArray[0];
      const month = dateArray[1] - 1;
      const day = dateArray[2];

      renderCalendar(calendarContainer, year, month, day);

      const dates = calendarContainer.querySelectorAll(".date");
      dates.forEach((date) => {
        if (date.textContent == day) {
          date.classList.add("clicked");
        }
      });
    } else {
      renderCalendar(calendarContainer);
    }

    datePicker.style.display = "block";

    document.addEventListener("click", (e) => {
      // 클릭한 요소가 datePicker 또는 그 자식인지 확인
      if (!datePicker.contains(e.target)) {
        datePicker.style.display = "none";
      }
    });

    // 이벤트를 부모 요소에 위임
    calendarContainer.addEventListener("click", (e) => {
      const targetDate = e.target.closest(".date");

      // 클릭한 요소가 날짜인지 확인
      if (targetDate) {
        const year = calendarContainer.querySelector(".year").textContent;
        const month = getMonthNumber(
          calendarContainer.querySelector(".month").textContent
        );
        const day = targetDate.textContent;

        setInputValue(input, year, month, day);
      }
    });
  });
}

function getMonthNumber(monthName) {
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
  return months.findIndex((month) => month === monthName) + 1;
}

function setInputValue(input, year, month, day) {
  input.value = `${year} - ${month} - ${day}`;
}
