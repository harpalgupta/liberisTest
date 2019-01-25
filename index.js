//take in example input
const input=require('./inputs/1.json');

const elegibilityCheck=(input)=>{
//loan request amount between 5000 and 50000
if (input.amountRequested>=5000&&input.amountRequested<=50000) {console.log('requested valid amount')} 
else return false; 


//* The business must have been operating for more than 12 months
if (input.timeInBusiness.years>=1){
console.log('time in business is at least 1 year')
}
else return false;

return true;
}




console.log(elegibilityCheck(input))


module.exports= elegibilityCheck;
