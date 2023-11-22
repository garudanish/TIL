/**
 * Union Basics
 *
 * Union은 TS에서 타입을 병합할 수 있는 수많은 방법 중 하나이다.
 * 하지만 유니언을 사용해서 병합하는 경우가 가장 많다.
 */

type StringOrBooleanType = string | boolean;

let stringOrBooleanType: StringOrBooleanType = "아이브";
stringOrBooleanType = true; // 변경할 수 있다

// stringOrBooleanType = undefined; // 에러 발생

type StrBoolNullType = string | boolean | null;

type StateTypes = "DONE" | "LOADING" | "ERROR";

let state: StateTypes = "DONE";
state = "LOADING";
// state = "INITIAL" // 에러 발생

/**
 * 리스트의 Union
 */

type StringListOrBooleanList = string[] | boolean[];

let stringListOrBooleanList: StringListOrBooleanList = [
  "아이브",
  "김고은",
  "박소담",
];

stringListOrBooleanList = [true, false, true];
// stringListOrBooleanList = ["아이브", true, false];
// 에러 발생. string만으로 이루어진 배열이거나 boolean만으로 이루어진 배열이어야 한다.

type StringOrNumberList = (string | number)[];

let stringOrNumberList: StringOrNumberList = ["아이브", 1, 2, 3];
stringOrNumberList = [1, 2, 3];
stringOrNumberList = ["아이브", "김고은", "박소담"];
// stringOrNumberList = [true, false, true]; // 에러 발생

/**
 * Interface로 사용하는 Union
 */
interface Animal {
  name: string;
  age: number;
}

interface Person {
  name: string;
  age: number;
  address: string;
}

type AnimalOrPerson = Animal | Person;

let animalOrPerson: AnimalOrPerson = {
  name: "김현수",
  age: 28,
  address: "경기도 성남시",
}; // Person에만 있는 address가 있기 때문에 Person 타입으로 유추한다

console.log(animalOrPerson.name);
console.log(animalOrPerson.age);
console.log(animalOrPerson.address); // Person으로 유추하기 때문에 에러가 발생하지 않음

animalOrPerson = {
  name: "강아지",
  age: 3,
}; // 공통된 속성만 있기 때문에 AnimalOrPerson 타입으로 인식한다

console.log(animalOrPerson.name);
console.log(animalOrPerson.age);
// console.log(animalOrPerson.address); // address는 Person에만 있기 때문에 에러 발생

let animalOrPerson2:
  | {
      name: string;
      age: number;
    }
  | {
      name: string;
      age: number;
      address: string;
    } = {
  name: "김현수",
  age: 28,
  address: "경기도 성남시",
};

console.log(animalOrPerson2.name);
console.log(animalOrPerson2.age);
console.log(animalOrPerson2.address);

animalOrPerson2 = {
  name: "강아지",
  age: 3,
};

console.log(animalOrPerson2.name);
console.log(animalOrPerson2.age);
// console.log(animalOrPerson2.address);
// { name: string; age: number; } 타입이 아니기 때문에 에러가 발생함.
// 웬만해선 type을 선언해서 사용하는 게 읽기 좋다.

// 서로 관계가 없는 Union을 선언하면?
type Human = {
  name: string;
  age: number;
};

type Cat = {
  breed: string;
  country: string;
};

type HumanOrCat = Human | Cat;

const humanOrCat: HumanOrCat = {
  name: "김현수",
  age: 28,
};

const humanOrCat2: HumanOrCat = {
  name: "Korean Shorthair",
  age: 3,
};

const humanOrCat3: HumanOrCat = {
  name: "김현수",
  age: 28,
  breed: "Korean Shorthair",
  country: "Korea",
}; // Union은 합집합의 개념이기 때문에 Human과 Cat의 속성을 모두 가지고 있을 수 있다.

// 하지만 두 집합 중 하나라도 충족하는 집합이 하나라도 있어야 한다.
// 예를 들어 name, age, (breed || country)나, breed, country, (name || age)는 가능하지만
// age, breed만 선언하는 것은 불가능하다.
