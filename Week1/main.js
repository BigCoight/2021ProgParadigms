/* 
Complete the following table when you submit this file:

Surname     | Firstname        | email    | Contribution% | Any issues?
=======================================================================
Zulli       |Anthony Nicholas  | azul0005 | 25%           |
Morgante    |Giacomo           | gmor0008 | 25%           |
Lai         |Glorison          | glai0004 | 25%           |
Ho          |Joshua            | jhoo0017 | 25%           |

complete Worksheet 1 by entering code in the places marked below...

For full instructions and tests open the file worksheetChecklist.html
in Chrome browser.  Keep it open side-by-side with your editor window.
You will edit this file (main.js), save it, and reload the 
browser window to run the test. 
*/

/**
    Exercise 1:
    The let and const keywords are for creating mutable and immutable variables 
    respectively.
    Create a mutable variable called ‘aVariable’ and assign its value to 1.
*/
let aVariable = 1;
/*
    Create an immutable variable called ‘aConst’ and assign its value to aVariable + 1.
*/
const aConst = aVariable + 1;

/**
    Exercise 2:
    Create a function called ‘aFunction’ using the function keyword.  
    Inside the function create another variable called 'anotherVariable',
    set its value to 2 and return anotherVariable.
*/
function aFunction() {
    let anotherVariable = 2;
    return anotherVariable;
}
/**
    Exercise 3:
    Make a function called ‘projectEulerProblem1’ that calculates the answer using
    mutable variables, a while loop, and returns the answer.
*/
function projectEulerProblem1() {
    let a = 0;
    let sum = 0;
    while (a < 1000) {
        if (a % 3 === 0 || a % 5 === 0) {
            sum += a;
        }
        a++;
    }
    return sum;
}

/**
    Exercise 4:
    Write a function called ‘alwaysTrue’ which always returns true, no matter what argument it is given.
*/
function alwaysTrue() {
    return true;
}

/**
    Write a function called imperativeSummer that takes two parameters: a function f, and a number n.  
    It should use an imperative loop to sum over the numbers from 1 up to (but not including) n,
    including the number x in the sum only if f(x) is true.
*/
function imperativeSummer(f, n) {
    let counter = 0;
    let sum = 0;
    while (counter < n) {
        sum += f(counter) ? counter : 0;
        counter++;
    }
    return sum;
}

/**
    Write a function called sumTo that takes as parameter a number n and
    uses imperativeSummer and alwaysTrue to calculate the sum of all numbers
    from 1 up to (but not including) n.
*/
function sumTo(n) {
    return imperativeSummer(alwaysTrue, n);
}

/**
    Write a function called ‘isDivisibleByThreeOrFive’ which takes a number as parameter,
    tests if it is divisible by 3 or 5, returning true if it is.
*/
function isDivisibleByThreeOrFive(n) {
    return !(n % 3) || !(n % 5);
}

/**
    Write a function called projectEulerProblem1UsingImperativeSummer 
    that uses your imperativeSummer and isDivisibleByThreeOrFive to
    again solve Project Euler Problem 1.  It should be one line of code!
*/
function projectEulerProblem1UsingImperativeSummer() {
    return imperativeSummer(isDivisibleByThreeOrFive, 1000);
}

/**
    Exercise 5:
    Write a function called 'immutableSummer' with parameters f and n, which computes the sum of numbers
    from 1 up to (but not including) n that satisfy f, but does *not* use while,
    for or any mutable variables (defined with let or var).
    Hint: use recursion!
*/
function immutableSummer(f, n, counter = 0, sum = 0) {
    return counter < n ? immutableSummer(f, n, counter + 1, sum + (f(counter) ? counter : 0)) : sum;
}


/*
    Write a function called projectEulerProblem1UsingImmutableSummer 
    that uses your immutableSummer and isDivisibleByThreeOrFive to
    again solve Project Euler Problem 1.  It should be one line of code!
*/
function projectEulerProblem1UsingImmutableSummer() {
    return immutableSummer(isDivisibleByThreeOrFive, 1000);
}