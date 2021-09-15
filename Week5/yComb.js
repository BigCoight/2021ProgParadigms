// const Y = f => {
// 	f((x) => f((x) => x(x))
// }

// const fac = Y(f => n => n>1 ? n * f(n-1) : 1);

// console.log(fac(3)); // Prints 6
// console.log(fac(5)); // Prints 120

import { from } from "rxjs";

import { map, filter } from "rxjs/operators";

from([1, 3, 4]).pipe(map((x) => x + 1),filter((x) => x % 2 === 0)).subscribe(console.log);