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
function addStuff(a, b) {
    return a + b;
}
function numberToString(input) {
    return JSON.stringify(input);
}
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
padLeft("Hello world", 4); // returns "    Hello world"
function curry(f) {
    return function (x) {
        return function (y) {
            return f(x, y);
        };
    };
}
/**
 * cons "constructs" a list node, if no second argument is specified it is the last node in the list
 */
function cons(head, rest) {
    return (selector) => selector(head, rest);
}
/**
 * head selector, returns the first element in the list
 * @param list is a Cons (note, not an empty ConsList)
 */
function head(list) {
    return list((head, rest) => head);
}
/**
 * rest selector, everything but the head
 * @param list is a Cons (note, not an empty ConsList)
 */
function rest(list) {
    return list((head, rest) => rest);
}
/**
 * Use this as an example for other functions!
 * @param f Function to use for each element
 * @param list is a Cons
 */
function forEach(f, list) {
    if (list) {
        f(head(list));
        forEach(f, rest(list));
    }
}
function map(f, l) {
    return l ? cons(f(head(l)), map(f, rest(l))) : null;
}
//
// Exercise 3: 
// 
function fromArray(array) {
    return array.length > 0 ? cons(array[0], fromArray(array.slice(1))) : null;
}
function filter(f, l) {
    return l ? (f(head(l)) ? cons(head(l), filter(f, rest(l))) : filter(f, rest(l))) : null;
}
function reduce(func, start, list) {
    return list ? reduce(func, func(start, head(list)), rest(list)) : start;
}
function reduceRight(f, initialValue, list) {
    return list ? f(reduceRight(f, initialValue, rest(list)), head(list)) : initialValue;
}
function concat(list1, list2) {
    return list1 ? cons(head(list1), concat(rest(list1), list2)) :
        (list2 ? cons(head(list2), rest(list2)) : null);
}
function reverse(l, wrap = null) {
    return l ? reverse(rest(l), cons(head(l), wrap)) : wrap;
}
// example use of reduce:
function countLetters(stringArray) {
    const list = fromArray(stringArray);
    return reduce((len, s) => len + s.length, 0, list);
}
console.log(countLetters(["Hello", "there!"]));
//
// Exercise 4:
// 
/**
 * A linked list backed by a ConsList
 */
class List {
    constructor(list) {
        if (list instanceof Array) {
            this.head = fromArray(list);
        }
        else {
            this.head = (list === undefined) ? null : list;
        }
    }
    /**
     * create an array containing all the elements of this List
     */
    toArray() {
        // Getting type errors here?
        // Make sure your type annotation for reduce()
        // in Exercise 3 is correct!
        return reduce((a, t) => [...a, t], [], this.head);
    }
    forEach(f) {
        forEach(f, this.head);
        return new List(this.head);
    }
    filter(f) {
        return new List(filter(f, this.head));
    }
    map(f) {
        return new List(map(f, this.head));
    }
    reduce(f, init) {
        return reduce(f, init, this.head);
    }
    concat(l) {
        return new List(concat(this.head, l.head));
    }
}
/**
 * Exercise 5:
 */
function line(st) {
    return [0, st];
}
function lineToList(line) {
    return new List([line]);
}
class BinaryTreeNode {
    constructor(data, leftChild, rightChild) {
        this.data = data;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}
function nest(indent, layout) {
    return layout.map((el) => [el[0] + indent, el[1]]);
}
// example tree:+
const myTree = new BinaryTreeNode(1, new BinaryTreeNode(2, new BinaryTreeNode(3)), new BinaryTreeNode(4));
// *** uncomment the following code once you have implemented List and nest function (above) ***
function prettyPrintBinaryTree(node) {
    if (!node) {
        return new List([]);
    }
    const thisLine = lineToList(line(node.data.toString())), leftLines = prettyPrintBinaryTree(node.leftChild), rightLines = prettyPrintBinaryTree(node.rightChild);
    return thisLine.concat(nest(1, leftLines.concat(rightLines)));
}
const output = prettyPrintBinaryTree(myTree)
    .map(aLine => new Array(aLine[0] + 1).join('-') + aLine[1])
    .reduce((a, b) => a + '\n' + b, '').trim();
console.log(output);
/**
 * Exercise 7:
 *  implement prettyPrintNaryTree, which takes a NaryTree as input
 *  and returns a list of the type expected by your nest function
 */
class NaryTree {
    constructor(data, children = new List(undefined)) {
        this.data = data;
        this.children = children;
    }
}
// Example tree for you to print:
let naryTree = new NaryTree(1, new List([
    new NaryTree(2),
    new NaryTree(3, new List([
        new NaryTree(4),
    ])),
    new NaryTree(5)
]));
// implement: function prettyPrintNaryTree(...)
function prettyPrintNaryTree(node) {
    return node ?
        lineToList(line(node.data.toString()))
            .concat(node.children.map(prettyPrintNaryTree)
            .map(el => nest(1, el))
            .reduce((acc, el) => acc.concat(el), new List([])))
        : new List([]);
}
// *** uncomment the following code once you have implemented prettyPrintNaryTree (above) ***
const outputNaryTree = prettyPrintNaryTree(naryTree)
    .map(aLine => new Array(aLine[0] + 1).join('-') + aLine[1])
    .reduce((a, b) => a + '\n' + b, '').trim();
console.log(outputNaryTree);
const jsonPrettyToDoc = json => {
    if (Array.isArray(json)) {
        return lineToList(line("["))
            .concat(nest(1, json.map((el, i) => i !== json.length - 1 ?
            jsonPrettyToDoc(el)
                .concat(lineToList(line(",")))
            : jsonPrettyToDoc(el))
            .reduce((accum, el) => accum.concat(el))))
            .concat(lineToList(line("]")));
    }
    else if (typeof json === 'object' && json !== null) {
        return lineToList(line("{"))
            .concat(nest(1, Object.keys(json)
            .map(key => key !== Object.keys(json)[Object.keys(json).length - 1] ?
            lineToList(line(key + ":"))
                .concat(jsonPrettyToDoc(json[key]))
                .concat(lineToList(line(",")))
            : lineToList(line(key + ":"))
                .concat(jsonPrettyToDoc(json[key])))
            .reduce((acc, el) => acc.concat(el), new List([]))))
            .concat(lineToList(line("}")));
    }
    else if (typeof json === 'string') {
        return lineToList(line(json));
    }
    else if (typeof json === 'number') {
        return lineToList(line(json.toString()));
    }
    else if (typeof json === 'boolean') {
        return lineToList(line(json.toString()));
    }
    else if (json === null) {
        return lineToList(line("null"));
    }
    // Default case to fall back on.
    return new List([]);
};
// *** uncomment the following code once you are ready to test your implemented jsonPrettyToDoc ***
const json = {
    unit: "FIT2102",
    year: 2021,
    semester: "S2",
    active: true,
    assessments: { "week1": null, "week2": "Tutorial 1 Exercise", "week3": "Tutorial 2 Exercise" },
    languages: ["Javascript", "Typescript", "Haskell", "Minizinc"]
};
function lineIndented(aLine) {
    return new Array(aLine[0] + 1).join('    ') + aLine[1];
}
function appendLine(acc, nextLine) {
    return nextLine.slice(-1) === "," ? acc + nextLine.trim() :
        acc.slice(-1) === ":" ? acc + " " + nextLine.trim() :
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
//# sourceMappingURL=main.js.map