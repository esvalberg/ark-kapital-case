import moment from "moment";

const formatDecimal = (value: number): string => {
  if ((!value && value !== 0) || isNaN(value)) return "";
  return `${value.toFixed(2)}`
    .replace(/[.]/, ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const formatDate = (date: string): string => {
  return moment(date).format("MMM YYYY");
};

export { formatDate, formatDecimal };
