**[<< Go To Home](#what-are-magic-methods-tell-me-3-magic-methods)**
<div align="center">
    <h1><span style="color:#f39c12;">JavaScript</span> Concept You Must<span style="color:#f39c12;">Know</span></h1>
</div>

# Table of Content

- [Introduction to JavaScript](#introduction-to-javascript)

  - [History and Purpose of JavaScript](#history-and-purpose-of-javascript)
  - [JavaScript in Web Development](#javascript-in-web-development)

- [Variables and Data Types](#variables-and-data-types)

  - [Declaring Variables](#declaring-variables)
  - [Primitive Types](#primitive-types)
  - [Value Types vs Reference Types](#value-types-vs-reference-types)
  - [Type Coercion: Implicit vs Explicit](#type-coercion-implicit-vs-explicit)
  - [Nominal, Structural, and Duck Typing](#nominal-structural-and-duck-typing)

- [Operators](#operators)

  - [Arithmetic Operators](#arithmetic-operators)
  - [Comparison Operators (`==` vs `===` vs `typeof`)](#comparison-operators-vs-vs-typeof)
  - [Bitwise Operators](#bitwise-operators)
  - [Logical Operators](#logical-operators)

- [Expression vs Statement](#expression-vs-statement)

- [Control Flow](#control-flow)

  - [If-Else Statements](#if-else-statements)
  - [Switch Statements](#switch-statements)
  - [Looping Statements (For, While, Do-While)](#looping-statements-for-while-do-while)

- [Functions](#functions)

  - [Function Declarations and Expressions](#function-declarations-and-expressions)
  - [Function Scope, Block Scope, and Lexical Scope](#function-scope-block-scope-and-lexical-scope)
  - [IIFE (Immediately Invoked Function Expressions)](#iife-immediately-invoked-function-expressions)
  - [High-Order Functions](#high-order-functions)
  - [Recursion](#recursion)

- [Scope and Closures](#scope-and-closures)

  - [Variable Scope (Global, Local)](#variable-scope-global-local)
  - [Hoisting in JavaScript](#hoisting-in-javascript)
  - [Closures and Practical Use Cases](#closures-and-practical-use-cases)

- [Call Stack and Execution Context](#call-stack-and-execution-context)

  - [Understanding the Call Stack](#understanding-the-call-stack)
  - [Message Queue and Event Loop](#message-queue-and-event-loop)
  - [Microtasks and Macrotasks](#microtasks-and-macrotasks)

- [Asynchronous JavaScript](#asynchronous-javascript)

  - [`setTimeout`, `setInterval`, and `requestAnimationFrame`](#settimeout-setinterval-and-requestanimationframe)
  - [Promises and Fetch API](#promises-and-fetch-api)
  - [Async/Await](#asyncawait)
  - [Callback Functions and Callback Hell](#callback-functions-and-callback-hell)

- [Objects and Arrays](#objects-and-arrays)

  - [Object Literals and Properties](#object-literals-and-properties)
  - [Methods and Prototype Inheritance](#methods-and-prototype-inheritance)
  - [`Object.create` and `Object.assign`](#objectcreate-and-objectassign)
  - [Arrays: Creating, Accessing, and Array Methods (`map`, `reduce`, `filter`)](#arrays-creating-accessing-and-array-methods-map-reduce-filter)

- [DOM and Layout Trees](#dom-and-layout-trees)

  - [DOM Manipulation: Selecting and Modifying Elements](#dom-manipulation-selecting-and-modifying-elements)
  - [Layout Trees and Reflow](#layout-trees-and-reflow)
  - [Event Propagation: Bubbling and Capturing](#event-propagation-bubbling-and-capturing)

- [ES6 and Beyond](#es6-and-beyond)

  - [Arrow Functions](#arrow-functions)
  - [Template Literals](#template-literals)
  - [Destructuring Assignments](#destructuring-assignments)
  - [Modules (Import and Export Syntax)](#modules-import-and-export-syntax)

- [Object-Oriented Programming (OOP)](#object-oriented-programming-oop)

  - [Factories and Classes](#factories-and-classes)
  - [Class Definitions and Instances](#class-definitions-and-instances)
  - [Prototype Inheritance and Prototype Chain](#prototype-inheritance-and-prototype-chain)
  - [`this`, `call`, `apply`, and `bind`](#this-call-apply-and-bind)
  - [`new`, Constructor, `instanceof`, and Instances](#new-constructor-instanceof-and-instances)
  - [Inheritance, Polymorphism, and Code Reuse](#inheritance-polymorphism-and-code-reuse)

- [Functional Programming](#functional-programming)

  - [Pure Functions and Side Effects](#pure-functions-and-side-effects)
  - [State Mutation and Event Propagation](#state-mutation-and-event-propagation)
  - [Partial Applications and Currying](#partial-applications-and-currying)
  - [Compose and Pipe](#compose-and-pipe)

- [Data Structures and Algorithms](#data-structures-and-algorithms)

  - [Arrays, Maps, Sets, and Typed Arrays](#arrays-maps-sets-and-typed-arrays)
  - [Array Buffers](#array-buffers)
  - [Collections and Generators](#collections-and-generators)
  - [Expensive Operations and Big O Notation](#expensive-operations-and-big-o-notation)
  - [Algorithms Basics](#algorithms-basics)

- [JavaScript Engines and Performance](#javascript-engines-and-performance)

  - [JavaScript Engines (V8, SpiderMonkey, etc.)](#javascript-engines-v8-spidermonkey-etc)
  - [Performance Optimization Techniques](#performance-optimization-techniques)
  - [Reducing DOM Manipulation](#reducing-dom-manipulation)

- [Error Handling and Debugging](#error-handling-and-debugging)

  - [Error Types and Handling](#error-types-and-handling)
  - [Debugging Techniques and Tools](#debugging-techniques-and-tools)

- [Web Storage](#web-storage)

  - [LocalStorage and SessionStorage](#localstorage-and-sessionstorage)

- [API Integration](#api-integration)

  - [AJAX (Asynchronous JavaScript and XML)](#ajax-asynchronous-javascript-and-xml)
  - [RESTful API Concepts](#restful-api-concepts)
  - [Fetch API](#fetch-api)

- [Design Patterns](#design-patterns)

  - [Singleton Pattern](#singleton-pattern)
  - [Factory Pattern](#factory-pattern)
  - [Observer Pattern](#observer-pattern)

- [Regular Expressions](#regular-expressions)

  - [Pattern Matching and Manipulation](#pattern-matching-and-manipulation)
  - [Regular Expression Methods and Modifiers](#regular-expression-methods-and-modifiers)

- [Event Handling](#event-handling)

  - [Event Listeners and the Event Object](#event-listeners-and-the-event-object)
  - [Event Delegation](#event-delegation)

- [Clean Code and Best Practices](#clean-code-and-best-practices)

  - [Writing Readable and Maintainable Code](#writing-readable-and-maintainable-code)
  - [Reducing Technical Debt](#reducing-technical-debt)
  - [Code Reviews and Refactoring](#code-reviews-and-refactoring)

- [Security Considerations in JavaScript](#security-considerations-in-javascript)

  - [Cross-Site Scripting (XSS)](#cross-site-scripting-xss)
  - [Cross-Site Request Forgery (CSRF)](#cross-site-request-forgery-csrf)

- [Server-Side JavaScript](#server-side-javascript)

  - [Introduction to Node.js](#introduction-to-nodejs)

- [Data Visualization with JavaScript Libraries](#data-visualization-with-javascript-libraries)
  - [D3.js for Data Visualization](#d3js-for-data-visualization)
  - [Chart.js for Creating Charts](#chartjs-for-creating-charts)

---

## Introduction to JavaScript

### Property of Javascript

#### Loosely Typed

JavaScript is a loosely typed language, meaning variables can hold values of any type, and types can change dynamically.

**Example:**

```javascript
let data = 42; // Initially a number
data = 'Hello'; // Now a string
console.log(data); // Output: Hello
```

**Explanation:**

You don't need to declare variable types explicitly. This flexibility allows faster development but requires careful handling to avoid type-related bugs.

---

#### Object-Oriented Programming

Object-Oriented Programming (OOP) organizes code into objects that encapsulate data and behaviors. OOP concepts include Classes, Objects, Inheritance, Encapsulation, Polymorphism, and Abstraction.

**Example: Class and Object**

```javascript
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  getDetails() {
    return `${this.brand} ${this.model}`;
  }
}

const myCar = new Car('Tesla', 'Model S');
console.log(myCar.getDetails()); // Output: Tesla Model S
```

**Benefits of OOP:**

- Reusability through inheritance.
- Encapsulation ensures secure programs by hiding data.
- Code modularity simplifies maintenance and upgrades.
- Promotes scalability and team collaboration.

---

#### Functional Programming

Functional programming treats computation as the evaluation of mathematical functions and avoids changing state or mutable data.

**Example: Pure Function**

```javascript
const add = (a, b) => a + b;
console.log(add(2, 3)); // Output: 5
```

**Explanation:**

The output depends only on the input, ensuring predictable results without side effects.

---

### History and Purpose of JavaScript

### JavaScript in Web Development

---

## Variables and Data Types

### Declaring Variables

### Primitive Types

Primitive types include `number`, `string`, `boolean`, `null`, `undefined`, and `symbol`.

### Value Types vs Reference Types

Value types (e.g., numbers, strings) store data directly, while reference types (e.g., objects) store memory references.

Object destructuring allows you to extract properties from objects and bind them to variables.

**Example:**
(Pass by Reference): Here var obj gets assigned to memory reference of user so, it changes the original value.

```javascript
const user = { name: 'Alice', age: 25 };
const obj = user;
obj.age = 30;
console.log(user); // Output: { name: 'Alice', age: 30 }
```

(Pass by Value): Here a copy gets created due to object destructuring and obj gets assigned to value of user.

```javascript
const user = { name: 'Alice', age: 25 };
const obj = { ...user };
obj.age = 30;
console.log(user); // Output:{ name: 'Alice', age: 25 }
```

**Example:**

```javascript
let a = 10;
let b = a; // Value copy

let obj1 = { key: 'value' };
let obj2 = obj1; // Reference copy
```

### Type Coercion: Implicit vs Explicit

- **Implicit Typing:** Type inferred by the context.
- **Explicit Typing:** Type specified by the developer.
- **Duck Typing:** Objects are compatible if they share behavior.

---

### Nominal, Structural, and Duck Typinga


---

---

## Operators

### Arithmetic Operators

### Comparison Operators (`==` vs `===` vs `typeof`)

- `==`: Compares values with type coercion.
- `===`: Compares values without type coercion.
- `typeof`: Determines the type of a value.

**Example:**

```javascript
console.log(2 == '2'); // Output: true
console.log(2 === '2'); // Output: false
console.log(typeof 42); // Output: number
```

### Bitwise Operators

### Logical Operators

---

## Expression vs Statement

According to the ECMAScript specification, expressions produce a value, and statements are instructions to perform an action, such as variable assignment or control flow. Function declarations are hoisted and can be called before they are defined in the code, while function expressions are not hoisted and must be defined before being invoked.

- **Expression:** Produces a value.

  Example:

  ```javascript
  let x = 10 + 20; // Expression: Produces 30
  ```

- **Statement:** Performs an action.

  Example:

  ```javascript
  if (x > 10) console.log('x is greater than 10'); // Statement
  ```

---

## Control Flow

### If-Else Statements

### Switch Statements

### Looping Statements (For, While, Do-While)

### Functions

### Function Declarations and Expressions

### Function Scope, Block Scope, and Lexical Scope

**Function Scope**: Variables declared with `var` are function-scoped, meaning they are accessible throughout the function where they are defined. This scope isolates variables from being accessed outside of the function where they are declared.

**Example:**

```javascript
function demoVar() {
  if (true) {
    var x = 10;
  }
  console.log(x); // Output: 10
}
```

**Block Scope**: Variables declared with `let` and `const` are block-scoped, meaning they are only accessible within the block where they are defined.

**Example:**

```javascript
function demoLet() {
  if (true) {
    let y = 20;
    const z = 30;
    console.log(y, z); // Output: 20 30
  }
  // console.log(y, z); // ReferenceError
}
```

**Lexical Scope**: Lexical scope means that the scope of a variable is determined by its position in the source code and nested scopes have access to variables from their parent scope.

**Example:**

```javascript
function outer() {
  let a = 5;
  function inner() {
    console.log(a); // Output: 5
  }
  inner();
}
outer();
```

**Closures**: A closure is formed when an inner function "remembers" variables from its outer function even after the outer function has executed.

**Example:**

```javascript
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // Output: 1
console.log(counter()); // Output: 2
```

---

#### Pros and Cons of Closures

**Pros:**

1. Enables data encapsulation and privacy.
2. Maintains state in functions.
3. Avoids global variables.

**Cons:**

1. Overuse can lead to memory leaks.
2. Debugging closures can be tricky.

**What if JavaScript had no closures?**

Without closures, maintaining state and creating private variables would require alternative patterns, such as using objects or classes.

---

#### Advanced Closure Example

**Question:** Evaluate and explain the output.

```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const fn = outer();
fn(); // Output: 1
fn(); // Output: 2
fn(); // Output: 3
```

**Explanation:**

Each invocation of `fn` updates the `count` variable in the closure created by the `outer` function.

---

### IIFE (Immediately Invoked Function Expressions)

### High-Order Functions

### Recursion

---

## Scope and Closures

### Variable Scope (Global, Local)

### Hoisting in JavaScript

### **Hoisting in JavaScript**

**Hoisting** is a JavaScript mechanism where variable and function declarations are moved to the top of their scope during the compile phase. This means variables and functions can be used in code before their declaration without causing a runtime error, though their values might not yet be assigned.

---

#### **Example of Hoisting**

```javascript
console.log(x); // Output: undefined
var x = 5;

sayHello(); // Output: "Hello!"
function sayHello() {
  console.log('Hello!');
}
```

**Explanation:**

1. Variable `x` is hoisted, but only its declaration, not its initialization. Therefore, `console.log(x)` outputs `undefined`.
2. The function `sayHello` is hoisted entirely, so it can be called before its definition.

#### Temporal Dead Zone

The Temporal Dead Zone (TDZ) refers to the time between entering the scope of a variable declared with `let` or `const` and its initialization.

**Example:**

```javascript
console.log(a); // ReferenceError
let a = 10;
```

#### **Key Notes:**

- **Declarations** are hoisted, but **initializations/assignments** are not.
- Function **declarations** are hoisted completely, but function **expressions** are not.
  ```javascript
  console.log(greet); // undefined
  var greet = function () {
    console.log('Hi!');
  };
  ```

#### **Example: Hoisting with Variables**

```javascript
console.log(a); // Output: undefined
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
```

- `var` is hoisted but initialized as `undefined`.
- `let` and `const` are hoisted but are not initialized, leading to a **Temporal Dead Zone** until their declaration.

### **Expected Outputs in Sample Programs**

1. **Simple Example:**
   ```javascript
   console.log(a); // undefined
   var a = 10;
   console.log(a); // 10
   ```
2. **Order of Execution:**
   ```javascript
   console.log('Second greetings');
   console.log('First greetings');
   console.log('First greetings');
   ```
3. **Variable Hoisting:**

   ```javascript
   let variable_1 = 35;
   var variable_2 = 10;
   const variable_3 = 15;

   console.log(variable_1); // 35
   console.log(variable_2); // 10
   console.log(variable_3); // 15
   console.log(variable_4); // ReferenceError: variable_4 is not defined
   ```

### Closures and Practical Use Cases

---

## Call Stack and Execution Context

The call stack manages execution contexts in JavaScript. The call stack is a mechanism that the JavaScript interpreter uses to keep track of function execution within a program. In JavaScript, functions are executed in the order they are called. The call stack follows the Last In, First Out (LIFO) principle, meaning that the last function pushed onto the stack is the first one to be executed.

According to the ECMAScript specification, the call stack is defined as part of the execution context. Whenever a function is called, a new execution context is created and placed at the top of the stack. Once the function completes, its execution context is removed from the stack, and control returns to the previous context. This helps manage synchronous code execution, as each function call must complete before the next one can begin.

**Example:**

```javascript
function first() {
  second();
}
function second() {
  console.log('In second function');
}
first(); // Output: In second function
```

### Understanding the Call Stack

### Message Queue and Event Loop

The Event Loop is a critical part of JavaScript’s concurrency model, ensuring non-blocking behavior by processing tasks in an asynchronous manner.
JavaScript uses the **Event Loop** to handle asynchronous operations.

Example:

```javascript
console.log('Start');
setTimeout(() => console.log('Async Task'), 0);
console.log('End');
// Output: Start, End, Async Task
```

---

### Microtasks and Macrotasks

### Context

In JavaScript, **context** refers to the value of `this` within a function or object. It determines which object or value `this` is referring to when the code is executed. Understanding context is key to how JavaScript handles object methods, function invocations, and event handling.

#### Types of Context in JavaScript:

1. **Global Context (or Window Context in browsers):**

   - When JavaScript is executed outside of any function or object, `this` refers to the global object.
   - In the browser, the global object is `window`.
   - In Node.js, the global object is `global`.

   Example:

   ```javascript
   console.log(this); // In browsers, this will log the window object
   ```

2. **Function Context:**

   - Inside a function, the value of `this` is determined by how the function is called.
   - If the function is called as a method of an object, `this` refers to the object.
   - If the function is called without an object (i.e., as a regular function call), `this` refers to the global object in non-strict mode, or `undefined` in strict mode.

   Example:

   ```javascript
   function greet() {
     console.log(this);
   }
   greet(); // In non-strict mode, this will refer to the global object (window in browsers)

   const person = {
     name: 'Alice',
     greet: function () {
       console.log(this.name);
     },
   };
   person.greet(); // this refers to the 'person' object, so it will log "Alice"
   ```

3. **Object Context:**

   - When a method is invoked as part of an object (e.g., `obj.method()`), `this` refers to the object the method is a part of.

   Example:

   ```javascript
   const obj = {
     name: 'Bob',
     greet: function () {
       console.log(this.name);
     },
   };
   obj.greet(); // "Bob" because 'this' refers to 'obj'
   ```

4. **Class Context:**

   - In ES6 classes, `this` refers to the instance of the class.

   Example:

   ```javascript
   class Person {
     constructor(name) {
       this.name = name;
     }
     greet() {
       console.log(this.name);
     }
   }
   const person = new Person('Charlie');
   person.greet(); // "Charlie" because 'this' refers to the instance of the class
   ```

5. **Arrow Functions Context:**

   - Arrow functions have **lexical scoping** for `this`, meaning `this` is inherited from the surrounding non-arrow function or context where the arrow function was created.
   - They don't have their own `this` like regular functions do.

   Example:

   ```javascript
   const obj = {
     name: 'David',
     greet: function () {
       const arrowFunc = () => {
         console.log(this.name);
       };
       arrowFunc();
     },
   };
   obj.greet(); // "David", because 'this' inside the arrow function refers to 'obj'
   ```

6. **Explicit Binding (Using `.call()`, `.apply()`, or `.bind()`):**

   - JavaScript provides methods to explicitly set the value of `this` using `.call()`, `.apply()`, or `.bind()`.

   Example:

   ```javascript
   function greet() {
     console.log(this.name);
   }

   const person = { name: 'Emma' };
   greet.call(person); // "Emma" because we explicitly set 'this' to 'person'
   ```

#### Summary:

- **Global Context:** `this` refers to the global object (`window` in browsers).
- **Function Context:** `this` depends on how the function is called.
- **Object Context:** `this` refers to the object the method is called on.
- **Class Context:** `this` refers to the instance of the class.
- **Arrow Function Context:** `this` is inherited from the surrounding context.
- **Explicit Binding:** `.call()`, `.apply()`, or `.bind()` can be used to explicitly set `this`.

**[⬆ Back to Top](#table-of-content)**

---

## Asynchronous JavaScript

### `setTimeout`, `setInterval`, and `requestAnimationFrame`

1. **setTimeout:** Runs a function after a delay.
   ```javascript
   setTimeout(() => console.log('After 1 second'), 1000);
   ```
2. **setInterval:** Repeats execution at fixed intervals.
   ```javascript
   setInterval(() => console.log('Every second'), 1000);
   ```
3. **requestAnimationFrame:** Optimized for animations.
   ```javascript
   const animate = () => {
     console.log('Animating');
     requestAnimationFrame(animate);
   };
   requestAnimationFrame(animate);
   ```

---

### Promises and Fetch API

### Async/Await

### Callback Functions and Callback Hell

---

## Objects and Arrays

### Object Literals and Properties

### Methods and Prototype Inheritance

### `Object.create` and `Object.assign`

### Arrays: Creating, Accessing, and Array Methods (`map`, `reduce`, `filter`)

---

## DOM and Layout Trees

### DOM Manipulation: Selecting and Modifying Elements

### Layout Trees and Reflow

### Event Propagation: Bubbling and Capturing

---

## ES6 and Beyond

### Arrow Functions

### Template Literals

### Destructuring Assignments

### Modules (Import and Export Syntax)

---

## Object-Oriented Programming (OOP)

### Factories and Classes

### Class Definitions and Instances

### Prototype Inheritance and Prototype Chain

### `this`, `call`, `apply`, and `bind`

### `new`, Constructor, `instanceof`, and Instances

### Inheritance, Polymorphism, and Code Reuse

---

## Functional Programming

### Pure Functions and Side Effects

### State Mutation and Event Propagation

### Partial Applications and Currying

### Compose and Pipe

---

## Data Structures and Algorithms

### Arrays, Maps, Sets, and Typed Arrays

### Array Buffers

### Collections and Generators

### Expensive Operations and Big O Notation

### Algorithms Basics

---

## JavaScript Engines and Performance

### JavaScript Engines (V8, SpiderMonkey, etc.)

### Performance Optimization Techniques

### Reducing DOM Manipulation

---

## Error Handling and Debugging

### Error Types and Handling

### Debugging Techniques and Tools

---

## Web Storage

### LocalStorage and SessionStorage

---

## API Integration

### AJAX (Asynchronous JavaScript and XML)

### RESTful API Concepts

### Fetch API

---

## Design Patterns

### Singleton Pattern

### Factory Pattern

### Observer Pattern

---

## Regular Expressions

### Pattern Matching and Manipulation

### Regular Expression Methods and Modifiers

---

## Event Handling

### Event Listeners and the Event Object

### Event Delegation

---

## Clean Code and Best Practices

### Writing Readable and Maintainable Code

### Reducing Technical Debt

### Code Reviews and Refactoring

---

## Security Considerations in JavaScript

### Cross-Site Scripting (XSS)

### Cross-Site Request Forgery (CSRF)

---

## Server-Side JavaScript

### Introduction to Node.js

---

## Data Visualization with JavaScript Libraries

### D3.js for Data Visualization

### Chart.js for Creating Charts

**[⬆ Back to Top](#table-of-content)**

---


## Window Object in JavaScript

The `window` object in JavaScript represents the global execution context in web browsers. It is the top-level object for interacting with the browser and provides numerous properties, methods, and events.

### Instance Properties

The `window` object exposes many properties that give insights into the browser and the environment. These properties can be used to manipulate or retrieve information about the browser state.

**Example: Accessing a property**

```javascript
console.log(window.location.href); // Outputs the current URL of the page
```

**Explanation:**

The `location` property is an object that contains information about the current URL. You can use it to navigate to a new URL, reload the page, or retrieve URL components.

### Instance Methods

The `window` object provides several methods for interacting with the browser. These methods allow tasks such as displaying dialogs, controlling timers, or navigating through browsing history.

**Example: Using `alert` method**

```javascript
window.alert('Hello, World!'); // Displays an alert dialog with the message
```

**Example: Using `setTimeout` method**

```javascript
window.setTimeout(function () {
  console.log('This will execute after 2 seconds');
}, 2000);
```

**Explanation:**

- `alert` displays a modal dialog with a specified message.
- `setTimeout` schedules a function to execute after a specified number of milliseconds.

### Events

The `window` object has numerous events that allow interaction with user actions or browser state changes. These events can be used to enhance the user experience and respond dynamically to changes.

**Example: Listening to a custom event**

```javascript
window.addEventListener('click', function () {
  console.log('Window clicked!');
});
```

#### Types of Events in `window`

1. **Load Event**

   - Triggered when the page and all its resources (images, scripts, etc.) are fully loaded.
   - **Property:** `onload`

   **Example:**

   ```javascript
   window.onload = function () {
     console.log('Page fully loaded');
   };
   ```

2. **Resize Event**

   - Triggered when the browser window is resized.
   - **Property:** `onresize`

   **Example:**

   ```javascript
   window.onresize = function () {
     console.log(
       'Window resized to',
       window.innerWidth,
       'x',
       window.innerHeight
     );
   };
   ```

3. **Scroll Event**

   - Triggered when the user scrolls the page.
   - **Property:** `onscroll`

   **Example:**

   ```javascript
   window.onscroll = function () {
     console.log('Page scrolled to', window.scrollY);
   };
   ```

4. **Error Event**

   - Triggered when a JavaScript error occurs.
   - **Property:** `onerror`

   **Example:**

   ```javascript
   window.onerror = function (message, source, lineno, colno, error) {
     console.error(`Error: ${message} at ${source}:${lineno}:${colno}`);
   };
   ```

5. **BeforeUnload Event**

   - Triggered when the user is about to leave the page.
   - **Property:** `onbeforeunload`

   **Example:**

   ```javascript
   window.onbeforeunload = function () {
     return 'Are you sure you want to leave this page?';
   };
   ```

### Inheritance

The `window` object is the global object in browsers and inherits from the `Object` prototype. Most global variables and functions automatically become properties of the `window` object.

**Example:**

```javascript
console.log(window instanceof Object); // true
```

**Explanation:**

Other objects like `document`, `navigator`, and `history` are properties of the `window` object. This hierarchical structure enables easy access to browser functionality.

---
**[⬆ Back to Top](#table-of-content)**

<!-- need to manage everything below this -->



---

#### WeakSet and WeakMap

`WeakSet` and `WeakMap` hold weak references, allowing objects to be garbage-collected when not referenced elsewhere.

**Example: WeakMap**

```javascript
let obj = {};
let weakMap = new WeakMap();
weakMap.set(obj, 'value');

console.log(weakMap.get(obj)); // Output: value
```

---

#### Generator Functions

Generator functions allow pausing and resuming execution using the `yield` keyword.

**Example:**

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();
console.log(gen.next().value); // Output: 1
console.log(gen.next().value); // Output: 2
```

---

#### Promises

Promises handle asynchronous operations and avoid callback hell.

**Example:**

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Success!'), 1000);
});

promise.then(console.log); // Output: Success! (after 1 second)
```

---

#### Spread Operator

The spread operator (`...`) allows expanding iterable elements.

**Example:**

```javascript
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];
console.log(newArr); // Output: [1, 2, 3, 4, 5]
```

---

#### Rest Parameter

The rest parameter gathers remaining elements into an array.

**Example:**

```javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3)); // Output: 6
```

---

#### `call`, `apply`, and `bind` Methods

These methods control the `this` context in function invocation.

**Example:**

```javascript
const obj = { x: 42 };
function showX() {
  console.log(this.x);
}

showX.call(obj); // Output: 42
```

---

### **IIFE, Modules, and Namespaces**

- **IIFE (Immediately Invoked Function Expression):** Runs immediately after declaration.

  Example:

  ```javascript
  (function () {
    console.log('IIFE executed!');
  })();
  ```

- **Modules:** Used to organize code in reusable pieces.

  Example:

  ```javascript
  // module.js
  export const greet = () => console.log('Hello');

  // main.js
  import { greet } from './module.js';
  greet(); // Output: Hello
  ```

- **Namespaces:** Avoids global variable conflicts.

  Example:

  ```javascript
  const MyApp = {
    utils: {
      log: () => console.log('Logging from MyApp'),
    },
  };
  MyApp.utils.log();
  ```

---

### **JavaScript Engines**

Engines like **V8** (Chrome) convert JavaScript code into machine code for execution.

---

### **DOM and Layout Trees**

The **DOM (Document Object Model)** represents the HTML structure. The **layout tree** applies styles for rendering.

---

### **Factories and Classes**

- **Factory Function:** Returns objects.

  Example:

  ```javascript
  const createUser = (name) => ({ name });
  console.log(createUser('John')); // { name: "John" }
  ```

- **Class:** ES6 syntax for object creation.

  ```javascript
  class User {
    constructor(name) {
      this.name = name;
    }
  }
  ```

---

### **this, call, apply, and bind**

- **this:** Refers to the current context.
- **call/apply:** Explicitly set `this` for a function.
- **bind:** Returns a new function with a bound `this`.

Example:

```javascript
function greet() {
  console.log(`Hello, ${this.name}`);
}
greet.call({ name: 'John' }); // Output: Hello, John
```

---

### **map, reduce, filter, compose**

1. **map:** Transforms elements.
   ```javascript
   [1, 2, 3].map((x) => x * 2); // [2, 4, 6]
   ```
2. **reduce:** Accumulates values.
   ```javascript
   [1, 2, 3].reduce((sum, x) => sum + x, 0); // 6
   ```
3. **filter:** Filters elements.
   ```javascript
   [1, 2, 3].filter((x) => x > 1); // [2, 3]
   ```
4. **compose:** Combines functions.
   ```javascript
   const add1 = (x) => x + 1;
   const multiply = (x) => x * 2;
   const compose = (f, g) => (x) => f(g(x));
   console.log(compose(add1, multiply)(5)); // 11
   ```

---

### **Closures**

Functions retain access to variables in their lexical scope even after the outer function is executed.

Example:

```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}
const counter = outer();
counter(); // 1
counter(); // 2
```

---

### **Promises and async/await**

- **Promises:** Handle async tasks.
  ```javascript
  const fetchData = new Promise((resolve) => resolve('Data fetched'));
  fetchData.then(console.log);
  ```
- **async/await:** Simplifies Promises.
  ```javascript
  async function fetch() {
    const data = await fetchData;
    console.log(data);
  }
  fetch();
  ```

---

### **Data Structures and Big O**

Efficient data structures and algorithms improve performance.

Example:

```javascript
const items = [1, 2, 3];
console.log(items.includes(2)); // O(n)
```

---

### **Design Patterns**

Common reusable solutions, like Singleton or Observer.

Example (Singleton):

```javascript
const Singleton = (function () {
  let instance;
  return {
    getInstance: () => instance || (instance = {}),
  };
})();
```

<pre class="vditor-reset" placeholder="" contenteditable="true" spellcheck="false"><hr data-block="0"/></pre>


---

### **Difference Between Object Creation Using `Object` Constructor and `Object.create()`**

JavaScript provides multiple ways to create objects, and understanding the distinction between these methods is crucial.

#### **Object Constructor**

```javascript
function Person(name) {
  this.name = name;
}
const person1 = new Person('John');
console.log(person1.name); // Output: John
```

- **How it works:**
  - Creates an object using the constructor function.
  - The object inherits from the constructor's prototype.
  - The constructor function executes.

#### **Object.create()**

```javascript
const prototypeObject = {
  greet() {
    console.log('Hello from prototype!');
  },
};
const person2 = Object.create(prototypeObject);
person2.name = 'Doe';
person2.greet(); // Output: Hello from prototype!
```

- **How it works:**
  - Creates an object with the specified prototype.
  - No constructor function is executed.
  - Used for prototypal inheritance.

---

#### **Key Differences**

| Aspect                    | Object Constructor                                                         | Object.create()                                           |
| ------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Inheritance**           | From the constructor's prototype.                                          | From the provided object directly.                        |
| **Constructor Execution** | Runs the constructor function.                                             | No constructor is run.                                    |
| **Use Case**              | For creating objects with methods and properties defined by a constructor. | For prototypal inheritance or extending existing objects. |


---

### **1. Object Creation and the `delete` Operator**

- Objects created with `Object.create()` inherit properties from their prototype.
- The `delete` operator removes properties only if they exist directly on the object, not on its prototype.

#### **Code Example**

```javascript
const prototypeObj = { height: 180 };
const person = Object.create(prototypeObj);

console.log(person.height); // Output: 180
delete person.height;
console.log(person.height); // Output: 180
```

- **Explanation:** The property `height` exists on the prototype, so it cannot be deleted directly from `person`.

---

### **2. Array Filter Polyfill**

A polyfill mimics the behavior of existing methods for environments where they are not available.

#### **Code Example**

```javascript
Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// Usage
const arr = [1, 2, 3, 4];
const filtered = arr.myFilter((num) => num % 2 === 0);
console.log(filtered); // Output: [2, 4]
```

---

### **3. Using `Math.max` with Arrays**

Since `Math.max` does not accept arrays directly, use the spread operator (`...`) to convert an array into individual arguments.

#### **Code Example**

```javascript
const numbers = [10, 20, 30, 5];
const max = Math.max(...numbers);
console.log(max); // Output: 30
```

---

### **4. Swapping Variables Using Destructuring**

#### **Code Example**

```javascript
let a = 10,
  b = 20;
[a, b] = [b, a];
console.log(a, b); // Output: 20, 10
```

---

### **5. Executing Promises Sequentially**

Using `reduce` to chain promises and ensure sequential execution.

#### **Code Example**

```javascript
const arr = [1, 2, 3];

arr.reduce((prev, curr) => {
  return prev.then(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log(curr);
          resolve();
        }, 1000);
      })
  );
}, Promise.resolve());
```

---

### **6. Memoization**

#### **Code Example**

```javascript
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
}

// Usage
const slowFunction = (num) => num * 2;
const fastFunction = memoize(slowFunction);

console.log(fastFunction(5)); // Computed: 10
console.log(fastFunction(5)); // Cached: 10
```

---

### **7. Debounce Function**

A debounce function ensures a function executes only after a specified time has elapsed since the last invocation.

#### **Code Example**

```javascript
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage
const log = debounce(() => console.log('Debounced!'), 1000);
log(); // Call multiple times within 1 second to see the effect.
```

---

### **8. Handling Callback Hell with Promises**

#### **Code Example**

```javascript
// Callback Hell
setTimeout(() => {
  console.log('Step 1');
  setTimeout(() => {
    console.log('Step 2');
    setTimeout(() => {
      console.log('Step 3');
    }, 1000);
  }, 1000);
}, 1000);

// With Promises
const delay = (ms, msg) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, ms);
  });

delay(1000, 'Step 1')
  .then(() => delay(1000, 'Step 2'))
  .then(() => delay(1000, 'Step 3'));
```

---

### **9. Prototype vs `__proto__`**

- `prototype`: Property of constructor functions used to define methods/properties for instances.
- `__proto__`: Property of an object that points to the prototype it inherits from.

#### **Code Example**

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  console.log(`Hello, ${this.name}`);
};

const john = new Person('John');
console.log(john.__proto__ === Person.prototype); // true
```

---

### **10. Real-World Usage of `call`, `apply`, `bind`**

#### **Code Example**

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const user = { name: 'Alice' };

greet.call(user, 'Hello', '!'); // Output: Hello, Alice!
greet.apply(user, ['Hi', '.']); // Output: Hi, Alice.
const boundGreet = greet.bind(user, 'Hey');
boundGreet('?'); // Output: Hey, Alice?
```

---
