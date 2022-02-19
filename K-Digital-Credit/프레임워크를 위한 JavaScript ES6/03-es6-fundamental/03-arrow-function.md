# 화살표 함수

> 프레임워크를 위한 JavaScript ES6

기존에 함수를 정의하던 방식을 간결하게 작성하도록 돕는 문법.

화살표 함수는 익명함수이다. `(매개변수) => {함수본문}`의 형태로 작성한다.

매개변수가 하나라면 소괄호를 생략할 수 있다.

함수 본문이 한 줄이라면 중괄호를 생략할 수 있다.

만일 중괄호가 생략이 됐다면, `return`은 암묵적으로 이루어지므로 생략해야 한다.

```js
const add = function (num1, num2) {
  return num1 + num2;
};

const arrowAdd = (num1, num2) => num1 + num2;

const isPositive = (num) => (num > 0 ? num : 0);
```
