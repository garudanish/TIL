# 03. 조건문

> Let's Get IT 자바스크립트 프로그래밍

조건문은 주어진 조건에 따라 코드를 실행하거나 실행하지 않는 문이다.

```js
if (조건식) 실행문;

if (조건식) {
  실행문1;
  실행문2;
}
```

조건문은 조건식과 실행문으로 구분된다. 조건식이 참인 값이면 내부의 실행문이 실행되고, 거짓인 값이면 실행문이 실행되지 않는다. 만일 실행문을 여러개일 경우 실행문을 중괄호로 감싼다. 실행문이 한 개일 경우 중괄호를 사용하지 않아도 되지만, 조건문의 범위를 명확하게 하기 위해 실행문이 한 개일 때도 중괄호를 사용하는 것이 좋다.

```js
if (true) {
  console.log("Hello, true!");
} // Hello, true!

let condition = true;
if (condition) {
  console.log("Hello, condition!");
} // Hello, condition!

if (true) {
  console.log("Hello, if!");
  console.log("Hello, again!");
}
// Hello, if!
// Hello, again!

if (false) {
  console.log("Hello, false!");
} // 조건식이 거짓인 값(false)이므로 아무것도 실행하지 않는다
```

```js
let value = "사과";
let condition = true;
if (condition) {
  value = "바나나";
}
console.log(value); // 바나나
```

조건문을 사용하여 변수의 값을 바꿀 수도 있다.

## `else`를 사용해 두 방향으로 분기하기

조건식이 `true`일 때와 `false`일 때 각각 다르게 코드를 진행하고 싶다면 `else`를 사용한다.

```js
if (조건식) {
  // 조건식이 참인 값일 때 실행
  실행문;
} else {
  // 조건식이 거짓인 값일 때 실행
  실행문;
}
```

```js
let value = "사과";
let condition = false;
if (condition) {
  value = "바나나";
} else {
  value = "포도";
}
console.log(value); // 포도
```

## `else if`를 사용해 여러 방향으로 분기하기

경우의 수가 참과 거짓 2가지가 아니라 더 많아진다면 `else if`문을 사용할 수 있다.

```js
if (조건식) {
  실행문;
} else if (조건식) {
  실행문;
} else {
  실행문;
}
```

`else if` 문은 경우의 수 가짓수만큼 넣을 수 있으며, 마지막 `else` 문은 필수가 아니다. 즉, 조건문이 `else if`로 끝나도 문제가 없다. 하지만 `if` 없이 `else if`나 `else`문을 단독으로 사용할 수는 없다.

```js
const score = 90;
if (score >= 90) {
  console.log("A+");
} else if (score < 90 && score >= 80) {
  console.log("A");
} else if (score < 80 && score >= 70) {
  console.log("B+");
} else if (score < 70 && score >= 60) {
  console.log("B");
} else {
  console.log("F");
}
// A+
```

위의 예시는 위에서부터 아래로 차례대로 실행된다는 특성을 이용해 코드를 좀 더 줄일 수 있다. 만약 `const score`가 70점이라고 가정하면, 1번 조건식을 검사한 뒤 조건식이 `false`가 되어 2번 조건식을 검사한다. 이때 1번 조건식은 이미 `false`이므로 겹치는 `score < 90`을 조건식에서 삭제해도 된다. 모든 조건식을 같은 방식으로 줄일 수 있다.

```js
const score = 90;
if (score >= 90) {
  console.log("A+");
} else if (score >= 80) {
  console.log("A");
} else if (score >= 70) {
  console.log("B+");
} else if (score >= 60) {
  console.log("B");
} else {
  console.log("F");
}
// A+
```

## 중첩 `if`문 사용하기

`if`문, `else if`문, `else`문의 중괄호 안에 실행문을 넣을 수 있다. 조건문 역시 문이므로, 중괄호 안에 다시 넣을 수 있다.

```js
let first = true;
let second = false;
if (first) {
  console.log("조건 1 충족");
  if (second) {
    console.log("조건 2 충족");
  } else {
    console.log("조건 2 미충족");
  }
} else {
  console.log("조건 1 미충족");
}
// 조건 1 충족
// 조건 2 미충족
```

