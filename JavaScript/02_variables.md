# 02. 변수

> Let's Get IT 자바스크립트 프로그래밍

## 변수 선언

특정한 값을 저장해야하는 상황에서 사용하는 것이 변수이다. 변수를 사용하면 값을 저장하고 저장한 값을 불러올 수 있다. 변수를 만드는 행위는 "선언한다"라고 표현한다.

변수를 선언하는 방법은 세 가지가 있다: `let`, `const`, `var`.

```js
let 변수명 = 식;
```

`let` 다음에 선언하고자 하는 변수명(변수의 이름)을 적고, 그 뒤에 대입 연산자인 `=`를 입력한다. `=` 뒤에는 변수에 저장할 식을 입력하면 된다.

```js
let total = 5000 + 8000 + 10000 + 9000;
total; // 32000
console.log(total); //32000
```

`let`으로 시작하는 명령을 선언문이라고 한다. 위의 예시에서 `total`은 변수명이다. 변수를 선언함과 동시에 값을 대입하는 행위를 **초기화**라고 한다. 변수 선언은 항상 결괏값으로 `undefined`를 출력한다. 변수를 선언 할 때 변수에 값을 대입하지 않아도 된다. 하지만 이미 선언한 변수를 다시 선언하면 에러가 발생한다.

## 변수명

변수명은 변수의 값이 무엇인지 알려 주는 역할을 하기 때문에 자세하게 지어야 한다. 변수명에는 제약 사항이 있는데, 특수문자는 `$`와 `_`만 사용할 수 있으며, 숫자로 시작해서는 안 된다. 이를 제외하면 모든 글자가 가능한데, 한글, 한자, 유니코드 모두 제약이 없다.

변수명으로 사용할 수 없는 단어를 **예약어**라고 한다. 예약어는 자바스크립트 프로그래밍에서 특정한 역할을 하므로 변수명으로 쓰지 않는다. `await`, `break`, `case`, `catch` 등이 있다. 예약어지만 변수명으로 쓸 수 있는 경우도 있고, 예약어가 아님에도 변수명으로 쓰지 못하는 경우도 있다. 따라서 모든 예약어를 외우기보다는 자바스크립트 프로그래밍을 하다가 보게 되는 단어들을 변수명으로 사용하지 않는 것이 좋다.

## 변수 수정

변수(變數)는 변하는 '숫자'를 의미하지만, 실제로는 숫자 자료형 외에도 다양한 자료형의 값을 정할 수 있다. '변하는' 것에 방점을 찍어야한다. 변수에 한 번 저장한 값을 바꿀 수 있다.

```js
let change = "바꿔봐";
change = "바꿨다";
console.log(change); // 바꿨다
```

변수에 저장한 값을 비울 때는 변수에 `undefined`나 `null`을 대입하면 된다. 둘은 빈 값이라는 점에선 동일하지만 `undefined`와 `null`은 다른 값이므로, 많은 개발자가 `null`을 대입해 값을 의도적으로 지웠다는 의미를 부여한다.

## 변수 활용

변수를 다른 변수에 대입할 수 있다.

```js
let string = "Hello, variable";
let string2 = string;
string2; // "Hello, variable"
```

위와 같이 변수 `string2`에 다른 변수 `string`을 대입할 수도 있고,

```js
let number = 5;
number = number + 3; // 8
```

위와 같이 `number`에 `number`를 대입할 수도 있다. `number = number + 3;`은 `number += 3`로 축약할 수 있다. 같은 원리로 `-=`, `*=`, `/=`, `%=`, `**=` 또한 사용할 수 있다.

## 상수

`let` 외에도 변수를 선언하는 예약어로 `const`가 있다. `const`는 상수*constant*의 줄임말이다. 상수는 변하지 않는 수를 의미한다. 코딩을 하다 보면 변수의 값을 수정할 일이 생각보다 그리 많지 않다. 그렇기에 실수로 값을 수정하는 일을 막기 위해 상수를 사용한다. `const`를 사용하면 해당 변수는 수정되지 않는 것이 보장되기 때문에 더 안전하게 코딩할 수 있다.

```js
const value = "상수";
value = "수정불가"; // Uncaught TypeError: Assignment to constant variable.
```

한번 값을 대입하면 다른 값을 대입할 수 없으므로, 상수 선언 시 초기화하지 않으면 에러가 발생한다.

```js
const wrong;    // Uncaught SyntaxError: Missing initializer in const declaration
```

## `var`

`var`는 변수*variable*의 줄임말이다. 예전에는 많이 사용했지만, 다소 이해하기 어려운 특성 때문에 `const`와 `let`을 사용하는 방식으로 옮겨가고 있다. 하지만 과거에 작성된 코드에선 `var`를 많이 사용하므로 `var`의 특성은 알아두어야 한다.

```js
var variable = "재선언 가능";
var variable = "재선언 가능";
```

기존에 선언했던 `variable` 변수를 다시 선언해도 오류가 발생하지 않는다. 이때문에 실수로 변수를 다시 선언하는 문제가 발생할 수 있다.

```js
var undefined = "defined";
var Infinity = 0;
var let = "const";

let undefined = "defined";    // Uncaught SyntaxError: Identifier 'undefined' has already been declared
let Infinity = 0;    // Uncaught SyntaxError: Identifier 'Infinity' has already been declared
let let = "const";    // Uncaught SyntaxError: let is disallowed as a lexically bound name
```

`let`과 달리 `var`로는 `undefined`, `Infinity`, `let`과 같이 자바스크립트에서 각자 역할을 하는 예약어를 변수명으로 지을 수 있다.
