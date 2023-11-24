/**
 * type predicate
 */

function isNumber(input: any): input is number {
  return typeof input === "number";
}

function isNumberReturnBoolean(input: any): boolean {
  return typeof input === "number";
}

let number: any = 5;

if (isNumberReturnBoolean(number)) {
  number; // any로 유추됨
}

if (isNumber(number)) {
  number; // number로 유추됨
}

interface Doge {
  name: string;
  age: number;
}

interface Cat {
  name: string;
  breed: number;
}

type DogeOrCat = Doge | Cat;

function isDoge(animal: DogeOrCat): animal is Doge {
  return (animal as Doge).age !== undefined;
  // age 프로퍼티는 Doge에만 존재하므로 undefined가 아니면 Doge이다
}

const doge: DogeOrCat = {
  name: "강아지",
  age: 3,
};

if (isDoge(doge)) {
  doge; // Doge로 유추됨
} else {
  doge; // never로 유추됨.
  // 왜냐면 Cat 타입에는 breed가 있는데, 변수로 선언된 doge 변수에는 breed가 없기 때문이다.
}
