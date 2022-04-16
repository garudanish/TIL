# 5장 클로저

## 5.1 클로저의 의미 및 원리 이해

클로저는 여러 함수형 프로그래밍 언어에서 등장하는 보편적인 특성이다. 즉, 클로저는 JS의 고유 개념이 아니며, 따라서 ECMAScript 명세에서도 정의를 다루고 있지 않다.

MDN은 클로저를 "A closure is the combination of a function and the lexical environment within which that function was declared."라는 문장으로 설명한다. "클로저는 함수와, 그 함수가 선언될 당시의 lexical environment의 상호관계에 따른 현상"로 직역할 수 있다.

'선언될 당시의 lexical environment'란 책의 2장에서 설명한 실행 컨텍스트 중 `outerEnvironmentReference`에 해당한다. 어떤 컨텍스트 A에서 선언한 내부함수 B의 실행 컨텍스트가 활성화된 시점에는, B의 `outerEnvironmentReference`가 참조하는 대상인 A의 `LexicalEnvironment`에도 접근이 가능하다. 즉, A에서는 내부함수 B에서 선언한 변수에 접근할 수 없지만, B에서는 A에서 선언한 변수에 접근 가능하다. 따라서 설명에서의 "combination-상호작용"이란, 내부함수에서 외부 변수를 참조하는 경우를 가리킬 것이다.

```js
var outer = function () {
  var a = 1;
  var inner = function () {
    console.log(++a); // 2
  };
  inner();
};
outer();
```

`outer` 함수에서 변수 `a`를 선언했고, 내부함수 `inner`에서 `a`의 값을 1 증가시켜 출력한다. `a`는 `inner` 함수 내부에 없으므로 `outerEnvironmentReference`에 지정된 상위 컨텍스트인 `outer`의 `LexicalEnvironment`에서 `a`를 찾는다. 2가 출력되고, `outer` 함수의 실행 컨텍스트가 종료되면 `LexicalEnvironment`에 저장된 식별자들(`a`, `inner`)에 해당된 참조를 지우고, 해당 주소에 저장돼 있던 값들은 가비지 컬렉터의 수집 대상이 될 것이다.

```js
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner();
};
var outer2 = outer();
console.log(outer2); // 2
```

위 예제 역시 `inner` 함수에서 외부 변수 `a`를 사용하고 있지만, `outer`의 리턴 값이 `inner` 함수를 실행한 값이므로, 결론적으로 `outer` 함수의 실행 컨텍스트가 끝나면 `a` 변수를 참조하는 대상이 없어진다. 따라서 언젠간 `a`, `inner` 변수의 값들이 가비지 컬렉터에 의해 사라진다.

두 예제는 모두 `outer` 함수의 실행 컨텍스트가 종료되기 이전에 `inner` 함수의 실행 컨텍스트가 종료되어 있으며, 이후 별도로 `inner` 함수를 호출할 수 없다는 공통점이 있다.

```js
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};
var outer2 = outer();
console.log(outer2()); // 2
console.log(outer2()); // 3
```

이번엔 `outer` 함수에서 반환하는 값이 `inner` 함수를 실행한 값이 아니라, **`inner` 함수 자체**이다. `outer2` 변수는 `outer` 함수의 반환값인 `inner` 함수를 참조한다. 따라서 `outer2`를 호출하면 `inner` 함수가 실행된다. `inner` 함수의 실행 컨텍스트의 `environmentRecord`에는 수집할 정보가 없고, `outerEnvironmentReference`는 `inner` 함수가 선언된 위치인 `outer` 함수의 `LexicalEnvironment`가 담긴다.

`outer2()`를 실행하면 `inner` 함수에서부터 스코프 체이닝을 따라 `outer`에 있던 변수인 `a`에 접근해 1을 증가시켜 2를, 한 번 더 실행하면 3을 반환한다. 이는, 이미 `outer`가 종료된 상태임에도 `outer` 함수의 `LexicalEnvironment`에 접근하고 있음을 뜻한다. 이러한 동작을 하는 이유는 가비지 컬렉터의 동작 방식 때문이다.

