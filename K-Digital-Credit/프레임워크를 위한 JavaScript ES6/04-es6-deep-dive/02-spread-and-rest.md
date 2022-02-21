# Spread와 Rest

> 프레임워크를 위한 JavaScript ES6

## Spread

객체나 배열의 내부나 함수를 호출해주는 인자에서 사용하는 것.

```js
const student = {
  name: "김현수",
};
```

객체의 속성을 그대로 가지면서 추가된 정보를 가진 객체를 만들고자 할 때, 객체의 속성이 많다면 기존 객체의 속성을 복사하는 것은 비효율적일 것이다.

이 때, `spread` 문법을 통해 기존 객체를 복사해올 수 있다.

```js
const univStudent = {
  ...student,
  major: "철학과",
};
```

여러 번 복사하는 것도 가능하다.

```js
const koreanUnivStudent = {
  ...univStudent,
  region: "Seongnam",
};
```

배열에서도 사용가능 하다.

```js
const oddNumbers = [1, 3, 5, 7, 9];
const evenNumbers = [2, 4, 6, 8, 10];

const allNumbers = [...oddNumbers, ...evenNumbers];
// [1, 3, 5, 7, 9, 2, 4, 6, 8, 10]
```

`spread` 문법은 함수의 인자를 입력할 때 편리하게 사용할 수 있다.

```js
const sum = (num1, num2, num3, num4, num5) => num1 + num2 + num3 + num4 + num5;
sum(...oddNumbers);
```

## Rest

함수의 매개변수에서 주로 쓰인다.
함수에서, `spread` 문법은 배열을 펼쳐서 **요소들을 전달**하는 개념이라면, `rest` 문법은 요소들을 **배열로 묶는** 개념이다.

```js
const printFirstElement = (...rest) => {
  console.log(rest[0]); // rest 문법
};

printFirstElement(...oddNumbers); // 1출력. spread 문법
```

객체나 배열의 구조 분해 할당에도 사용할 수 있다.

```js
const koreanUnivStudent = {
  name: "김현수",
  major: "철학과",
  region: "성남시",
};

const { name, ...rest } = koreanUnivStudent;
console.log(rest); // { major: "철학과", region: "성남시" }
```

```js
[a, b, ...rest] = [1, 2, 3, 4, 5];
console.log(a); // 1
console.log(b); // 2
console.log(rest); // [3, 4, 5]
```
