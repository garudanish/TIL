# 4장 콜백 함수

콜백 함수는 다른 코드의 인자로 넘겨주는 함수이다. 콜백 함수를 넘겨받은 코드는 이 콜백 함수를 필요에 따라 적절한 시점에 실행한다.

콜백 함수는 제어권과 관련이 깊다. 어떤 함수 X를 호출하면서 "특적 조건일 때 함수 Y를 실행해서 나에게 알려달라"라는 요청을 함께 보내는 것이다. 이러한 요청을 받은 함수 X는 해당 조건이 갖춰졌는지 여부를 스스로 판단하고 Y를 직접 호출한다.

즉, 콜백 함수는 다른 코드(함수, 메서드)에게 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수이다. 콜백 함수를 위임받은 코드는 자체적인 내부 로직에 의해 이 콜백 함수를 적절한 시점에 실행한다.

## 4.2 제어권

### 4.2.1 호출 시점

`setInterval()` 의 구조는 다음과 같다.

```js
var intervalID = scope.setInterval(func, delay[, param1, param2, ...]);
```

`scope`에는 `Window` 객체 또는 `Worker`의 인스턴스가 들어올 수 있다. 두 객체 모두 `setInterval()` 메서드를 제공한다. 일반적인 브라우저 환경에서는 `window`를 생략하고 함수처럼 사용할 수 있다. 매개변수로는 함수 `func`와 밀리초 단위 시간인 `delay`가 필수이고, 세 번째 매개변수부터는 함수에 넘겨줄 인자로, 선택적이다.

`func`로 넘겨준 함수는 매 `delay`마다 실행되며, 어떠한 값도 리턴하지 않는다. `setInterval`을 실행하면 반복적으로 실행되는 내용 자체를 특정할 수 있는 고유한 `ID` 값이 반환되는데, 이를 `intervalID`와 같은 변수에 담는 이유는 반복 실행되는 중간에 종료(`clearInterval`)할 수 있게하기 위해서이다.

```js
var count = 0;
var cbFunc = function () {
  console.log(count);
  if (++count > 4) clearInterval(timer);
};
var timer = setInterval(cbFunc, 300);
```

위 예제를 실행하면 0.3초(300 밀리초)마다 0부터 4까지 출력한 뒤 실행을 종료한다. `timer` 변수에는 `setInterval`의 `ID` 값이 담신다. `setInterval`의 첫 인자인 `cbFunc`가 두 번째 인자인 300 밀리초마다 자동으로 실랭된다. 콜백 함수 내부를 보면, `count` 값을 출력하고, `count`를 1만큼 증가시킨다음, 그 값이 4보다 크면 반복 실행을 종료한다.

---

| code                       | 호출 주체     | 제어권        |
| -------------------------- | ------------- | ------------- |
| `cbFunc()`                 | 사용자        | 사용자        |
| `setInterval(cbFunc, 300)` | `setInterval` | `setInterval` |

`setInterval` 이라고 하는 "다른 코드"에 첫 인자로 `cbFunc`를 넘겨줬더니, 제어권을 넘겨받은 `setInterval`이 스스로에 판단에 따라 적절한 시점인 0.3초마다 `cbFunc`를 실행했다. 콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수 호출 시점에 대한 제어권을 가진다.

### 4.2.2 인자

`Array`의 `prototype`에 담긴 `map` 메서드의 구조는 다음과 같다.

```js
Array.prototype.map(callback[, thisArg])
callback: function(currentValue, index, array)
```

`map` 메서드는 첫 인자로 `callback` 함수를 받고, 생략 가능한 두 번째 인자로 콜백 함수 내부에서 `this`로 인식할 대상을 특정할 수 있다. `thisArg`를 생략하면 일반 함수와 마찬가지로 전역객체가 바인딩된다.

`map` 메서드는 메서드의 대상이 되는 배열의 모든 요소들을 처음부터 끝까지, 하나씩 콜백 함수를 반복 호출하고 실행 결과들을 모아 새로운 배열을 만든다. 콜백 함수의 첫 인자에는 배열의 요소 중 현재값, 두 번째 인자에는 현재 값의 인덱스, 세 번째 인자에는 `map` 메서드의 대상이 되는 배열 자체가 담긴다.

