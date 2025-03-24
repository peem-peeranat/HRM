import dayjs from "dayjs";

export const formatDate = (dateStr) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const weekday = date.toLocaleString("en-US", { weekday: "long" });
  return `${day} ${month} ${year} - ${weekday}`;
};

export const getDaysUntil = (dateStr) => {
  const today = new Date();
  const holidayDate = new Date(dateStr);
  const diffTime = Math.abs(holidayDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const filterHolidays = (holidays, searchTerm, filterDate) => {
  return holidays.filter((holiday) => {
    const searchMatch = holiday.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const dateMatch = filterDate
      ? dayjs(holiday.date).isSame(filterDate, "day")
      : true;
    return searchMatch && dateMatch;
  });
};