# 06. 함수

> Let's Get IT 자바스크립트 프로그래밍

프로그래밍에서 함수function는 특정한 작업을 수행하는 코드를 의미한다. 함수를 미리 만들어 두고 원할 때 실행해 정해진 작업을 수행하게 할 수 있다.

함수를 만들 때는 보통 `function` 예약어를 사용하거나, `=>` 기호를 사용한다. `=>` 기호를 사용한 함수를 화살표 함수라고 한다.

```js
function a() {}
const b = function () {};
const c = () => {};
```

위의 `b`, `c` 예시처럼 상수 혹은 변수에 함수를 대입하면 상수 혹은 변수의 이름이 함수의 이름이 된다.

`a` 예시처럼 함수를 상수에 대입하지 않고 `function` 키워드 뒤에 함수 이름을 넣는 방식을 **함수 선언문** 이라고 하고, `b` 예시처럼 함수를 상수나 변수에 대입하는 방식을 **함수 표현식**이라고 한다.

즉, 함수를 선언하는 방식은 1) 함수 선언문, 2) 함수 표현식, 3) 화살표 함수로 크게 세 가지가 있다.

```js
function a() {
  console.log("Hello");
  console.log("Function");
}
a();

//  Hello
//  Function
```

위의 예시에서 함수 `a`를 호출하니 내부의 `console.log`들이 호출 되는 것을 볼 수 있다. `console.log()` 역시 하나의 함수이다. 즉, 함수 내에서 함수를 다시 호출할 수 있다.

실행하려는 코드를 함수로 만들어 두면 재사용하기 쉽다는 장점이 있다.

## `return` 이해하기

```js
function a() {} // undefined
a(); // undefined
```

함수 `a`를 호출했을 때 결괏값이 `undefined`이다. 함수를 호출하면 항상 결괏값이 나오는데, 기본값으로 `undefined`가 나오게 된다. 이를 **반환값**이라고 한다. 반환값을 직접 정하려면 `return`문을 추가하면 된다.

```js
function a() {
  return 10;
}
a(); // 10
```

반환값 역시 값이므로 다른 식이나 문에 넣어 사용하거나, 상수나 변수에 대입할 수 있다.

```js
function a() {
  return 10;
}
const b = a();

console.log(a()); // 10. console.log(10)과 같다.
console.log(b); // 10. console.log(10)과 같다.
```

`return` 문의 또 다른 기능으로 함수의 실행을 중간에 멈추는 역할이 있다.

```js
function a() {
  console.log("Hello");
  return;
  console.log("Return");
}

a(); // Hello
```

`return`문이 실행되면 그 아래 코드는 아예 실행되지 않아 `return` 아래에 쓰인 `console.log(Return)`이 실행되지 않았다. 이를 이용해 조건문과 `return`문을 결합해 함수의 실행을 조작할 수 있다.

```js
function a() {
  if (false) {
    return;
  }
  console.log("실행됩니다.");
}
a(); // 실행됩니다.
```

`return` 문이 **적혀**있다고 그 아래의 코드들이 실행되지 않는 것이 아니라, `return`문이 **실행**되어야 그 아래 코드들이 실행되지 않는다. 위의 예시에선 `return`문이 위치한 `if`문의 조건이 `false`여서 `return`문이 실행되지 않았다.

## 매개변수와 인수 사용하기

`console.log()`의 소괄호 안에 원하는 값을 넣으면 콘솔에 출력되듯이, 함수에 원하는 값을 넣을 수 있다.

```js
function a(parameter) {
  console.log(parameter);
}
a("argument"); // argument
```

`a` 함수를 호출할 때 소괄호에 넣은 `"argument"` 문자열은 `a` 함수를 선언할 때 소괄호에 넣은 `parameter`와 연결된다. 즉, `parameter`는 `"argumnet"`의 값을 가진다. `parameter`는 변수와 같은 특성을 가진다. 함수를 호출할 때 넣은 값(`"argument"`)을 **인수**라고 하고, 함수를 선언할 때 사용한 변수(`parameter`)를 **매개변수**라고 한다.

함수는 매개변수와 인수 모두 여러 개를 가질 수 있고, 매개변수와 인수의 개수가 일치하지 않아도 된다.

```js
function a(w, x, y, z) {
  console.log(w, x, y, z);
  console.log(arguments);
}
a("Hello", "Parameter", "Argument");

// Hello Parameter Argument undefined
// Arguments(3) ['Hello', 'Parameter', 'Argument']
```

인수 `Hello`, `Parameter`, `Argument`는 각각 매개변수 `w`, `x`, `y`에 연결된다. 매개변수 `z`에 대응하는 인수는 존재하지 않으므로, 자동으로 `undefined` 값이 대입된다. 따라서 매개변수 `z`의 값이 `undefined`가 된다.

위의 예시처럼 매개변수를 4개 작성했다고 인수의 개수가 4개라고 확정할 수 없으므로, `arguments`라는 값을 사용할 수 있다. 단 화살표 함수 안에서는 사용할 수 없다.

```js
function a(w, x) {
  console.log(w, x);
}
a("Hello", "Parameter", "Argument");

// Hello Parameter
```

만일 인수가 매개변수보다 많다면 남은 인수는 사용되지 않는다.

## 다른 변수 사용하기

함수 안에서 변수나 상수를 선언할 수 있다. 또한, 함수 바깥의 변수나 상수를 사용할 수 있다.

```js
function minus1(x, y) {
  const a = 100;
  return (x - y) * a;
}

console.log(minus1(5, 3)); // 200
```

함수 안에서 상수 `a`를 선언한 후 `return` 문에서 사용했다.

```js
const a = 100;
function minus2(x, y) {
  return (x - y) * a;
}

console.log(minus2(5, 3)); // 200
```

상수 `a`를 함수를 선언하기 전에 먼저 선언했다. 한수는 자신의 매개변수나 내부에서 선언한 상수, 변수가 아니더라도 다른 상수나 변수에 접근할 수 있다. 단, 모든 상수나 변수에 접근 가능한 것은 아니고 스코프에 따라 접근 가능 여부가 달라진다.

`minus1` 함수 처럼 자신의 매개변수나 내부 변수(혹은 상수)만 사용하는 함수를 **순수 함수**라고 부른다.
