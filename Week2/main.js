/*
Surname     | Firstname        | email    | Contribution% | Any issues?
=======================================================================
Zulli       |Anthony Nicholas  | azul0005 | 25%           |
Morgante    |Giacomo           | gmor0008 | 25%           |
Lai         |Glorison          | glai0004 | 25%           |
Ho          |Joshua            | jhoo0017 | 25%           |

Complete Worksheet 2 by entering code in the places marked below...

For full instructions and tests open the file worksheetChecklist.html
in Chrome browser.  Keep it open side-by-side with your editor window.
You will edit this file (main.js), save it, and reload the
browser window to run the test.
*/
/**
 * Exercise 1
 */
const myObj = {
    aProperty: "Hello",
    anotherProperty: 1
}

/**
 * Exercise 2
 */
function operationOnTwoNumbers(f) {
    return x => y => f(x, y);
}


/**
 * Exercise 3
 */
function callEach(fnArray) {
    fnArray.forEach(fn => fn());
}

/**
 * Exercise 4
 */
function addN(n, arr) {
    return arr.map(i => operationOnTwoNumbers((x, y) => x + y)(n)(i));
}

function getEvens(arr) {
    return arr.filter(i => i % 2 === 0)
}

function multiplyArray(arr) {
    return arr.reduce((sum, el) => el !== 0 ? sum * el : sum)
}

/**
 * Exercise 5
 */
function range(n, counter = 0, arr = []) {
    return counter < n ? range(n, counter + 1, arr.concat([counter])) : arr
}

/**
 * Exercise 6
 */

function Euler1() {
    return range(1000).filter(i => !(i % 3) || !(i % 5)).reduce((sum, el) => el + sum)
}
/**
 * Exercise 7
 */

function infinite_series_calculator(accumulate) {
    return predicate => transform => n => (
        range(n).map(transform).filter(predicate).reduce(accumulate)
    )
}

/**
 * Exercise 8
 */

function calculatePiTerm(n) {
    return (4 * n ** 2) / (4 * n ** 2 - 1)
}

function skipZero(n) {
    return n !== 0
}

function productAccumulate(x, y) {
    return x * y;
}

function calculatePi(n) {
    return 2 * infinite_series_calculator(productAccumulate)(skipZero)(calculatePiTerm)(n);
}

function calculateAccurateSeries(f, n = 2) {
    const a = f(n);
    return target => threshold => Math.abs(a - target) > threshold ? calculateAccurateSeries(f, n + 1)(target)(threshold) : a;
}

const pi = calculateAccurateSeries(calculatePi)(Math.PI)(0.01);

/**
 * Exercise 9
 */
function factorial(n, sum = 1) {
    return n === 0 || n === 1 ? sum : factorial(n - 1, sum * n);
}

function calculateETerm(n) {
    return (2 * (n + 1)) / factorial(2 * n + 1);
}

function alwaysTrue() {
    return true;
}

function sumAccumulate(x, y) {
    return x + y;
}

function sum_series_calculator(transform) {
    return n => infinite_series_calculator(sumAccumulate)(alwaysTrue)(transform)(n);
}

function calculateE(n) {
    return sum_series_calculator(calculateETerm)(n);
}


const e = calculateAccurateSeries(calculateE)(Math.E)(0.01);

/**
 * Exercise 10
 */
function calculateSine(x) {
    return n => ((-1) ** n) * (x ** (2 * n + 1)) / factorial(2 * n + 1);
}

function sin(x) {
    return calculateAccurateSeries(n => sum_series_calculator(calculateSine(x))(n))(Math.sin(x))(0.01);
}