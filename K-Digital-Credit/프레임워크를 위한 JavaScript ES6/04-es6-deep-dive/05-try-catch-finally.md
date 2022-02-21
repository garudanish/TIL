# 예외 처리

> 프레임워크를 위한 JavaScript ES6

예외 Exeption는 예기치 못한 상황을 의미한다.
예외를 예측하고 대비하면 예외 상황이 발생해도 프로그램을 멈출 필요가 없다.

`SyntaxError`, `TypeError` 등등은 자바스크립트에서 기본적으로 염두하고 있는 예외 상황들이다. 필요에 따라서는 사용자가 직접 예외상황을 정의해서 사용하기도 한다.

## try catch finally

예외 상황을 사전에 미리 찾아내서 처리하는 문법이 `try` `catch` `finally`이다.

- `try`: 예외 상황이 생길 수 있는 코드.
- `catch`: `try`에서 생긴 예외를 처리할 부분.
- `finaly`: 마지막으로 무조건 실행될 코드

```js
try {
  console.log("try에 있는 문장");
} catch (e) {
  console.log("catch에 있는 문장");
} finally {
  console.log("finally에 있는 문장");
}

// try에 있는 문장
// finally에 있는 문장
```

```js
try {
  console.log("try에 있는 문장");
  const result = document.getElementById(id);
} catch (e) {
  console.log("catch에 있는 문장");
  console.log(e);
  console.log(e.name);
  console.log(e.message);
} finally {
  console.log("finally에 있는 문장");
}

// try에 있는 문장
// catch에 있는 문장
// ReferenceError: id is not defined at <anonymous>:3:42
// ReferenceError
// id is not defined
// finally에 있는 문장
```

`throw` 문법을 통해 에러를 고의로 발생시킬 수 있다.

```js
try {
  console.log("try에 있는 문장");
  throw new Error("사용자가 정의한 에러가 발생했다!");
} catch (e) {
  console.log("catch에 있는 문장");
  console.log(e);
  console.log(e.name);
  console.log(e.message);
} finally {
  console.log("finally에 있는 문장");
}

// try에 있는 문장
// catch에 있는 문장
// Error: 사용자가 정의한 에러가 발생했다! at <anonymous>:3:42
// Error
// 사용자가 정의한 에러가 발생했다!
// finally에 있는 문장
```
