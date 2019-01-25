//take in example input
const input=require('./inputs/1.json');




const elegibilityCheck=(input)=>{
  const {amountRequested,timeInBusiness,transactions}= input
//loan request amount between 5000 and 50000
if (amountRequested>=5000&&amountRequested<=50000) {console.log('requested valid amount')} 
else return false; 


//* The business must have been operating for more than 12 months
if (timeInBusiness.years>=1){
console.log('time in business is at least 1 year')
}
else return false;

//* The transaction average in each month must exceed the requested amount
const monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];
const totalPerMonth={};


const transactValueMonth =transactions.reduce((acc,curr)=>{
  const {value}=curr
  const dateConverted= new Date(curr.date);
  const year=(dateConverted.getFullYear())
  const month=(monthNames[dateConverted.getMonth()])
 // acc[year]={test:1}
  //check if year exists already if not initalize
    if (!acc[year]) {
      acc[year]={};
      acc[year][month]=value;
          
    }
    else{
      //check if month exists if not initialize
      if (acc[year][month])  acc[year][month]+=value
      else acc[year][month]=value
      
    }
//return transactions per month object    
return acc
}

,{})

console.log("<<<<<<<",transactValueMonth)

//check if transansactions per month are above 




return true;
}




console.log(elegibilityCheck(input))


module.exports= elegibilityCheck;