이런 중첩 `if`문은 피하는 것이 좋다. 조건문이 중첩되어 들여쓰기가 깊어질 수록 코드는 읽기 어려워진다. 중첩 `if`문은 `if-else` `if-else` 문으로 변환할 수 있으므로, 변환해 코드의 가독성을 높이는 것을 권장한다.

```js
let first = true;
let second = false;
if (first && second) {
  console.log("조건 1 충족");
  console.log("조건 2 충족");
} else if (first) {
  console.log("조건 1 충족");
  console.log("조건 2 미충족");
} else {
  console.log("조건 1 미충족");
}
// 조건 1 충족
// 조건 2 미충족
```

## `switch` 문으로 분기하기

조건문에는 `if`문 외에도 `switch`문이 있다.

```js
switch (조건식) {
  case 비교 조건식:
    실행문;
}
```

`switch`문에는 조건식 두 개가 사용된다. 소괄호의 조건식의 값이 `case`의 비교 조건식값과 일치(`===`)하면 해당 실행문이 실행된다. 보통 조건식에 변수를 넣고, 비교 조건식에 변수와 비교할 값을 넣는다.

```js
let value = "A";
switch (value) {
  case "A":
    console.log("A");
}
// A
```

여러 방향으로 분기하려면 `case`를 여러 번 사용하면 된다.

```js
let value = "B";
switch (value) {
  case "A":
    console.log("A");
  case "B":
    console.log("B");
  case "C":
    console.log("C");
}
// B
// C
```

`switch`문은 위와 같이, 일치하는 `case`를 발견하면 일치 여부와 상관없이 그 아래 `case`들의 실행문을 모두 실행한다. 원하는 결과만 얻으려면 수동으로 `case`에서 빠져나와야 하는데, `break`문을 사용한다.

```js
let value = "B";
switch (value) {
  case "A":
    console.log("A");
    break;
  case "B":
    console.log("B");
    break;
  case "C":
    console.log("C");
    break;
}
// B
```

어떠한 `case`도 일치하지 않을 때 실행하고자 하는 분기는 `default` 예약어를 사용하면 된다.

```js
let value = "F";
switch (value) {
  case "A":
    console.log("A");
    break;
  case "B":
    console.log("B");
    break;
  case "C":
    console.log("C");
    break;
  default:
    console.log("아무것도 일치하지 않음");
}
// 아무것도 일치하지 않음
```

위의 예시에선 `default`는 맨 마지막 `case`이기 때문에 실행되더라도 함께 실행될 `case`가 없다. 따라서 `break`문을 적지 않아도 된다. 하지만 `default`문은 `switch`문 중 어디에나 위치할 수 있다. 만일 `default` 뒤에 실행될 `case`가 있다면 `default`에도 `break`를 적어주어야 한다.

`if`문이 `===` 연산자만 사용한다면 `switch`문으로 쉽게 대체할 수 있다.

## 조건부 연산자(삼항 연산자)

```js
조건식 ? 참일 때 실행되는 식 : 거짓일 때 실행되는 식
```

조건부 연산은 조건문에서 대입하는 부분을 짧게 줄이기 위해 사용한다.

조건부 연산자는 문이 아니라 식이므로 결괏값이 나온다.

```js
5 > 0 ? "참입니다" : "거짓입니다"; // "참입니다"
```

조건부 연산은 조건에 따라 달라지는 값을 변수에 대입할 때 사용한다.

```js
let value = 5 < 0 ? "참입니다" : "거짓입니다";
value; // "거짓입니다"
```

조건부 연산도 중첩해서 사용할 수 있다.

```js
let condition1 = true;
let condition2 = false;
let value = condition1
  ? condition2
    ? "둘 다 참"
    : "condition1만 참"
  : "condition1이 거짓";
value; // condition 1만 참"
```

읽기 편하게 다음과 같은 형태들로 괄호 연산자나, 들여쓰기로 구분할 수 있다.

```js
let value = condition1
  ? condition2
    ? "둘 다 참"
    : "condition1만 참"
  : "condition1이 거짓";
```

```js
let value = condition1
  ? condition2
    ? "둘 다 참"
    : "condition1만 참"
  : "condition1이 거짓";
```
