# 2장 실행 컨텍스트

# 실행 컨텍스트

실행 컨텍스트: **실행할 코드에 제공할 환경 정보들을 모아놓은 객체**

- 자바스크립트의 동적 언어로서의 성격을 가장 잘 파악할 수 있는 개념
- 자바스크립트는 어떤 실행 컨텍스트가 활성화되는 시점에 1) 선언된 변수를 위로 끌어올리고, 2) 외부 환경 정보를 구성하고, 3) `this`값을 설정하는 등의 동작을 수행한다.
- 클로저를 지원하는 대부분의 언어에서 이와 유사하거나 동일한 개념이 적용되어 있다.

## 2.1 실행 컨텍스트란?

- 스택: 출입구가 하나뿐인 깊은 우물같은 데이터 구조.
  - Last In, First Out.
  - 스택에 허용 범위 이상의 데이터를 넣으려고 하면 에러를 던진다.
- 큐: 양쪽이 열려있는 파이프같은 데이터 구조.
  - First In, First Out.

실행 컨텍스트는, **동일한 환경에 있는 코드들을 실행할 때** / **필요한 환경 정보들을 모아 컨텍스트를 구성**하고 / **이를 콜 스택 call stack에 쌓아올렸다가 /** **가장 위에 쌓여있는 컨텍스트와 관련 있는 코드들을 실행**하는 식으로 전체 코드의 환경과 순서를 보장한다.

- “동일한 환경”, 즉 하나의 실행 컨텍스트를 구성할 수 있는 방법으로 1) 전역공간, 2) `eval()`, 3) 함수 등이 있다.
  - 자동으로 생성되는 전역공간, [악마로 취급받는 `eval()`](https://dev.to/amitkhonde/eval-is-evil-why-we-should-not-use-eval-in-javascript-1lbh)을 제외하면 남는 것은 **실행 컨텍스트를 구성하는 방법은 함수를 실행하는 것** 뿐이다.

---

```js
// --- (1) ---
var a = 1;
function outer() {
  function inner() {
    console.log(a); // undefined
    var a = 3;
  }
  inner(); // --- (2) ---
  console.log(a); // 1
}
outer(); // --- (3) ---
console.log(a); // 1
```

**처음 자바스크립트 코드를 실행하는 순간(1) 전역 컨텍스트가 콜 스택에 담긴다.** 전역 컨텍스트는 일반적인 실행 컨텍스트와 특별히 다를 것이 없다. 최상단의 공간은 실행 명령 없이도 브라우저가 자동 실행하므로, **자바스크립트 파일이 열리는 순간 전역 스크립트가 활성화**된다고 이해하면 된다.

전역 컨텍스트와 관련된 코드들을 순차적으로 실행하다가 **(3)에서 `outer` 함수를 호출하면 `outer`에 대한 환경 정보를 수집해서 `outer` 실행 컨텍스트를 생성한 후 콜 스택에 담는다.** 콜 스택의 맨 위엔 `outer` 실행 컨텍스트가 놓였다. 전역 컨텍스트와 관련된 코드 실행을 일시 중단하고 `outer` 실행 컨텍스트와 관련된 `outer` 함수 내부 코드들을 순차로 실행한다.

(2)에서 `inner` 함수의 실행 컨텍스트가 콜 스택의 가장 위에 담기면 `outer` 컨텍스트와 관련된 코드 실행을 일시 중단하고 `inner` 실행 컨텍스트와 관련된 `inner` 함수 내부 코드들을 순차로 실행한다.

`inner` 함수 내부에서 `a` 에 3을 할당하고 나면 `inner`가 종료되며 `inner` 실행 컨텍스트가 콜 스택에서 제거된다. 콜 스택의 맨 위가 된 `outer`가 (2) 다음 줄의 `console.log(a)`를 실행하고 종료되어 콜 스택에서 제거되고, 콜 스택에선 전역 컨텍스트만 남게 돼 (3) 다음 줄의 `console.log(a)`를 실행하고 종료되어 콜 스택에서 제거된다. 이제 콜 스택에는 아무것도 남지 않았고 프로그램이 종료된다.

---

**한 실행 컨텍스트가 콜 스택의 맨 위에 쌓이는 순간이 곧 현재 실행할 코드에 관여하게 되는 시점**이다.

어떤 실행 컨텍스트가 활성화될 때 자바스크립트 엔진은 해당 컨텍스트에 관련된 코드들을 실행하는 데 필요한 환경 정보들을 수집해서 실행 컨텍스트 객체에 저장한다. 이 객체는 개발자가 코드를 통해 확인할 수 없으며, 다음과 같은 정보가 담긴다.

- `VariableEnvironment`: 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보
  - 선언 시점의 `LexicalEnvironment`의 스냅샷. 변경 사항이 반영되지 않는다.
- `LexicalEnvironment`: 처음에는 `VariableEnvironment`와 같지만, 변경 사항이 실시간 반영된다.
- `ThisBinding`: `this` 식별자가 바라봐야 할 대상 객체.

## 2.2 `VariableEnvironment`

`VariableEnvironment`에 담기는 내용은 `LexicalEnvironment`와 같지만 최초 실행 시의 스냅샷을 유지한다는 점이 다르다. 실행 컨텍스트를 생성할 때, `VariableEnvironment`에 정보를 먼저 담고, 이를 복사해 `LexicalEnvironment`를 만들고, 이후에는 `LexicalEnvironment`를 주로 활용한다.

`VariableEnvironment`와 `LexicalEnvironment`의 내부는 `environmentRecord`와 `outerEnvironmentReference`로 구성돼 있다. 초기화 과정 중에는 사실상 완전히 동일하고, 코드 진행에 따라 서로 달라지게 된다.

## 2.3 `LexicalEnvironment`

lexical environment에 대한 번역으로는 여러개가 있지만, ‘사전적인 환경’이라는 단어가 적합하다. “현재 컨텍스트의 내부에는 `a`, `b`, `c`와 같은 식별자들이 있고 그 외부 정보는 `D`를 참조하도록 구성되어 있다”와 같이, **컨텍스트를 구성하는 환경 정보들을 사전에서 접하는 느낌으로 모아놓은 것**이다.

### 2.3.1 `envrionmentRecord`와 호이스팅

`**environmentRecord`에는 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장**된다. 1) 컨텍스트를 구성하는 함수에 지정된 매개변수 식별자, 2) 선언한 함수가 있을 경우 그 함수 자체, 3) `var`로 선언된 변수의 식별자 등이 해당된다. 컨텍스트 내부 전체를 처음부터 끝까지 쭉 훑어나가며 **순서대로 수집\*\*한다.

> 전역 실행 컨텍스트는 변수 객체를 생성하는 대신 `window`, `global` 객체 등의 전역 객체를 활용한다.

변수 수집 과정을 모두 마쳐도 실행 컨텍스트가 관여할 코드들은 실행되기 전의 상태이다. 즉, **코드가 실행되기 전에 자바스크립트 엔진은 이미 해당 환경에 속한 코드의 변수명들을 모두 알고 있게 되는 셈**이다. 이를 **“식별자들을 최상단으로 끌어올려놓은 다음 실제 코드를 실행한다”**라고 이해하면 이것이 **“호이스팅 hoisting”**이다. 호이스팅은 이해하기 쉬우려고 만든 가상의 개념으로, 자바스크립트 엔진이 실제로 끌어올리지는 않지만 편의상 끌어올린 것으로 간주하는 것이다.

---

### 호이스팅 규칙

```js
function a(x) {
  console.log(x);
  var x;
  console.log(x);
  var x = 2;
  console.log(x);
}
a(1);

// 위와 아래는 LexicalEnvironment 입장에선 완전히 같음

function a() {
  var x = 1;
  console.log(x);
  var x;
  console.log(x);
  var x = 2;
  console.log(x);
}
a();
```

위와 아래 예제는 `argument`에 전달된 인자를 담는 것을 제외하면 코드 내부에서 변수를 선언한 것과 다른 점이 없다. `LexicalEnvironment`입장에선 완전히 같다. 즉, **인자를 함수 내부의 다른 코드보다 먼저 선언 및 할당이 이뤄진 것으로 간주**할 수 있다.

```js
function a() {
  var x;
  var x;
  var x;

  x = 1;
  console.log(x);
  console.log(x);
  x = 2;
  console.log(x);
}
a();
```

이 과정에서 호이스팅을 처리하면 위의 예제와 같다. `environmentRecord`는 어떤 식별자가 있느냐에 대해서만 관심이 있지, 식별자에 어떤 값이 할당되는지는 관심이 없다. 따라서 **할당 과정은 그 자리에 남겨둔 채 변수명만 끌어올린다.**

---

```js
function a() {
  console.log(b);
  var b = "bbb";
  console.log(b);
  function b() {}
  console.log(b);
}
a();
```

위의 예제를 호이스팅할 때, 함수 선언은 함수 전체를 끌어올린다. 호이스팅이 끝난 상태에서의 함수 선언문은 함수명으로 선언한 변수에 함수를 할당한 것처럼 여길 수 있다.

```js
function a() {
  var b;
  var b = function b() {};
  console.log(b); // function b() {}
  b = "bbb";
  console.log(b); // "bbb"
  console.log(b); // "bbb"
}
```

따라서 출력하면 `function b() {}`, `"bbb"`, `"bbb"`순으로 출력된다.

### 함수 선언문과 함수 표현식

함수 선언문 function declaration과 함수 표현식 function expression은 모두 함수를 새롭게 정의할 때 쓰이는 방식이다.

```js
function a() {
  /* ... */
} // 함수 선언문. 함수명 a가 변수명.
a(); // 실행됨

