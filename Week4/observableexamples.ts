/*
Complete the following table when you submit this file:

Surname     | Firstname        | email    | Contribution% | Any issues?
=======================================================================
Zulli       |Anthony Nicholas  | azul0005 | 25%           |
Morgante    |Giacomo           | gmor0008 | 25%           |
Lai         |Glorison          | glai0004 | 25%           |
Ho          |Joshua            | jhoo0017 | 25%           |

complete Worksheet 4/5 by entering code in the places marked below...
*/

import { interval, fromEvent, merge } from 'rxjs'
import { map, filter, scan} from 'rxjs/operators'

// Simple demonstration 
// ===========================================================================================
// ===========================================================================================
/**
 * an example of traditional event driven programming style - this is what we are
 * replacing with observable.
 * The following adds a listener for the mouse event
 * handler, sets p and adds or removes a highlight depending on x position
 */
function mousePosEvents() {
  const pos = document.getElementById("pos")!;

  document.addEventListener("mousemove", ({ clientX, clientY }) => {
    const p = clientX + ', ' + clientY;
    pos.innerHTML = p;
    if (clientX > 400) {
      pos.classList.add('highlight');
    } else {
      pos.classList.remove('highlight');
    }
  });
}

/**
 * constructs an Observable event stream with three branches:
 *   Observable<x,y>
 *    |- set <p>
 *    |- add highlight
 *    |- remove highlight
 */
function mousePosObservable() {
  const
    pos = document.getElementById("pos")!,
    o = fromEvent<MouseEvent>(document, "mousemove")
        .pipe(map(({ clientX, clientY }) => ({ x: clientX, y: clientY })))

  o.pipe(map(({ x, y }) => `${x},${y}`))
    .subscribe((s : string) => pos.innerHTML = s);

  o.pipe(filter(({ x }) => x > 400))
    .subscribe(_ => pos.classList.add('highlight'));

  o.pipe(filter(({ x }) => x <= 400))
    .subscribe(({x,y}) => { 
      pos.classList.remove('highlight')
    });
}

// Exercise 5
// ===========================================================================================
// ===========================================================================================
function piApproximation() {
  // a simple, seedable, pseudo-random number generator
  class RNG {
    // LCG using GCC's constants
    m = 0x80000000// 2**31
    a = 1103515245
    c = 12345
    state:number
    constructor(seed) {
      this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
    }
    nextInt() {
      this.state = (this.a * this.state + this.c) % this.m;
      return this.state;
    }
    nextFloat() {
      // returns in range [0,1]
      return this.nextInt() / (this.m - 1);
    }
  }

  const
    resultInPage = document.getElementById("value_piApproximation"),
    canvas = document.getElementById("piApproximationVis");

  if (!resultInPage || !canvas) {
    console.log("Not on the observableexamples.html page")
    return;
  }

  // Some handy types for passing data around
  type Colour = "red" | "green";
  type Dot = { x: number, y: number, colour?: Colour };
  interface Data {
    point?: Dot,
    insideCount: number,
    totalCount: number
  }

  // an instance of the Random Number Generator with a specific seed
  const rng = new RNG(20)
  // return a random number in the range [-1,1]
  const nextRandom = ()=>rng.nextFloat()*2 - 1
  // you'll need the circleDiameter to scale the dots to fit the canvas
  const circleRadius = Number(canvas.getAttribute("width"))/2
  // test if a point is inside a unit circle
  const inCircle = ({ x, y }: Dot) => (x * x) + (y * y) <= 1;
  // you'll also need to set innerText with the pi approximation
  resultInPage.innerText = "...Update this text to show the Pi approximation...";

  // Your code starts here!
  // =========================================================================================
  function createDot(data: Data) {
    if (!canvas) throw "Couldn't get canvas element!";
    const dot = document.createElementNS(canvas.namespaceURI, "circle");
    // Set circle properties
    const x = (data.point.x + 1) * circleRadius;
    const y = (data.point.y + 1) * circleRadius;
    dot.setAttribute("cx", String(x));
    dot.setAttribute("cy", String(y));
    dot.setAttribute("r", "5");
    dot.setAttribute("fill", inCircle(data.point) ? "green": "red" );// All points red

    // Add the dot to the canvas
    canvas.appendChild(dot);

    resultInPage.innerText = `${(4*data.insideCount/data.totalCount)}`;
  }

  // A stream of random numbers
  const randomNumberStream = interval(50).pipe(
                                map(_ => <Dot>{x: nextRandom(), y: nextRandom()}), 
                                scan((data: Data, dot: Dot) => 
                                    <Data> {
                                        point: dot, 
                                        insideCount: data.insideCount + (inCircle(dot) ? 1 : 0), 
                                        totalCount: data.totalCount + 1
                                    }, 
                                    {insideCount: 0, totalCount: 0}
                                )
                            )
  randomNumberStream.subscribe(createDot);
}

