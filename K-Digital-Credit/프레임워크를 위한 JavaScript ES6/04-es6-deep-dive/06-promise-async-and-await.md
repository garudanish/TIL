# Promise, Async and Await

> 프레임워크를 위한 JavaScript ES6

콜백 함수가 계속되면 가독성이 저하되고, 예외처리가 불편해지는 콜백 지옥이 펼쳐진다.

이런 문제점을 해결하기 위해 나온 개념이 `promise`, `async`, `await`이다.

## `promise`

자바스크립트 비동기 처리에 사용되는 객체.
`promise` 인스턴스 안에 비동기 처리될 대상을 넣는다.

```js
asncFunction = new Promise( (resolve, reject) => { ... })
```

비동기처리가 실행됐을 때 `resolve`를 , 실행되지 않았을 때 `reject`를 호출한다.

```js
function sayHello(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`내 이름은 ${name}!`);
      resolve();
    }, 2000);
  });
}

sayHello("김현수");
```

### `then`

`resolve`가 잘 실행됐을 경우 실행할 함수를 넣는다.

```js
function sayHello(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`내 이름은 ${name}!`);
      resolve(`${name}`);
    }, 2000);
  });
}

sayHello("김현수").then((name) => console.log(`그래 안녕 ${name}.`));

// 내 이름은 김현수!
// 그래 안녕 김현수.
```

### `catch`

`reject`가 실행됐을 때 실행할 함수를 넣는다.

## `async` &amp; `await`

`async`와 `await`을 이용하면 비동기 함수이더라도 동기 함수처럼 위에서 아래로 작성할 수 있다.

```js
async functionName (...) {
  const result = await asyncFunction();
}
```

```js
function sayHello(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`내 이름은 ${name}!`);
      resolve(`${name}`);
    }, 2000);
  });
}

async function foo(name) {
  const resultName = await sayHello(name);
  console.log("2초 뒤 실행될 코드");
}

foo("민철");

// 내 이름은 민철!
// 2초 뒤 실행될 코드
```

1. 주로 외부 서버, 외부 정보를 가져올 때 많이 쓰인다.
2. 예외 처리를 할 때 유용하다.
