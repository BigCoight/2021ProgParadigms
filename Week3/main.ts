/* 
Complete the following table when you submit this file:

Surname     | Firstname        | email    | Contribution% | Any issues?
=======================================================================
Zulli       |Anthony Nicholas  | azul0005 | 25%           |
Morgante    |Giacomo           | gmor0008 | 25%           |
Lai         |Glorison          | glai0004 | 25%           |
Ho          |Joshua            | jhoo0017 | 25%           |

complete Worksheet 3 by entering code in the places marked below...

For instructions and tests open the file worksheetChecklist.html
in Chrome browser.  Keep it open side-by-side with your editor window.
You will edit this file (main.ts), save it, and reload the 
browser window to run the test. 
*/

/**
 * Exercise 1:
*/

function addStuff(a: number, b: number): number {
    return a + b;
}
function numberToString(input: number): string {
    return JSON.stringify(input);
}

/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: string | number): string {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"

function curry<U,V,W>(f: (x: U, y: V) => W): (x: U) => (y: V) => W {
    return function(x) {
        return function(y) {
            return f(x,y);
        }
    }
}

//
// Exercise 2: implement the map function for the cons list below
//

/**
 * A ConsList is either a function created by cons, or empty (null)
 */
type ConsList<T> = Cons<T> | null;

/**
 * The return type of the cons function, is itself a function
 * which can be given a selector function to pull out either the head or rest
 */
type Cons<T> = (selector: Selector<T>) => T | ConsList<T>;

/**
 * a selector will return either the head or rest
 */
type Selector<T> = (head:T, rest:ConsList<T>)=> T | ConsList<T>;

/**
 * cons "constructs" a list node, if no second argument is specified it is the last node in the list
 */
function cons<T>(head:T, rest: ConsList<T>): Cons<T> {
    return (selector: Selector<T>) => selector(head, rest);
}

/**
 * head selector, returns the first element in the list
 * @param list is a Cons (note, not an empty ConsList)
 */
function head<T>(list:Cons<T>):T {
    return <T>list((head, rest?) => head);
}

/**
 * rest selector, everything but the head
 * @param list is a Cons (note, not an empty ConsList)
 */
function rest<T>(list:Cons<T>):ConsList<T> {
    return <Cons<T>>list((head, rest?) => rest);
}
/**
 * Use this as an example for other functions!
 * @param f Function to use for each element
 * @param list is a Cons
 */
function forEach<T>(f: (_:T)=>void, list:ConsList<T>): void {
    if (list) {
        f(head(list));
        forEach(f,rest(list));
    }
}

function map<T,V>(f: (_: T) => V, l: ConsList<T>): ConsList<V> {
    return l ? cons(f(head(l)), map(f, rest(l))) : null;
}

//
// Exercise 3: 
// 

function fromArray<A>(array: A[]): ConsList<A> {
    return array.length > 0 ? cons(array[0], fromArray(array.slice(1))) : null;
}

function filter<A>(f: (_: A) => boolean, l: ConsList<A>): ConsList<A>{
    return l ? (f(head(l)) ? cons(head(l), filter(f, rest(l))) : filter(f, rest(l))) : null;
}

function reduce<A, B>(func: (x: B, y: A) => B, start: B, list: ConsList<A> ): B {
    return list ? reduce(func, func(start, head(list)), rest(list)) : start;
}

function reduceRight<A, B>(f: (x:B, y:A) => B, initialValue: B, list: ConsList<A>): B {
    return list ? f(reduceRight(f, initialValue, rest(list)), head(list)) : initialValue;
}

function concat<A>(list1: ConsList<A>, list2: ConsList<A>): ConsList<A>{
    return list1 ? cons(head(list1), concat(rest(list1), list2)) :
    (list2 ? cons(head(list2), rest(list2)) : null); 
}

function reverse<T>(l: ConsList<T>, wrap: ConsList<T> = null): ConsList<T> {
    return l ? reverse(rest(l), cons(head(l), wrap)) : wrap;
}

// example use of reduce:
function countLetters(stringArray: string[]): number {
    const list = fromArray(stringArray);
    return reduce((len:number, s:string)=>len + s.length,0,list);
}
console.log(countLetters(["Hello","there!"]));

//
// Exercise 4:
// 
/**
 * A linked list backed by a ConsList
 */
class List<T> {
    private readonly head: ConsList<T>;

    constructor(list: T[] | ConsList<T>) {
        if (list instanceof Array) {
            this.head = fromArray(list);
        } else {
            this.head = (list === undefined) ? null : list;
        }
    }
    /**
     * create an array containing all the elements of this List
     */
    toArray(): T[] {
        // Getting type errors here?
        // Make sure your type annotation for reduce()
        // in Exercise 3 is correct!
        return reduce((a, t) => [...a, t], <T[]>[], this.head);
    }
    forEach(f: (_:T) => void): List<T> {
        forEach(f, this.head);
        return new List(this.head);
    }
    filter(f: (_:T) => boolean): List<T> {
        return new List(filter(f,this.head));
    }
    map<U>(f: (_:T) => U): List<U> {
        return new List(map(f,this.head));
    }
    reduce<U>(f: (acc:U, curr:T) => U, init: U): U {
        return reduce(f,init,this.head);
    }
    concat(l: List<T>): List<T> {
        return new List(concat(this.head, l.head));
    }
}

/**
 * Exercise 5:
 */
function line(st: string): [number, string] {
    return [0, st];
}

function lineToList(line: [number, string]): List<[number, string]>{
    return new List([line]);
}

/**
 * Exercise 6: 
 *  
 * */

type BinaryTree<T> = BinaryTreeNode<T> | undefined

class BinaryTreeNode<T> {
    constructor(
        public readonly data: T,
        public readonly leftChild?: BinaryTree<T>,
        public readonly rightChild?: BinaryTree<T>,
    ){}
}

function nest(indent: number, layout: List<[number, string]>): List<[number, string]> {
    return layout.map((el) => [el[0] + indent, el[1]]);
}

// example tree:+
const myTree = new BinaryTreeNode(
    1,
    new BinaryTreeNode(
        2,
        new BinaryTreeNode(3)
    ),
    new BinaryTreeNode(4)
);

// *** uncomment the following code once you have implemented List and nest function (above) ***

function prettyPrintBinaryTree<T>(node: BinaryTree<T>): List<[number, string]> {
    if (!node) {
        return new List<[number, string]>([])
    }
    const thisLine = lineToList(line(node.data.toString())),
          leftLines = prettyPrintBinaryTree(node.leftChild),
          rightLines = prettyPrintBinaryTree(node.rightChild);
    return thisLine.concat(nest(1, leftLines.concat(rightLines)))
}

const output = prettyPrintBinaryTree(myTree)
                    .map(aLine => new Array(aLine[0] + 1).join('-') + aLine[1])
                    .reduce((a,b) => a + '\n' + b, '').trim();
console.log(output);

/**
 * Exercise 7:
 *  implement prettyPrintNaryTree, which takes a NaryTree as input
 *  and returns a list of the type expected by your nest function
 */

class NaryTree<T> {
   constructor(
       public data: T,
       public children: List<NaryTree<T>> = new List(undefined),
   ){}
}

// Example tree for you to print:
let naryTree = new NaryTree(1,
    new List([
        new NaryTree(2),
        new NaryTree(3,
            new List([
                new NaryTree(4),
            ])),
        new NaryTree(5)
    ])
)

// implement: function prettyPrintNaryTree(...)
function prettyPrintNaryTree<T>(node: NaryTree<T>): List<[number, string]> {
    return node ? 
                lineToList(line(node.data.toString()))
                    .concat(node.children.map(prettyPrintNaryTree)
                    .map(el => nest(1,el))
                    .reduce((acc, el) => acc.concat(el), new List<[number, string]>([])))
                : new List<[number, string]>([]);
}

// *** uncomment the following code once you have implemented prettyPrintNaryTree (above) ***
const outputNaryTree = prettyPrintNaryTree(naryTree)
                    .map(aLine => new Array(aLine[0] + 1).join('-') + aLine[1])
                    .reduce((a,b) => a + '\n' + b, '').trim();
console.log(outputNaryTree);

type jsonTypes = Array<jsonTypes> | { [key: string]: jsonTypes } | string | boolean | number | null

const jsonPrettyToDoc: (json: jsonTypes) => List<[number, string]> = json => {
    if (Array.isArray(json)) {
        return lineToList(line("["))
                .concat(nest(1, json.map((el, i) => i !== json.length -1?
                    jsonPrettyToDoc(el)
                        .concat(lineToList(line(",")))
                : jsonPrettyToDoc(el))
                .reduce((accum, el) => accum.concat(el))))
                .concat(lineToList(line("]")))
    } else if (typeof json === 'object' && json !== null) {
        return lineToList(line("{"))
                    .concat(nest(1, Object.keys(json)
                        .map(key => key !== Object.keys(json)[Object.keys(json).length -1]?
                            lineToList(line(key + ":"))
                                .concat(jsonPrettyToDoc(json[key]))
                                .concat(lineToList(line(",")))
                            : lineToList(line(key + ":"))
                            .concat(jsonPrettyToDoc(json[key])))
                        .reduce((acc, el) => acc.concat(el), new List<[number, string]>([]))))
                    .concat(lineToList(line("}")));
    } else if (typeof json === 'string') {
        return lineToList(line(json));
    } else if (typeof json === 'number') {
        return lineToList(line(json.toString()));
    } else if (typeof json === 'boolean') {
        return lineToList(line(json.toString()));
    } else if (json === null) {
        return lineToList(line("null"));
    }

    // Default case to fall back on.
    return new List<[number, string]>([]);
};

// *** uncomment the following code once you are ready to test your implemented jsonPrettyToDoc ***
const json = {
    unit: "FIT2102",
    year: 2021,
    semester: "S2",
    active: true,
    assessments: {"week1": null as null, "week2": "Tutorial 1 Exercise", "week3": "Tutorial 2 Exercise"},
    languages: ["Javascript", "Typescript", "Haskell", "Minizinc"]
}

function lineIndented(aLine: [number, string]): string {
    return new Array(aLine[0] + 1).join('    ') + aLine[1];
}

function appendLine(acc: string, nextLine: string): string {
    return nextLine.slice(-1) === "," ? acc + nextLine.trim() :
           acc.slice(-1) === ":"      ? acc + " " + nextLine.trim() :
           acc + '\n' + nextLine;
}

console.log(jsonPrettyToDoc(json)
              .map(lineIndented)
              .reduce(appendLine, '').trim());



// *** This is what it should look like in the console ***
// 
// {
//     unit: FIT2102,
//     year: 2021,
//     semester: S2,
//     active: true,
//     assessments: {
//         week1: null,
//         week2: Tutorial 1 Exercise,
//         week3: Tutorial 2 Exercise
//     },
//     languages: [
//         Javascript,
//         Typescript,
//         Haskell,
//         Minizinc
//     ]
// }
