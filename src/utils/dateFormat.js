export function getTodayYMD() {
  let currentDate = new Date();
  let currentYear = String(currentDate.getFullYear());
  let currentMonth = String(currentDate.getMonth() + 1);
  let currentDay = String(currentDate.getDate());
  if (currentMonth.length === 1) {
    currentMonth = "0".concat(currentMonth);
  }

  if (currentDay.length === 1) {
    currentDay = "0".concat(currentDay);
  }
  let todayDate = currentYear.concat("-", currentMonth, "-", currentDay); // YYYY-MM-DD
  return todayDate;
}

// convert a string or a date into a string ,format YYYY MM DD
export function dateYMD(iniDate) {
  let currentDate;
  if (typeof iniDate === "string") currentDate = new Date(iniDate);
  if (typeof iniDate === "object") currentDate = iniDate;
  let currentYear = String(currentDate.getFullYear());
  let currentMonth = " ".concat(String(currentDate.getMonth() + 1));
  let currentDay = " ".concat(String(currentDate.getDate()));
  if (currentMonth.length === 1) {
    currentMonth = "0".concat(currentMonth);
  }

  if (currentDay.length === 1) {
    currentDay = "0".concat(currentDay);
  }
  let todayDate = currentYear.concat(currentMonth, currentDay);
  return todayDate;
}


// convert a string or a date into a string ,format YYYYMMDD
export function dateYMDnoBlank(iniDate) {
  let currentDate;
  if (typeof iniDate === "string") currentDate = new Date(iniDate);
  if (typeof iniDate === "object") currentDate = iniDate;
  let currentYear = String(currentDate.getFullYear());
  let currentMonth = "".concat(String(currentDate.getMonth() + 1));
  let currentDay = "".concat(String(currentDate.getDate()));
  if (currentMonth.length === 1) {
    currentMonth = "0".concat(currentMonth);
  }

  if (currentDay.length === 1) {
    currentDay = "0".concat(currentDay);
  }
  let todayDate = currentYear.concat(currentMonth, currentDay);
  return todayDate;
}