```js
var newArr = [10, 20, 30].map(function (currentValue, index) {
  console.log(currentValue, index);
  return currentValue + 5;
});
// 10 0
// 20 1
// 30 2

console.log(newArr); // [15, 25, 35]
```

위 예제를 실행하면, 배열 `[10, 20, 30]`의 각 요소를 처음부터 끝까지, 하나씩 콜백 함수를 실행한다. 인덱스 0에 대한 콜백 함수는 `currentValue`에 `10`이, `index`에 `0`이 들어가 실행되며, 각 값을 출력하고, 5를 더한 `15`가 리턴된다. 이 방식으로 인덱스 2에 대한 콜백 함수까지 마치고 나면, `[15, 25, 35]`라는 새 배열이 만들어져 변수 `newArr`에 담기고, 이 값이 로그에 출력된다.

이 때, 콜백 함수의 인자인 `currentValue`와 `index`라는 "이름"은 사용자의 뜻대로 바꿀 수 있지만, 그것의 순서는 정의된 대로 사용해야만 한다. 컴퓨터는 첫 번째, 두 번째 등의 **순서**에 의해서만 각 인자를 구분하고 인식한다. 즉, `map` 메서드를 호출해서 원하는 배열을 얻으려면 **`map` 메서드에 정의된 규칙에 따라 함수를 작성**해야 한다. 그 정의된 규칙에는 콜백 함수의 인자로 넘어올 값들 및 그 값들의 순서도 포함돼 있다.

콜백 함수를 호출하는 주체는 사용자가 아닌 `map` 메서드이다. 따라서 `map` 메서드가 콜백 함수를 호출할 때 인자에 어떤 값들을, 어떤 순서로 넘길 것인지는 `map` 메서드에게 달려 있다.

이처럼 콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수를 호출할 때 **인자에 어떤 값들을 어떤 순서로 넘길 것인지에 대한 제어권**을 가진다.

### 4.2.3 `this`

3장엔 콜백 함수도 함수이기 때문에 기본적으로 `this`가 전역객체를 참조하지만, 제어권을 넘겨받을 코드에서 콜백 함수에 별도로 `this`가 될 대상을 지정한 경우에는 그 대상을 참조하게 된다고 쓰여 있다.

이를 이해하기 위해 `map` 메서드를 동작 원리를 이해하는 것을 목표로 핵심 내용만 구현해서 작성하면 다음과 같다.

```js
Array.prototype.map = function (callback, thisArg) {
  var mappedArr = [];
  for (var i = 0; i < this.length; i++) {
    var mappedValue = callback.call(thisArg || window, this[i], i, this);
    mappedArr[i] = mappedValue;
  }
  return mappedArr;
};
```

이때 핵심은 `call`/`apply` 메서드에 있다. `this`에는 `thisArg` 값이 있을 경우에는 그 값이, 없을 경우에는 전역객체를 지정한다. 첫 번째 인자는 `this`가 배열을 가리키므로 배열의 `i` 번째 요소 값을, 두 번째 인자에는 `i` 값을, 세 번째 인자에는 배열 자체를 지정해 호출한다. 그 결과가 `mappedValue`에 담겨 `mappedArr`의 `i`번째 인자에 할당된다.

제어권을 넘겨받을 코드(`map`)에서 `call`/`apply` 메서드의 첫 인자에 콜백 함수 내부에서의 `this`가 될 대상을 `thisArg`라는 명시적인 대상으로 바인딩하는 것을 볼 수 있다.

```js
setTimeout(function () {
  console.log(this); // Window { ... }
}, 300);

[1, 2, 3, 4, 5].forEach(function (x) {
  console.log(this); // Window { ... }
});

documnet.body.innerHTML += "<button id='a'>클릭</button>";
documnet.body.querySelector("#a").addEventListener("click", function (e) {
  console.log(this, e);
});

// <button id='a'>클릭</button>
// MouseEvent { ... }
```

