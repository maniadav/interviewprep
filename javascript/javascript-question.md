# Common Javascript Interview Questions and Examples

---

## **Question 1: Predict the Output**

```javascript
for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 0);
}
```

**Answer:**

The `let` declaration creates a new block-scoped variable for each iteration, so the output will be:

```
0, 1, 2, 3, 4
```

---

## **Question 2: Private Counter Using Closures**

```javascript
function privateCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = privateCounter();
console.log(counter.increment()); // Output: 1
console.log(counter.decrement()); // Output: 0
console.log(counter.getCount());  // Output: 0
```

**Answer:**

The `privateCounter` function creates a closure with a private `count` variable, which is manipulated through the `increment`, `decrement`, and `getCount` methods.

Output:

```
1
0
0
```

---

## **Question 3: Identify and Fix Closure Issue**

**Problematic Code:**

```javascript
for (var i = 1; i <= 5; i++) {
    setTimeout(() => console.log(`n = ${i}`), 0);
}
```

**Answer:**

The `var` keyword does not create block-scoped variables. By the time the callback executes, `i` is already 6.

**Fixed Code Using IIFE:**

```javascript
for (var i = 1; i <= 5; i++) {
    (function(n) {
        setTimeout(() => console.log(`n = ${n}`), 0);
    })(i);
}
```

**Fixed Code Using `let`:**

```javascript
for (let i = 1; i <= 5; i++) {
    setTimeout(() => console.log(`n = ${i}`), 0);
}
```

**Expected Output:**

```
n = 1
n = 2
n = 3
n = 4
n = 5
```

---

## **Question 4: Implicit Type Coercion**

What will the following code output, and why?

```javascript
console.log([] + {});    // ?
console.log({} + []);    // ?
```

**Answer:**

* `[] + {}` → "[object Object]"
  * An empty array is coerced into an empty string, and an empty object is coerced into "[object Object]".
* `{} + []` → 0
  * Here, `{}` is treated as an empty block, and the result is `+[]`, which is coerced to 0.

---

## **Question 5: NaN Comparison**

Explain the output of this comparison:

```javascript
console.log(NaN === NaN);   // ?
console.log(Object.is(NaN, NaN)); // ?
```

**Answer:**

* `NaN === NaN` → `false`
  * NaN is the only value in JavaScript that is  **not equal to itself** .
* `Object.is(NaN, NaN)` → `true`
  * `Object.is` performs a strict equality check that considers `NaN` equal to itself.

---

## **Question 6: Hoisting Oddities**

What will the following code output, and why?

```javascript
function foo() {
  console.log(a);
  var a = 10;
  console.log(a);
}
foo();
```

**Answer:**

* Output:

  ```
  undefined
  10
  ```

  * Due to hoisting, `var a` is declared at the top of the function but not initialized, so the first `console.log(a)` outputs `undefined`.

---

## **Question 7: Function and Block Scope**

What is the output of this code?

```javascript
if (true) {
  function test() {
    console.log("Inside function");
  }
}

test();
```

**Answer:**

* In  **non-strict mode** , the function declaration is hoisted to the global scope, so it works, and the output is:
  ```
  Inside function
  ```
* In  **strict mode** , function declarations inside blocks are scoped to the block, and it will throw a `ReferenceError`.

---

## **Question 8: `typeof null`**

Why does `typeof null` return `"object"`?

```javascript
console.log(typeof null); // ?
```

**Answer:**

* `typeof null` → `"object"`
  * This is a historical bug in JavaScript that stems from its early implementation. Null was meant to signify a pointer to an object in C-like languages, and this behavior has persisted.

---

## **Question 9: Array Holes**

What will the following code output?

```javascript
const arr = [1, , 3];
console.log(arr.length);  // ?
console.log(arr[1]);      // ?
```

**Answer:**

* `arr.length` → `3`
  * The length of an array includes empty slots (holes).
* `arr[1]` → `undefined`
  * The slot exists but is uninitialized.

---
