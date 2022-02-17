# 일반적 자료형

> 프레임워크를 위한 JavaScript ES6

## 자료형

프로그래밍 언어는 Data로 동작한다.
컴퓨터는 미리 말해주지 않으면 어떤 데이터 자료형인지, 즉 문자열인지, 숫자인지, Boolean인지 모른다.

자바스크립트의 자료형은 크게 원시 타입과 객체 타입이 있다.

- 원시 타입
  - Boolean
  - number
  - String
  - Null
  - Undefined
  - Symbol

### `typeof` 연산자

특정 자료형을 변수에 넣었다고 해도, 변수의 이름만 보고는 어떤 자료형이 담겨있는지 알 수 없다.
이때, 자료형을 확인하는 연산자가 `typeof` 연산자이다.

### Boolean

```js
var bool1 = true;
var bool2 = false;

console.log(typeof bool1); // boolean
console.log(typeof bool2); // boolean
```

참, 거짓 둘 중의 하나를 갖는 자료형이다.

### Number

C, Python 등 다른 언어와는 다르게 정수, 소수 구분 없이 숫자인 자료형이다.

### String

문자열 자료형.
문자열은 문자들의 배열이다. 즉, 문자열은 인덱스를 갖는다.
하지만, 자바스크립트에서 문자열을 한 번 선언하면, 인덱스를 사용해 직접적으로 문자열을 바꿀 수는 없다.
`replace` 등의 문자열 메서드 등을 사용해서 바꿔야 한다.

`0`은 숫자 자료형이고, `"0"`은 문자열 자료형이다.
동등 연산자 `==`를 사용하면 `0`과 `"0"`은 `true`를 반환하지만, 일치 연산자 `===`를 사용하면 자료형이 다르기에 `false`를 반환한다.

### null

아무 값도 갖지 않음을 뜻하는 자료형.
명시적으로 변수에 값이 없음을 나타낼 때 사용한다.
`typeof null`은 `null`이 아니라 `object`가 나온다.
따라서 `null`을 담은 변수의 타입을 검사할 때는 일치 연산자를 사용해야 한다.

### undefined

변수를 선언하고 값 할당을 안 한 경우나, 진짜로 존재하지 않은 경우 `undefined`가 반환된다.
`null`은 명시적으로 없는 것이고, `undefined`는 진짜로 없는 것이다.

### Wrapper 객체

자료형을 감싸는 객체를 Wrapper 객체라고 한다.
`Number`, `String`, `Boolean`, `Symbol` Wrapper 객체가 있다.
일관적인 원시 타입 자료형의 유용한 메서드를 함께 사용하기 위해 Wrapper 객체를 사용한다.