1. `setTimeout`은 내부에서 콜백 함수를 호출할 때 `call` 메서드의 첫 인자로 전역 객체를 넘긴다. 따라서 콜백 함수 내부에서의 `this`가 전역 객체를 가리킨다.
2. `forEach`는 별도의 인자로 `this`를 받지만, 지정해주지 않았다. 따라서 `this`가 전역 객체를 가리킨다.
3. `addEventListener`는 내부에서 콜백 함수를 호출할 때 `call` 메서드의 첫 인자에 `addEventlistener` 메서드의 `this`를 그대로 넘기도록 정의돼 있다. 따라서 콜백 함수 내부에서의 `this`가 `addEventListener`를 호출한 주체인 HTML 엘리먼트를 가리킨다.

## 4.3 콜백 함수는 함수다

콜백 함수는 함수다. 이는 콜백 함수로 어떤 객체의 메서드를 전달하더라도, 그 메서드는 메서드로서 호출되는 것이 아니라 함수로서 호출된다는 것을 의미한다.

```js
var obj = {
  vals: [1, 2, 3],
  logValues: function (v, i) {
    console.log(this, v, i);
  },
};
obj.logValues(1, 2); // obj 1 2
[4, 5, 6].forEach(obj.logValues);

// Window 4 0
// Window 5 1
// Window 6 2
```

`obj` 객체의 `logValues`는 메서드로 정의됐고, `obj.logValues(1, 2)`는 메서드로서 호출되었다. 이 때 `this`는 `obj`를 가리킨다. 하지만 `forEach`의 콜백 함수로 호출된 `obj.logValues`는 `obj`를 `this`로 하는 메서드를 그대로 전달한 것이 아니라, **`obj.logValues`가 가리키는 함수만** 전달한 것이다. 메서드로 호출한 것이 아니라 함수로서 호출된 것이고, `this`를 별도로 지정해주지 않았으므로 `this`는 전역 객체에 바인딩 된다.

## 4.4 콜백 함수 내부의 `this`에 다른 값 바인딩하기

별도의 인자로 `this`를 받지 않는 함수에서 콜백 함수 내부의 `this`에 다름 값을 바인딩하는 방법으로, 전통적으로는 `this`를 다른 변수에 담아 콜백 함수로 활용할 함수에서는 `this` 대신 그 변수를 사용하게 하고, 이를 클로저로 만드는 방식이 많이 쓰였다.

```js
var obj1 = {
  name: "obj1",
  func: function () {
    var self = this;
    return function () {
      console.log(self.name);
    };
  },
};
var callback = obj1.func();
setTimeout(callback, 1000);
```

`obj1.func` 메서드 내부에서 `self` 변수에 `this`를 담고, 익명 함수를 선언함과 동시에 반환했다. `obj1.func()`의 실행 결과인 익명함수는 `callback` 변수에 담기고, 이 콜백 함수가 `setTimeout` 함수에 인자로 전달돼 1초 뒤에 실행되면서 `self.name`인 `"obj1"`을 출력한다.

`self.name` 대신 `obj1.name`을 작성할 수도 있지만, 그렇게 하면 다른 객체에서 함수를 재활용하기가 어려워진다. 위의 방식대로 작성하면 다른 객체에서도 재활용할 수 있다는 장점이 있다.

```js
var obj2 = {
  name: "obj2",
  func: obj1.func,
};
var callback2 = obj2.func();
setTimeout(callback2, 1000);

var obj3 = {
  name: "obj3",
};
var callback3 = obj1.func.call(obj3);
setTimeout(callback3, 1000);
```

`bind` 메서드를 사용하면 이 방법을 보완할 수 있다.

```js
var obj1 = {
  name: "obj1",
  func: function () {
    console.log(this.name);
  },
};
setTimeout(obj1.func.bind(obj1), 1000);

var obj2 = { name: "obj2" };
setTimeout(obj1.func.bind(obj2), 1000);
```

## 4.5 콜백 지옥과 비동기 제어

콜백 지옥은 콜백 함수를 익명 함수로 전달하는 과정이 반복되어 코드의 들여쓰기가 깊어지는 현상으로, 흔히 발생하는 문제이다. 이벤트 처리, 서버 통신 등 비동기적인 작업을 수행하기 위해 이런 형태가 자주 등장하는데, 가독성이 떨어지고 코드 수정도 어렵다.

