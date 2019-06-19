/* eslint-disable import/prefer-default-export */
export function $$(className) {
  return document.body.querySelectorAll(className);
}
export function hasSelected(wrapper, date) {
  return document.body
    .querySelector(`[title="${date.format('LL')}"][role="gridcell"]`)
    .getAttribute('class')
    .split(' ')
    .includes('gov-calendar-selected-day');
}

export function openPanel(wrapper) {
  wrapper.find('.gov-calendar-picker-input').trigger('click');
}

export function clearInput(wrapper) {
  wrapper.find('.gov-calendar-picker-clear').trigger('click');
}

export function nextYear() {
  $$('.gov-calendar-next-year-btn')[0].click();
}

export function nextMonth() {
  $$('.gov-calendar-next-month-btn')[0].click();
}

export function selectDateFromBody(date, index) {
  let calendar = document.body;
  if (index !== undefined) {
    calendar = document.body.querySelectorAll('.gov-calendar-range-part')[index];
  }
  calendar.querySelector(`[title="${date.format('LL')}"][role="gridcell"]`).click();
}
