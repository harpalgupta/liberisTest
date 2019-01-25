exports.reformatYearMonth=(year,month)=>{
  const reformattedMonth = month < 10 ? "0" + month : month;
  return year + reformattedMonth;
}


exports.createTransactionObject=(transactions)=>{
  
  const transactValueMonth=transactions.reduce(
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
        acc.transactMonths++;
        acc.transactPerMonth[`${year}${month}`] = value;
      }

      acc.years = { ...acc.years, [year]: 0 };
      acc.totalValue += value;
      //return transactions per month object
      return acc;
    },
    {
      years: {},
      transactPerMonth: {},
      oldestTransact: Date.now(),
      transactMonths: 0,
      totalValue: 0
    }
  );

  //add missing months
  transactValueMonth.missingMonths = 0;
  return transactValueMonth
}

exports.padMonths=(transactValueMonth,oldestTrans,currentDate) => {
  const reformatYearMonth=require('.')
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
  years.forEach(year => {
    monthsPadding.forEach((month, index) => {
      const yearMonth = year + month;
      if (
        yearMonth * 1 >= oldestTrans * 1 &&
        yearMonth <= currentDate.year + currentDate.month
      ) {
        if (!transactValueMonth.transactPerMonth[yearMonth]) {
          transactValueMonth.transactPerMonth[yearMonth] = null;
          transactValueMonth.missingMonths++;
        }
      }
    });
  });
return transactValueMonth
}
