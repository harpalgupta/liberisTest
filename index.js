//take in example input
const input = require("./inputs/2.json");
//assume current date is march 2018
const currentDate = { year: 2018, month: "03" };

const elegibilityCheck = input => {
  const { amountRequested, timeInBusiness, transactions } = input;
  //loan request amount between 5000 and 50000
  if (amountRequested >= 5000 && amountRequested <= 50000) {
    console.log("requested valid amount");
  } else return false;

  //* The business must have been operating for more than 12 months
  let monthsInBusiness = 0;
  if (timeInBusiness.years) {
    monthsInBusiness = timeInBusiness.years * 12 + timeInBusiness.months;
  } else monthsInBusiness = timeInBusiness.months;

  if (monthsInBusiness >= 12) {
    console.log("time in business is at least 1 year");
  } else return false;

  //if requested amount above 25k and monthsInBusiness is not more than 12 months reject
  if (!(monthsInBusiness > 12) && amountRequested > 25000) {
    return false;
  }

  //* The transaction average in each month must exceed the requested amount
  const monthNames = [
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
    "December"
  ];
  const totalPerMonth = {};

  const transactValueMonth = transactions.reduce(
    (acc, curr, index) => {
      const { value } = curr;
      const dateConverted = new Date(curr.date);
      const year = dateConverted.getFullYear();
      let month = dateConverted.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      acc.oldestTransact =
        dateConverted < acc.oldestTransact ? dateConverted : acc.oldestTransact;

      if (acc.transactPerMonth[`${year}${month}`]) {
        acc.transactPerMonth[`${year}${month}`] += value;
      } else {
        acc.transactPerMonth[`${year}${month}`] = value;
      }

      acc.years = { ...acc.years, [year]: 0 };

      //return transactions per month object
      return acc;
    },
    { years: {}, transactPerMonth: {}, oldestTransact: Date.now() }
  );
  //add missing months
  const oldestYear = transactValueMonth.oldestTransact.getFullYear();
  let oldestMonth = transactValueMonth.oldestTransact.getMonth() + 1;
  //reformat month with 0
  oldestMonth = oldestMonth < 10 ? "0" + oldestMonth : oldestMonth;
  oldestTrans=oldestYear+oldestMonth

  currentDate.year - 1, currentDate.month


  console.log("MMMM", oldestTrans);

  const monthsPadding = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  const years = Object.keys(transactValueMonth.years);
  years.forEach(year=>{
    monthsPadding.forEach((month,index)=>{
      const yearMonth=year+month
      if (yearMonth*1>=oldestTrans*1&&yearMonth<=(currentDate.year+currentDate.month)) {
      if (!transactValueMonth.transactPerMonth[yearMonth]){
        transactValueMonth.transactPerMonth[yearMonth]=null
       }
      }
    })
  })

  console.log("<<<<<<<", transactValueMonth);

  console.log(currentDate.year - 1, currentDate.month);
  if (
    transactValueMonth.oldestTransact.getFullYear() <= currentDate.year - 1 &&
    transactValueMonth.oldestTransact.getMonth() + 1 <= currentDate.month
  ) {
    console.log(
      "old enough transaction logs available",
      transactValueMonth.oldestTransact.getFullYear(),
      transactValueMonth.oldestTransact.getMonth() + 1
    );
  } else return false;

  return true;
};

console.log(elegibilityCheck(input));

module.exports = elegibilityCheck;