가비지 컬렉터는 어떤 값을 참조하는 변수가 하나라도 있다면 그 값은 수집 대상에 포함시키지 않는다. `outer` 함수가 `inner` 함수 자체를 반환하면서, `outer` 함수가 끝났더라도 `outer2`를 통해 `inner` 함수가 호출될 가능성이 생겼다. 즉, 만일 `inner` 함수의 실행 컨텍스트가 활성화되면 `inner`의 `outerEnvironmentReference`가 `outer`의 `LexicalEnvironment`를 필요로 할 것이기에, 가비지 컬렉터의 수집 대상에 포함되지 않는 것이다. 따라서 `outer`가 끝난 뒤에서 `inner`는 `a`에 접근할 수 있다.

함수의 실행 컨텍스트가 종료된 후에도 `LexicalEnvironment`가 가비지 컬렉터의 수집 대상에서 제외되는 경우는, **지역변수를 참조하는 내부 함수가 외부로 전달된 경우가 유일**하다.

즉, 클로저는 **어떤 함수 `A`에서 선언한 변수 `a`를 참조하는 내부함수 `B`를 외부로 전달할 경우, `A`의 실행 컨텍스트가 종료된 이후에도 변수 `a`가 사라지지 않는 현상** 이다. 이때, '외부로 전달'하는 방식이 반드시 `return` 만이 아닌 것에 유의한다.

```js
// (1)
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId);
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();

// (2)
(function () {
  var count = 0;
  var button = document.createElement("button");
  button.innerText = "click";
  button.addEventListener("click", function () {
    console.log(`${++count} times clicked`);
  });
  document.body.appendChild(button);
})();
```

(1)은 외부 객체 `window`의 메서드인 `setTimeout` 또는 `setInterval`에 전달할 콜백 함수 내부에서 지역변수를 참조한다. (2)는 외부 객체 DOM의 메서드(`addEventListener`)에 등록할 `handler` 함수 내부에서 지역변수를 참조한다. 두 상황 모두 지역변수를 참조하는 내부 함수를 외부에 전달했기 때문에 `return`을 사용하지 않았더라도 클로저이다.

## 5.2 클로저와 메모리 관리

메모리 소모는 클로저의 본질적인 특성이다. 이러한 특성을 정확히 이해하고 잘 활용하도록 노력해야 한다. 과거에는 의도치 않게 메모리 누수가 발생하는 상황들이 있었지만, 오늘날 자바스크립트 엔진에서는 대부분 해결되었으므로, 클로저를 사용할 때는 특정 조건을 만족하면 의도적으로 참조 카운트가 0이 되도록 설계하는 것이 좋다.

클로저는 어떤 필요에 의해, 의도적으로 함수의 지역변수를 메모리를 소모하도록 함으로써 발생한다. 즉, 필요성이 사라진 시점에는 메모리를 소모하지 않도록 참조 카운트를 0으로 만든다. 참조 카운트를 0으로 만드는 방법은 식별자에 참조형이 아닌 기본형 데이터(보통 `null`이나 `undefined`)을 할당하면 된다.

```js
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};
console.log(outer()); // 2
console.log(outer()); // 3
outer = null; // outer 식별자의 inner 함수 참조를 끊음
```

```js
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId);
      inner = null; // inner 식별자의 함수 참조를 끊음
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();
```

```js
(function () {
  var count = 0;
  var button = document.createElement("button");
  button.innerText = "click";

  var clickHandler = function () {
    console.log(`${++count} times clicked`);
    if (count >= 10) {
      button.removeEventListener("click", clickHandler);
      clickHandler = null; // clickHandler 식별자의 함수 참조를 끊음
    }
  };
  button.addEventListener("click", clickHandler);
  document.body.appendChild(button);
});
```