var b = function () {
  /* ... */
}; // 익명 함수 표현식. 변수명 b가 함수명.
b(); // 실행됨

var c = function d() {
  /* ... */
}; // 기명 함수 표현식. 변수명 c, 함수명 d.
c(); // 실행됨
d(); // 에러
```

- 함수 선언문은 `function` 정의부만 존재하고 별도의 할당 명령이 없다.
  - 반드시 함수명이 정의돼 있어야 한다.
- 함수 표현식은 정의한 `function`을 별도의 변수에 할당하는 것을 말한다.
  - 함수명이 없어도 된다. 이를 “익명 함수 표현식”이라고 한다. 일반적으로 함수 표현식은 익명 함수 표현식이다.
  - 과거에는 익명 함수 표현식은 함수명으로 `undefined`, `unnamed`를 출력하곤 해서 기명 함수 표현식을 사용했으나, 지금은 모든 브라우저가 익명 함수 표현식의 변수명을 함수의 `name` 프로퍼티에 할당한다. 따라서 오늘날의 함수 표현식은 대부분 익명 함수 표현식이다.

---

```js
console.log(sum(1, 2));
console.log(multiply(3, 4));

function sum(a, b) {
  return a + b;
}

var multiply = function (a, b) {
  return a * b;
};

// 호이스팅을 거치면 아래와 같음

