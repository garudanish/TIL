/**
 * Narrowing
 *
 * Narrowing은 Union 타입에서 더욱 구체적인 타입으로,
 * 논리적으로 유추할 수 있게 되는 걸 의미한다.
 */

let numberOrString: number | string = "성남FC";
numberOrString; // "성남FC"를 할당했기 때문에 string 타입으로 유추된다.
// 값을 통해서 어떤 타입이 될지를 판단할 수 있다.

const decimal = 3.1415;

console.log(decimal.toFixed(2)); // decimal이 Number 타입으로 유추되기 때문에 에러가 발생하지 않는다.

// numberOrString.toFixed(); // numberOrString이 string 타입으로 유추되기 때문에 에러가 발생한다.

/**
 * Narrowing 종류
 *
 * 1) Assingment Narrowing
 * 2) typeof Narrowing
 * 3) Truthiness Narrowing
 * 4) Equality Narrowing
 * 5) in operator Narrowing
 * 6) instanceof Narrowing
 * 7) discriminated union Narrowing
 * 8) exhaustiveness checking Narrowing
 */

// 1. Assingment Narrowing
// 특정 값을 할당해서 Narrowing
let numOrStr: number | string = "성남FC";

//2. typeof Narrowing
numOrStr = Math.random() > 0.5 ? 1234 : "성남FC";
// 랜덤하기 때문에 빌드할 때는 어떤 타입으로 유추될지 모른다.
// 그래서 number | string으로 유추된다.

if (typeof numOrStr === "string") {
  numOrStr; // string 타입으로 유추된다.
} else {
  numOrStr; // number 타입으로 유추된다.
}

// 3. Truthiness Narrowing
let nullOrStr: null | string[] = Math.random() > 0.5 ? null : ["성남FC"];

if (nullOrStr) {
  nullOrStr; // null은 falsy하기 때문에 string[]으로 유추된다.
} else {
  nullOrStr; // null로 유추된다.
}

// 4. Equality Narrowing
let numOrStr2: number | string = Math.random() > 0.5 ? 1234 : "성남FC";
let stringOrBool: string | boolean = Math.random() > 0.5 ? "성남FC" : true;

if (numOrStr2 === stringOrBool) {
  numOrStr2; // 조건이 성립하려면 string이 될 수밖에 없다. 따라서 string으로 유추된다.
  stringOrBool; // 위와 마찬가지
} else {
  numOrStr2; // string이어도 stringOrBool이 bool이면 else문을 탈 수 있다. 그래서 Union 타입을 가진다.
  stringOrBool; // 위와 마찬가지
}

let numberOrStringOrNull: number | string | null =
  Math.random() > 0.5 ? 1234 : Math.random() ? "성남FC" : null;

if (typeof numberOrStringOrNull === "number") {
  numberOrStringOrNull; // 당연히 number로 유추된다.
} else {
  numberOrStringOrNull; // string | null로 유추된다
}

// 5. in operator Narrowing
interface Person {
  name: string;
  age: number;
}

interface Dog {
  name: string;
  type: string;
}

let person: Person = {
  name: "김현수",
  age: 28,
};

let dog: Dog = {
  name: "강아지",
  type: "푸들",
};

let personOrDog: Person | Dog = Math.random() > 0.5 ? person : dog;

if ("type" in personOrDog) {
  personOrDog; // type이라는 key는 Dog 타입에만 있기 때문에 Dog 타입으로 유추된다.
} else {
  personOrDog; // person으로 유추된다
}

// 6. instanceof Narrowing
let dateOrString: Date | string = Math.random() > 0.5 ? new Date() : "성남FC";

if (dateOrString instanceof Date) {
  dateOrString; // Date로 유추된다.
} else {
  dateOrString; // string으로 유추된다.
}

// 7. discriminated union Narrowing
interface Animal {
  type: "dog" | "human";
  height?: number;
  breed?: string;
}

let animal: Animal =
  Math.random() > 0.5
    ? { type: "human", height: 170 }
    : { type: "dog", breed: "푸들" };

if (animal.type === "human") {
  animal.height; // number | undefined
} else {
  animal.breed; // string | undefined
  animal.height; // string | undefined
}

interface Human {
  type: "human";
  height: number;
}

interface Dog2 {
  type: "dog";
  breed: string;
}

type HumanOrDog = Human | Dog2;

let humanOrDog: HumanOrDog =
  Math.random() > 0.5
    ? { type: "human", height: 170 }
    : { type: "dog", breed: "푸들" };

if (humanOrDog.type === "human") {
  humanOrDog.height; // number. type이 human이면 height가 있기 때문에 number로 유추된다.
} else {
  humanOrDog.breed; // string. type이 dog면 breed가 있기 때문에 string으로 유추된다.
  // humanOrDog.height; // 에러. type이 dog면 height가 없기 때문에 에러가 발생한다
}

// 8. exhaustiveness checking Narrowing
switch (humanOrDog.type) {
  case "human":
    humanOrDog; // Human
    break;
  case "dog":
    humanOrDog; // Dog2
    break;
  default:
    humanOrDog; // never
    const _check: never = humanOrDog; // 지금은 never 타입이기 때문에 할당할 수 있다.
    // 나중에 HumonOrDog 타입에 새로운 interface를 Union으로 추가하면 에러가 발생한다.
    // 일부러 에러가 나도록 코드를 작성한 것
    break;
}
