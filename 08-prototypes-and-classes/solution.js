// ============================================================
// 08 — PROTOTYPES AND CLASSES (solution)
// ============================================================

function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

const genericAnimal = new Animal("Creature");
console.log(genericAnimal.speak());
console.log(genericAnimal.__proto__ === Animal.prototype);
console.log(Object.getPrototypeOf(genericAnimal) === Animal.prototype);

class Vehicle {
  constructor(make) {
    this.make = make;
  }
  describe() {
    return `A ${this.make} vehicle`;
  }
}

const car = new Vehicle("Toyota");
console.log(car.describe());
console.log(typeof Vehicle);
console.log(car.describe === Vehicle.prototype.describe);

class Car extends Vehicle {
  constructor(make, doors) {
    super(make);
    this.doors = doors;
  }
  describe() {
    return `${super.describe()} with ${this.doors} doors`;
  }
}

const sedan = new Car("Honda", 4);
console.log(sedan.describe());
console.log(sedan instanceof Car);
console.log(sedan instanceof Vehicle);

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
console.log(Point.distance(p1, p2));

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
console.log(temp.fahrenheit);
temp.fahrenheit = 32;
console.log(temp._celsius);

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

// TODO 1
function Counter(start) {
  this.count = start;
}
Counter.prototype.increment = function () {
  this.count += 1;
  return this.count;
};

const c1 = new Counter(0);
const c2 = new Counter(100);
console.log(c1.increment()); // 1
console.log(c2.increment()); // 101
console.log(c1.increment === c2.increment); // true

// TODO 2 + TODO 3
class Rectangle extends Shape {
  constructor(width, height) {
    super("Rectangle");
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
  static square(size) {
    return new Rectangle(size, size);
  }
}

const rect = new Rectangle(4, 5);
console.log(rect.describe()); // "Rectangle has area 20"
console.log(rect instanceof Shape); // true

const sq = Rectangle.square(3);
console.log(sq.area()); // 9

// TODO 4
class Circle extends Shape {
  constructor(radius) {
    super("Circle");
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
  get diameter() {
    return this.radius * 2;
  }
  set diameter(value) {
    this.radius = value / 2;
  }
}

const circle = new Circle(2);
console.log(circle.area().toFixed(2)); // "12.57"
console.log(circle.diameter); // 4
circle.diameter = 10;
console.log(circle.area().toFixed(2)); // "78.54"

if (typeof document !== "undefined") {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "prototypes-and-classes lesson running — open the console to see the order things log in";
  }
}