// Exercise 6
// ===========================================================================================
// ===========================================================================================
/**
 * animates an SVG rectangle, passing a continuation to the built-in HTML5 setInterval function.
 * a rectangle smoothly moves to the right for 1 second.
 */
function animatedRectTimer() {
  // get the svg canvas element
  const svg = document.getElementById("animatedRect")!;
  // create the rect
  const rect = document.createElementNS(svg.namespaceURI,'rect')
  Object.entries({
    x: 100, y: 70,
    width: 120, height: 80,
    fill: '#95B3D7',
  }).forEach(([key,val])=>rect.setAttribute(key,String(val)))
  svg.appendChild(rect);

  const animate = setInterval(() => rect.setAttribute('x', String(1 + Number(rect.getAttribute('x')))), 10);
  const timer = setInterval(() => {
    clearInterval(animate);
    clearInterval(timer);
  }, 1000);
}

/**
 * Demonstrates the interval method
 * You want to choose an interval so the rectangle animates smoothly
 * It terminates after 1 second (1000 milliseconds)
 */
function animatedRect() {
  // get the svg canvas element
  const svg = document.getElementById("animatedRect")!;
  // create the rect
  const rect = document.createElementNS(svg.namespaceURI,'rect')
  Object.entries({
    x: 100, y: 70,
    width: 120, height: 80,
    fill: '#95B3D7',
  }).forEach(([key,val])=>rect.setAttribute(key,String(val)))
  svg.appendChild(rect);

  function moveRect(time: number) {
    time < 1000 ? 
    rect.setAttribute('x', String(1 + Number(rect.getAttribute('x')))) : animateStream.unsubscribe();
  }

  const intervalVal = 10;
  const animateStream = interval(intervalVal).pipe(scan(acc => acc + intervalVal, 0)).subscribe(moveRect);
}

// Exercise 7
// ===========================================================================================
// ===========================================================================================
/**
 * Create and control a rectangle using the keyboard! Use only one subscribe call and not the interval method
 * If statements  
 */
function keyboardControl() {
  // get the svg canvas element
  const svg = document.getElementById("moveableRect")!;

  const rect = document.createElementNS(svg.namespaceURI,'rect')
  Object.entries({
    x: 100, y: 70,
    width: 120, height: 80,
    fill: '#95B3D7',
  }).forEach(([key,val])=>rect.setAttribute(key,String(val)))
  svg.appendChild(rect);

  type Dot = { x: number, y: number};

  function moveRect({x,y}: Dot) {
    rect.setAttribute('x', String(x + Number(rect.getAttribute('x'))))
    rect.setAttribute('y', String(y + Number(rect.getAttribute('y'))))
  }
  
  const animateStream = fromEvent<KeyboardEvent>(document, "keydown");
  const downListener = animateStream.pipe(filter((keypress) => keypress.key === "ArrowDown" || keypress.key ==="s"), map(_ => <Dot>{x: 0, y: 1}));
  const upListener = animateStream.pipe(filter((keypress) => keypress.key === "ArrowUp" || keypress.key ==="w"), map(_ => <Dot>{x: 0, y: -1}));
  const leftListener = animateStream.pipe(filter((keypress) => keypress.key === "ArrowLeft"|| keypress.key ==="a"), map(_ => <Dot>{x: -1, y: 0}));
  const rightListener = animateStream.pipe(filter((keypress) => keypress.key === "ArrowRight"|| keypress.key ==="d"), map(_ => <Dot>{x: 1, y: 0}));
  const keyStream = merge(downListener, upListener, leftListener, rightListener);
  keyStream.subscribe(moveRect);
}

// Running the code
// ===========================================================================================
// ===========================================================================================
document.addEventListener("DOMContentLoaded", function(event) {
  piApproximation();

  // compare mousePosEvents and mousePosObservable for equivalent implementations
  // of mouse handling with events and then with Observable, respectively.
  //mousePosEvents();
  mousePosObservable();

  //animatedRectTimer()
  // replace the above call with the following once you have implemented it:
  animatedRect()
  keyboardControl();

});