var sum = function sum(a, b) {
  return a + b;
};
var multiply;

console.log(sum(1, 2)); // 3
console.log(multiply(3, 4)); // multiply is not a function

multiply = function (a, b) {
  return a * b;
};
```

함수 선언문으로 정의한 함수는 함수 전체를 호이스팅한 반면, 함수 표현식으로 정의한 함수는 변수 선언부만 호이스팅했다. 즉, **함수 표현식은 함수를 다른 변수에 값으로써 할당한 것**이다. 이 결과로 `sum` 함수는 선언 전에 호출해도 시행되지만, `multiply` 함수는 선언 전에 호출하면 에러가 난다.

동일한 함수명을 함수 선언문의 형식으로 중복 선언할 경우 맨 마지막에 선언된 함수가 이전의 함수를 호이스팅 과정에서 덮어쓰게 된다. 즉, 프로그램이 실행되며 실제로 실행되는 함수는 맨 마지막에 선언된 함수가 된다. 함수 표현식으로 작성하면 이러한 문제를 막을 수 있다.

### 2.3.2 스코프, 스코프 체인, `outerEnvironmentReference`

스코프 scope: 식별자에 대한 유효범위.

어떤 경계 A 외부에서 선언한 변수는 A의 내부·외부에서 모두 접근이 가능하지만, A 내부에서 선언한 변수는 A 내부에서만 접근 가능하다. ES5까지의 자바스크립트에서는 전역공간을 제외하면 **오직 함수에 의해서만 스코프가 생성**됐다. 이후 ES6에서 `let`, `const`, strict mode에서의 함수 선언 등에 대해서 블록에 의해서 스코프 경계가 발생하도록 했다.

식별자의 유효범위를 안에서부터 바같으로 차례로 검색해나가는 것을 ‘스코프 체인 scope chain’이라고 하고, 이를 가능하게 하는 것이 `LexicalEnvironment`의 두번째 수집 자료인 `outerEnvironmentReference`다.

### 스코프 체인

`outerEnvironmentReference`는 현재 호출된 함수가 **선언될 당시**의 `LexicalEnvironment`를 참조한다.

A 함수 안의 B 함수 안의 C 함수의 형식으로 선언했다고 가정하자. B의 `outerEnvironmentReference`는 A의 `LexicalEnvironment`를 참조하고, C의 `outerEnvironmentReference`는 B의 `LexicalEnvironment`를 참조한다. `outerEnvironmentReference`는 연결 리스트의 형태를 띤다. 각 `outerEnvironmentReference`는 선언 시점의 `LexicalEnvironment`만을 참조하므로 가장 가까운 요소부터 차례대로만 접근할수 있다. 따라서 여러 스코프에서 동일한 식별자를 선언한 경우에는 **무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능**하다.

---

```js
var a = 1;
var outer = function () {
  var inner = function () {
    console.log(a); // LexicalEnvironment(inner 함수의 호이스팅)때문에 undefined 출력
    var a = 3;
  };
  inner();
  console.log(a); // outerEnvironmentReference(전역 컨텍스트)때문에 1 출력
};
outer();
console.log(a); // LexicalEnvironment(전역 컨텍스트)때문에 1출력
```

식별자 `a`는 전역 공간에서도 선언했고 `inner` 함수 내부에서도 선언했다. `inner` 함수 내부에서 `a`에 접근하려고 하면 **무조건 스코프 체인 상의 첫 번째 인자인 `inner` 함수의 `LexicalEnvironment` 부터 접근**해야 한다. `inner` 함수는 호이스팅을 통해 `LexicalEnvironment`에 식별자 `a`가 들어가 있는 상황이므로 전역 공간에서의 값이 아닌 `undefined`를 반환한다. 즉, `**a`는 맥락에 따라 전역변수인지, 지역변수인지가 갈리게 되는 것\*\*이다.

즉, `inner` 함수 내부에서 `a` 변수를 선언했기 때문에 **전역 공간에서 선언한 동일한 이름의 `a` 변수에는 접근할 수 없으며**, 이를 **변수 은닉화**라고 한다.

- 질문
  1. `var a = 3`을 `a = 3`으로 바꾸면?
     1. 호이스팅이 일어나지 않으므로 `inner`에선 `outerEnvironmentReference`를 타고 올라가 전역 공간의 값인 1을 출력한다.
     2. 이후 전역 변수 `a`의 값을 3으로 재할당한다.
     3. `outer`와 전역 공간에서는 바뀐 값인 3을 출력한다.
  2. `var`를 모두 `let`으로 바꾸면?
     1. `let`은 한 변수에 값을 재할당할 수는 있지만, 같은 이름의 변수 식별자를 재선언할 수 없다.
     2. 따라서 전역 공간에서 `let a = 1;`을 선언한 뒤, `inner`에서 `let a = 3;`을 재선언하는 순간 에러가 발생한다.

### 전역변수와 지역변수

위의 예제에서 전역 변수는 전역 스코프에서 선언한 `a`와 `outer` 둘이다. 지역 변수는 `outer` 함수 내부에서 선언한 `inner`와 `inner` 함수 내부에서 선언한 `a`다. 즉, 함수 내부에서 선언한 변수는 무조건 지역변수이다.

함수 선언문으로 선언할 때 덮어쓰는 것을 방지하기 위해 함수 표현식을 사용할 수도 있지만, 지역변수로 만든다면 훨씬 더 안전하다. 함수 `a`를 지역변수로 만들기 위해 새로운 함수 `x`를 만드는 순간, `a`는 `x` 내부에서만 접근 가능하다. `a`를 호출하는 다른 코드들도 `x`로 옮겨야만 하고, 이 코드들은 전역 공간에서 접근할 수 없게된다.

코드의 안전성을 위해 가급적 전역변수 사용을 최소화하고자 노력하는 것이 좋다. 이를 위한 패턴으로 즉시실행함수 활용, 네임스페이스, 모듈 패턴, 샌드박스 패턴 등이 대표적이다. 모듈관리 도구인 AMD, CommonJS, ES6의 모듈 등도 이와 관련한 역할을 수행한다.

## 2.4 `this`

실행 컨텍스트의 `thisBinding`에는 `this`로 지정된 객체가 저장된다. 실행 컨텍스트 활성화 당시 `this`가 지정되지 않았다면 `this`에 전역 객체가 저장된다. 그외에 함수를 호출하는 방법에 따라 `this`에 저장되는 대상이 다르다. 이에 관해선 3장에서 다룬다.
