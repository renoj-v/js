// ============================================================
// 08 — PROTOTYPES AND CLASSES
// ============================================================
//
// Every JS object has a hidden link to another object — its
// PROTOTYPE. When you read a property that isn't found on the
// object itself, JS walks up the prototype chain looking for it.
// `class` syntax is mostly sugar over this same prototype system —
// it doesn't introduce a new inheritance model, just a nicer way
// to write it.

// --- read-through example: the prototype chain, the old way ---

function Animal(name) {
  this.name = name;
}
// Methods go on the PROTOTYPE, not on each instance — every Animal
// shares the same `speak` function instead of getting its own copy.
Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

const genericAnimal = new Animal("Creature");
console.log(genericAnimal.speak()); // "Creature makes a sound"
console.log(genericAnimal.__proto__ === Animal.prototype); // true
console.log(Object.getPrototypeOf(genericAnimal) === Animal.prototype); // true (preferred over __proto__)

// --- read-through example: class syntax (same thing, nicer syntax) ---

class Vehicle {
  constructor(make) {
    this.make = make;
  }
  describe() {
    return `A ${this.make} vehicle`;
  }
}

const car = new Vehicle("Toyota");
console.log(car.describe()); // "A Toyota vehicle"
console.log(typeof Vehicle); // "function" — classes ARE functions under the hood
console.log(car.describe === Vehicle.prototype.describe); // true — one shared method, not per-instance

// --- read-through example: inheritance with extends/super ---

class Car extends Vehicle {
  constructor(make, doors) {
    super(make); // must call super() before using `this` in a subclass
    this.doors = doors;
  }
  describe() {
    // call the parent version, then extend it
    return `${super.describe()} with ${this.doors} doors`;
  }
}

const sedan = new Car("Honda", 4);
console.log(sedan.describe()); // "A Honda vehicle with 4 doors"
console.log(sedan instanceof Car); // true
console.log(sedan instanceof Vehicle); // true — instanceof walks the whole chain

// --- read-through example: static methods ---
//
// Static members live on the CLASS itself, not on instances —
// useful for factory functions or helpers that don't need `this`
// to be a particular instance.

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static origin() {
    return new Point(0, 0);
  }
  static distance(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }
}

const p1 = Point.origin();
const p2 = new Point(3, 4);
console.log(Point.distance(p1, p2)); // 5
// console.log(p1.distance); // undefined — statics aren't on instances

// --- read-through example: getters and setters ---
//
// Getters/setters look like plain properties from the outside but
// run code underneath — handy for validation or derived values.

class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }
  get fahrenheit() {
    return this._celsius * 9 / 5 + 32;
  }
  set fahrenheit(f) {
    this._celsius = (f - 32) * 5 / 9;
  }
}

const temp = new Temperature(20);
console.log(temp.fahrenheit); // 68 — read like a property, runs like a method
temp.fahrenheit = 32;
console.log(temp._celsius); // 0

// --- shared classes for the TODOs below ---

class Shape {
  constructor(name) {
    this.name = name;
  }
  area() {
    return 0;
  }
  describe() {
    return `${this.name} has area ${this.area()}`;
  }
}

// --- TODO 1 ---
// Write a constructor function `Counter` (NOT a class — practice
// the prototype-based style) that takes a `start` value and stores
// it as `this.count`. Add an `increment` method on
// `Counter.prototype` that increases `this.count` by 1 and returns
// the new count. Every Counter instance should share the SAME
// increment function (check with `c1.increment === c2.increment`).

function Counter(start) {

}


const c1 = new Counter(0);
const c2 = new Counter(100);
console.log(c1.increment()); // 1
console.log(c2.increment()); // 101
console.log(c1.increment === c2.increment); // true — shared via the prototype

// --- TODO 2 ---
// Write a class `Rectangle` extending `Shape` whose constructor
// takes `width` and `height`, calls `super` with the name
// "Rectangle", and stores width/height. Override `area()` to return
// width * height. Don't override `describe()` — it should keep
// working via inheritance, calling YOUR area().

class Rectangle extends Shape {

}

const rect = new Rectangle(4, 5);
console.log(rect.describe()); // "Rectangle has area 20"
console.log(rect instanceof Shape); // true

// --- TODO 3 ---
// Add a static method `Rectangle.square(size)` (edit the Rectangle
// class above) that returns a new Rectangle with width and height
// both equal to `size`.

const sq = Rectangle.square(3);
console.log(sq.area()); // 9

// --- TODO 4 ---
// Write a class `Circle` extending `Shape` whose constructor takes
// `radius`, calls `super` with the name "Circle", and stores radius.
// Override `area()` to return Math.PI * radius ** 2. Then add a
// getter `diameter` that returns radius * 2, and a setter
// `diameter` that updates `radius` accordingly (radius = value / 2).

class Circle extends Shape {

}

const circle = new Circle(2);
console.log(circle.area().toFixed(2)); // "12.57"
console.log(circle.diameter); // 4
circle.diameter = 10;
console.log(circle.area().toFixed(2)); // "78.54" — radius updated to 5 via the setter

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "prototypes-and-classes lesson running — open the console to see the order things log in";
  }
}
