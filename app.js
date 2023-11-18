import { renderCalendar } from "./module/calendarModule.mjs";
import { renderDatePicker } from "./module/datePicker.mjs";

const calendarContainers = document.querySelectorAll(".calendar");
const datePickers = document.querySelectorAll(".datepicker");
const inputs = document.querySelectorAll("input");

calendarContainers.forEach((calendarContainer) => {
  document.addEventListener("DOMContentLoaded", () => {
    renderCalendar(calendarContainer);
  });
});

inputs.forEach((input, index) => {
  input.addEventListener("click", (event) => {
    const datePicker = datePickers[index];
    event.stopPropagation(); // 이벤트 전파(stopPropagation) 방지
    datePicker.innerHTML = "";
    renderDatePicker(datePicker);
  });
});
