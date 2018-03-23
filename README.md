# Checking BCA Eligibility

Write a function to decide whether or not an application is able to be automatically
accepted for a Business Cash Advance (BCA). The application must conform to the following criteria in order to be eligible:

* The amount requested is between 5,000 and 50,000 inclusive
* The transaction average in each month must exceed the requested amount
* The business must have been operating for more than 12 months
* If there are no transactions in a month for the last 12 months, then the assumed
  transaction value for that month is the average of all other months that do have transactions.
* If the amount requested is above 25,000, then the transaction history must cover more than 12 months, with no months
  having no transactions. The empty months can't be populated with the average as above.

Your program should accept a JSON file as its input (the same structure as the examples in `inputs`),
and output a Boolean value with the result of the decision.

You can find some example inputs in the `inputs` folder. The eligibility (as decided by your code)
should be as follows:

* Input 1 - Eligible
* Input 2 - Eligible
* Input 3 - Ineligible

You can spend as long as you like on this test, and provide as much supporting information
(comments/tests) as you like. You can choose to write your solution for the test in
plain JavaScript or TypeScript.

## Next steps

Upload your solution somewhere private, like a [private Gist](https://gist.github.com/), and email
the link to <mailto:coding-test@liberis.co.uk>.