비동기적인 코드는 현재 실행 중인 코드의 완료 여부와 무관하게 즉시 다음 코드로 넘어간다. CPU의 계산에 의해 즉시 처리가 가능한 대부분의 코드는, 시간이 많이 필요하더라도 동기적인 코드이다. 비동기적인 코드의 예시로는, 사용자의 요청에 의해 일정 시간 실행을 보류(`setTimeout`)하거나, 사용자의 직접적 개입이 있을 때 실행(`addEventListener`)하거나, 웹브라우저 자체가 아닌 별도의 대상에 무언가를 요청하고 그에 대한 응답이 왔을 때 실행하도록 대기(`XMLHttpRequest`)하는 등이다. 즉, **별도의 요청, 실행 대기, 보류 등과 관련된 코드는 비동기적인 코드**이다.

현대의 자바스크립트는 웹의 복잡도가 높아진 만큼 비동기적인 코드의 비중이 훨씬 높아졌다. 따라서 콜백 지옥에 빠지기도 훨씬 쉬워졌다.

```js
setTimeout(
  function (name) {
    var coffeeList = name;
    console.log(coffeeList);

    setTimeout(
      function (name) {
        coffeeList += ", " + name;
        console.log(coffeeList);

        setTimeout(
          function (name) {
            coffeeList += ", " + name;
            console.log(coffeeList);

            setTimeout(
              function (name) {
                coffeeList += ", " + name;
                console.log(coffeeList);
              },
              500,
              "카페라떼"
            );
          },
          500,
          "카페모카"
        );
      },
      500,
      "아메리카노"
    );
  },
  500,
  "에스프레소"
);
```

0.5초 주기마다 커피 목록을 수집하고 출력한다. 각 콜백은 커피 이름을 전달하고 목록에 이름을 추가한다. 들여쓰기 수준이 과도하게 깊고, 값이 전달되는 순서가 아래에서 위로 향해 어색하다. 이를 해결하는 가장 간단한 방법은 익명 콜백 함수를 전부 기명함수로 전환하는 방법이다.

```js
var coffeeList = "";

var addEspresso = function (name) {
  coffeeList = name;
  console.log(coffeeList);
  setTimeout(addAmericano, 500, "아메리카노");
};
var addAmericano = function (name) {
  coffeeList = name;
  console.log(coffeeList);
  setTimeout(addMocha, 500, "카페모카");
};
var addMocha = function (name) {
  coffeeList = name;
  console.log(coffeeList);
  setTimeout(addLatte, 500, "카페라떼");
};
var addLatte = function (name) {
  coffeeList = name;
  console.log(coffeeList);
};

setTimeout(addEspresso, 500, "에스프레소");
```

이 방식은 가독성을 높이고, 함수 선언과 호출을 구분하면 위에서 아래로 순서대로 읽을 수 있다. 하지만 일회성 함수를 전부 변수에 할당해야 한다. 이러한 비동기적인 작업을 동기적으로, 혹은 동기적인 것처럼 보이게끔 처리해주는 장치로 ES6에서는 `Promise`, `Generator` 등이 도입됐고, ES2017에서는 `async`/`await`가 도입됐다.

```js
new Promise(function (resolve) {
  setTimeout(function () {
    var name = "에스프레소";
    console.log(name);
    resolve(name);
  }, 500);
})
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + ", 아메리카노";
        console.log(name);
        resolve(name);
      }, 500);
    });
  })
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + ", 카페모카";
        console.log(name);
        resolve(name);
      }, 500);
    });
  })
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + ", 카페라떼";
        console.log(name);
        resolve(name);
      }, 500);
    });
  });
```

`Promise`는 `new` 연산자와 호출한다. 인자로 넘겨주는 콜백 함수는 호출할 때 바로 실행되지만, 그 내부에 `resolve`, `reject` 함수를 호출하는 구문이 있을 경우 둘 중 하나가 실행되기 전까지는 다음(`then`) 또는 오류 구문(`catch`)으로 넘어가지 않는다. 따라서 비동기 작업이 완료될 때 비로소 `resolve`, `reject`를 호출하는 방법으로 비동기 작업의 동기적 표현이 가능하다.
