/**
 * Statement and Expression
 */

// Statement
function addNumbers(a: number, b: number): number {
  return a + b;
}

// Expression
const addNumbers2 = (a: number, b: number): number => a + b;

/**
 * Statement
 */

function add(x: number, y: number) {
  return x + y;
}

function subtract(x: number, y: number) {
  return x - y;
}

function multiply(x: number, y: number) {
  return x * y;
}

function divide(x: number, y: number) {
  return x / y;
}

/**
 * Expression
 *
 * 함수를 타입화 해서 사용할 수 있으므로, 함수 하나하나마다 타입을 선언할 필요가 없다.
 */

type CalculationType = (x: number, y: number) => number;

const add2: CalculationType = function (x, y) {
  return x + y;
};

const subtract2: CalculationType = function (x, y) {
  return x - y;
};

const multiply2: CalculationType = function (x, y) {
  return x * y;
};

const divide2: CalculationType = function (x, y) {
  return x / y;
};
