//codecademy - Challenge Project: Credit Card Checker

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

/* Task 1: 
/* Create a function, validateCred() that has a parameter of an array. The purpose of validateCred() is to return true when an array contains digits of 
a valid credit card number and false when it is invalid. This function should NOT mutate the values of the original array. */

const validateCred = (array) => {
  // Define resultChecker once before the loop
  const resultChecker = [];
  for ( let i= array.length -1; i >= 0 ; i--) {     // ““Keep looping as long as i is greater than or equal to 0." go backward through the array until you’ve processed index 0.”
  let currentDigit = array[i];     //stores the current number we’re looking at, based on our i position

  if ((array.length - 1 - i) % 2 === 1) {
  //If this digit is in an odd position counting from the right (every other digit), double it. % 2 ===1 means Check if this position is odd. 
  // checking if there is any remainder in the number once the number is divided by 2 if there is 1 left over it means it is odd, as an even number % 2 hav 0 left. 
    currentDigit *= 2;          // double it
    if (currentDigit > 9) {
      currentDigit -= 9;        // subtract 9 if needed
    }
  }
     resultChecker.push(currentDigit);  // Push it into the resultChecker variable whether changed or not.
}
const total = resultChecker.reduce((sum, num) => 
sum + num, 0);
 if (total % 10 === 0) {
    return true; // Valid card
  } else {
    return false; // Invalid card
  }
}

console.log (validateCred(mystery5));

// Task 2: 
/* Create another function, findInvalidCards() that has one parameter for a nested array of credit card numbers. 
The role of findInvalidCards() is to check through the nested array for which numbers are invalid, and return another nested array of invalid cards.*/

const findInvalidCards= (nestedArray) => {
  let invalidCardNest =[];
for (let i = 0; i < nestedArray.length; i++) {
  let currentCard = nestedArray[i];
  // currentCard is one single credit card array (like valid1)
    if (!validateCred(currentCard)) { // This card is invalid
     invalidCardNest.push(currentCard);
    //console.log ('Added invalid card number to var invaildCardNest : ', currentCard);
  }
}
return invalidCardNest;
}
const invalidCards = findInvalidCards(batch); // 
console.log(findInvalidCards(batch)); 


//Task 3: 
/*After finding all the invalid credit card numbers, it is also necessary to identify the credit card companies that have possibly issued these faulty numbers. 
Create a function, idInvalidCardCompanies() that has one parameter for a nested array of invalid numbers and returns an array of companies.

Currently, there are 4 accepted companies which each have unique first digits. The following table shows which digit is unique to which company:
First Digit	Company
3	Amex (American Express).  /   4	Visa   /    5	 Mastercard   /   6	  Discover
If the number does not start with any of the numbers listed, print out a message: “Company not found”.

idInvalidCardCompanies() should return an array of companies that have mailed out cards with invalid numbers. 
This array should NOT contain duplicates, i.e. even if there are two invalid Visa cards, "Visa" should only appear once in the array. */

const idInvalidCardCompanies = (nestedArrayInvlNums) => {
  // Create an empty array to store unique company names - companies will store the company names without duplicates due to checks in switch below
  const companies = [];

  // Loop through every invalid card in the nested array
  for (let i = 0; i < nestedArrayInvlNums.length; i++) {
    // Get the first digit of the current card - Accesses index 0 of that card being checked (the first number)
    const firstDigit = nestedArrayInvlNums[i][0];

    // Decide which company it belongs to - Depending on what number that first digit is of the card being checked, it will go to the right case
    switch (firstDigit) {
      case 3:
        if (!companies.includes('Amex')) {     // If we do not already have 'Amex' in our array, we add it - .includes() checks if it is already there (to avoid duplicates) 
          companies.push('Amex');
        }
        break;                                 //Stops the switch from falling through to the next case.

      case 4:
        if (!companies.includes('Visa')) {
          companies.push('Visa');
        }
        break;

      case 5:
        if (!companies.includes('Mastercard')) {
          companies.push('Mastercard');
        }
        break;

      case 6:
        if (!companies.includes('Discover')) {
          companies.push('Discover');
        }
        break;

      default:
        console.log('Company not found');
        break;
    }
  }

  // Return the array of unique company names - Sends back the array of company names (e.g. ["Visa", "Mastercard"])
  return companies;
};

console.log (idInvalidCardCompanies(invalidCards));


//Task 4 : 
/* To make it easier to test credit card numbers, create a function that accepts a string and 
converts it into an array of numbers like the initially provided arrays.*/
 // My notes : 
/*Step-by-step:
Create the function
Give it one parameter — the string version of a card number.

Create an empty array
This will store the converted digits.

Loop through the string
Use a for loop to visit each character one by one.

Convert each character into a number
Use parseInt() on each character and push() it into the array.

Return the array*/

const stringToArray = (cardString) => {
  let cardArray = []; // Step 2: create an empty array

  for (let i = 0; i < cardString.length; i++) { // Step 3: loop through each character
    let digit = parseInt(cardString[i]); // Step 4: convert string to number
    cardArray.push(digit); // add it to the array
  }

  return cardArray; // Step 5: return the final array
};

//testing it : 

console.log(stringToArray("4539677908016808"));



