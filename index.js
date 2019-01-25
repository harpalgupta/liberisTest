//expect json file to be parsed as argument for example index.js ./inputs/1.json
const inputFile = process.argv[2]
//take in example input
const input = require(inputFile);


const {reformatYearMonth,padMonths,createTransactionObject} = require('./utils/index')



const elegibilityCheck = input => {
//assume current date is march 2018
  const currentDate = { year: 2018, month: "03" };
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
    console.log("above 25k and monthsInBusiness is not more than 12 months");
    return false;
  }


  let transactValueMonth = createTransactionObject(transactions)

  

  

  const oldestYear = transactValueMonth.oldestTransact.getFullYear();
  let oldestMonth = transactValueMonth.oldestTransact.getMonth() + 1;
  //reformat year month

   const oldestTrans= reformatYearMonth(oldestYear,oldestMonth)
  //padding out months with null vals  
  transactValueMonth={...padMonths(transactValueMonth,oldestTrans,currentDate)}

  console.log("<<<<<<<", transactValueMonth);

  if (
    transactValueMonth.oldestTransact.getFullYear() <= currentDate.year - 1 &&
    transactValueMonth.oldestTransact.getMonth() + 1 <= currentDate.month
  ) {
    console.log("old enough transaction logs available", oldestTrans);
  } else {
    console.log(
      "old enough transaction logs not available oldest log is",
      oldestTrans
    );
    return false;
  }

  //check if empty months for 25k
  console.log("requested", amountRequested);
  if (amountRequested > 25000) {
    console.log("more than 25k");
    if (transactValueMonth.missingMonths > 0) {
      console.log("requested 25000 but has missing transaction months");
      return false;
    }
  }

  //check all months provided are greater then amountRequested
  for (const yearMonth in transactValueMonth.transactPerMonth) {
    if (transactValueMonth.transactPerMonth[yearMonth]) {
      if (amountRequested > transactValueMonth.transactPerMonth[yearMonth]) {
        console.log(
          "found transaction ",
          yearMonth,
          transactValueMonth.transactPerMonth[yearMonth],
          "which is lower then amount requested"
        );
        return false;
      }
    }
  }

  //check average value for missing months
  if (transactValueMonth.missingMonths > 0) {
    const averagePerMonth =
      transactValueMonth.totalValue / transactValueMonth.transactMonths;
    if (averagePerMonth < amountRequested) {
      console.log("average per month lower then amount requested");
      return false;
    }

    1;
  }
//if no tests failed return true
  return true;
};

console.log(elegibilityCheck(input));

module.exports = elegibilityCheck;
