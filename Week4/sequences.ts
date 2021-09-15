/* 
Complete the following table when you submit this file:

Surname     | Firstname        | email    | Contribution% | Any issues?
=======================================================================
Zulli       |Anthony Nicholas  | azul0005 | 25%           |
Morgante    |Giacomo           | gmor0008 | 25%           |
Lai         |Glorison          | glai0004 | 25%           |
Ho          |Joshua            | jhoo0017 | 25%           |

complete Worksheet 4 by entering code in the places marked below...

For full instructions and tests open the file worksheetChecklist.html
in Chrome browser.  Keep it open side-by-side with your editor window.
You will edit this file (main.ts), save it, and reload the 
browser window to run the test. 
*/

/*
    Exercise 1 - General Purpose infinite sequence function
 */

interface LazySequence<T> {
    value: T;
    next(): LazySequence<T>;
}

function initSequence<T>(transform:(value:T)=> T): (initialValue: T) => LazySequence<T> { 
    return function _next(initialValue: T): LazySequence<T> {
        return {
            value: initialValue,
            next: () => _next(transform(initialValue))
        }
    }
}

/*
    Exercise 2
 */

function map<T>(func: (v: T)=>T, seq: LazySequence<T>): LazySequence<T>{
    return seq ? {
        value: func(seq.value),
        next: () => map(func, seq.next())
    } : undefined;
}
function filter<T>(func: (v: T)=>boolean, seq: LazySequence<T>): LazySequence<T>{
    return seq ? (func(seq.value) ? {
        value: seq.value,
        next: () => filter(func, seq.next())
    } : filter(func, seq.next())) : undefined;
}

function take<T>(amount: number, seq: LazySequence<T>): LazySequence<T> | undefined{
    return seq ? (amount ? {
        value: seq.value,
        next: () => take(amount - 1, seq.next())
    } : undefined) : undefined;
}

function reduce<T,V>(func: (v:V, t: T)=>V, seq: LazySequence<T>, start:V): V{
    return seq ? reduce(func, seq.next(), func(start, seq.value)) : start;
}

function reduceRight<T,V>(func: (v:V, t: T)=>V, seq: LazySequence<T>, start:V): V{
    return seq ? func(reduceRight(func, seq.next(), start), seq.value) : start;
}

/*
    Exercise 3
 */

function maxNumber<T>(seq: LazySequence<T>): T{
    return reduce((acc , x) => acc < x ? x : acc, seq, seq.value);
}

function lengthOfSequence<T>(seq: LazySequence<T>): number{
    return reduce((acc, x) => acc+1, seq, 0);
}

function toArray<T>(seq: LazySequence<T>): T[]{
    return reduce((arr, val) => arr.concat([val]), seq, []);
}

/* 
    Exercise 4 
 */

function exercise4Solution (seriesLength: number): number {
    const seq = take(seriesLength, initSequence((v:number)=> v + 1)(0));
    return reduce(
        (acc, val)=> acc + val, map((n) => ((-1)**(n)) / (2*n+1), seq), 0
    );
};