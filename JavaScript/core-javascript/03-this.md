# 3장 `this`

대부분의 객체지향 언어에서 `this`는 클래스로 생성한 인스턴스 객체를 의미하며, 클래스에서만 사용 가능하다. 하지만 자바스크립트에서 `this`는 어디서든 사용할 수 있으며, 상황에 따라 `this`가 바라보는 대상이 달라져 혼란을 야기한다. 함수와 객체(메서드)의 구분이 느슨한 자바스크립트에서 `this`는 실질적으로 이 둘을 구분하는 거의 유일한 기능이다.

## 3.1 상황에 따라 달라지는 `this`

자바스크립트에서 `this`는 기본적으로 실행 컨텍스트가 생성될 때 함께 결정된다. 실행 컨텍스트는 함수를 호출할 때 생성되므로, **`this`는 함수를 호출할 때 결정된다**고 할 수 있다. 함수를 어떤 방식으로 호출하느냐에 따라 값이 달라진다.

### 3.1.1 전역공간에서의 `this`

**전역 공간에서 `this`** 는 개념상 전역 컨텍스트를 생성하는 주체인 **전역 객체**를 가리킨다. 브라우저 환경에서 전역 객체는 `window`이고, Node.js 환경에서 전역 객체는 `global`이다.

전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로도 할당한다.

```js
var a = 1;
console.log(a); // 1
console.log(window.a); // 1
console.log(this.a); // 1
```

**자바스크립트의 모든 변수는 특정 객체의 프로퍼티**로서 동작한다. 이때 특정 객체란 실행 컨텍스트의 `LexicalEnvironment`(이하 `L.E`)이다. 실행 컨텍스트는 변수를 수집해 `L.E`의 프로퍼티로 저장한다. 이후 어떤 변수를 호출하면 `L.E`를 조회해 일치하는 프로퍼티가 있을 경우 그 값을 반환한다. 전역 컨텍스트의 경우 `L.E`는 전역객체를 그대로 참조한다.

따라서, 전역 공간에서는 `var`로 변수를 선언하는 대신 `window`의 프로퍼티에 직접 할당하더라도 결과적으론 대부분 똑같이 동작한다. 단, 삭제하는 경우는 다르게 동작한다.

전역 객체의 프로퍼티로 할당한 경우는 삭제가 되지만, `var`로 변수를 선언하는 경우는 삭제가 되지 않는다. 전역변수를 선언하면, 1) 자바스크립트 엔진이 자동으로 전역객체의 프로퍼티로 할당하면서 2) 해당 프로퍼티의 `configurable` 속성(변경 및 삭제 가능성)을 `false`로 정의한다.

이처럼 `var`로 선언한 전역변수와 전역객체의 프로퍼티는 호이스팅 여부 및 `configurable` 여부에서 차이를 보인다.

### 3.1.2 메서드로서 호출할 때 그 메서드 내부에서의 `this`

#### 함수 vs. 메서드

함수를 실행하는 일반적인 방법 두 가지는 1) 함수로서 호출하는 경우, 2) 메서드로서 호출하는 경우이다. 이 둘을 구분하는 유일한 차이는 **독립성**이다. 함수는 그 자체로 독립적인 기능을 수행하고, 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행한다. 자바스크립트는 이를 상황별로 `this` 키워드에 다른 값을 부여하게 함으로써 이를 구현한다.

어떤 함수를 객체의 프로퍼티에 할당한다고 그 자체로 무조건 메서드가 되는 것은 아니다. **객체의 메서드로서 함수를 호출할 경우에만 메서드로 동작**하고, 그렇지 않으면 함수로 동작한다.

```js
var func = function (x) {
  console.log(this, x);
};
func(1); // Window { ... } 1

var obj = {
  method: func,
};
obj.method(2); // { method: f } 2
```

함수는 하나인데 이를 변수에 담아 호출한 경우는 `this`가 전역객체이고, 객체의 프로퍼티에 할당해 호출한 경우의 `this`는 메서드가 담긴 객체이다.

함수와 메서드를 구분하는 방법은 함수 앞에 점(`.`)이 있는지 여부다. 대괄호 표기법에 따른 경우도 메서드로서 호출한 것이다. 두 방법 중 뭐든, 어떤 함수를 호출할 때 함수의 이름 앞에 객체가 명시돼있는 경우는 메서드로서 호출한 것이다.

#### 메서드 내부에서의 `this`

`this`에는 호출한 주체에 대한 정보가 담긴다. 어떤 함수를 메서드로서 호출할 때, 호출 주체는 함수명 앞의 객체이다.

### 3.1.3 함수로서 호출할 때 그 함수 내부에서의 `this`

#### 함수 내부에서의 `this`

어떤 함수를 **함수로서 호출할 경우에는 `this`가 지정되지 않는다**. 함수로서 호출하는 것은 호출 주체(객체 지향에서의 객체)를 명시하지 않고 개발자가 코드에 직접 관여해 실행한 것이기 때문에 호출 주체의 정보를 알 수 없기 때문이다. 실행 컨텍스트를 활성화할 당시에 `this`가 지정되지 않은 경우 `this`는 전역 객체를 바라보므로, **함수에서의 `this`는 전역 객체**를 가리킨다.

#### 메서드의 내부함수에서의 `this`

메서드 내부에서 정의하고 실행한 함수 역시 함수로서 호출했는지 메서드로서 호출했는지만 파악하면 `this`의 값을 맞출 수 있다.

```js
var obj1 = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    };
    innerFunc(); // window

    var obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod(); // obj2
  },
};
obj1.outer(); // obj1
```

`obj1.outer()`, `obj2.innerMethod()`는 메서드로서 호출되었기 때문에 `this`가 해당 함수를 호출하는 객체를 가리키고, `innerFunc()`는 함수로서 호출되었기 때문에 `this`가 전역객체를 가리킨다.

특히, `innerFunc` 함수와 `innerMethod` 메서드는 같은 함수임에도 호출하는 구문 앞에 점 또는 대괄호 표기가 있느냐 없느냐에 따라 함수로 호출하는 것인지, 메서드로 호출하는 것인지 나뉘고, 그에 따라 `this`가 가리키는 대상이 달라졌다.

#### 메서드의 내부 함수에서의 `this`를 우회하는 방법

위의 방법을 따른다면 `this`가 가리키는 대상은 명확히 할 수 있지만, 그 대상이 `this`라는 단어의 인상과는 달라졌다. 스코프 체인에서 변수를 검색하면 가장 가까운 스코프의 `L.E`를 찾고 없으면 상위 스코프를 탐색하듯이, `this` 역시 현재 컨텍스트에 바인딩된 대상이 없으면 직전 컨텍스트의 `this`를 바라보는 것이 자연스럽고 설득력 있다. 하지만 어색하다고 하더라도 언어의 특성이므로 받아들일 수밖에 없었다.

ES5까지는 자체적으로 내부함수에 `this`를 상속할 방법이 없었다. 하지만 이를 우회하는 방법으로 변수를 활용했다.

```js
var obj = {
  outer: function () {
    console.log(this); // { outer }
    var innerFunc1 = function () {
      console.log(this); // { Window }
    };
    innerFunc1();

    var self = this;
    var innerFunc2 = function () {
      console.log(self); // { outer }
    };
    innerFunc2();
  },
};
obj.outer();
```

`innerFunc1`에서의 `this`는 전역객체를 가리키지만, `outer` 스코프에서 `self` 변수에 `outer` 스코프의 `this`를 저장한 뒤 호출한 `innerFunc2`의 `self`는 `obj`가 출력된다. 상위 스코프의 `this`를 저장해서 내부함수에서 활용하는 것이다. 변수 명으로는 `_this`, `that`, `_` 등 여러가지가 쓰이나 `self`가 가장 많이 쓰인다.

#### `this`를 바인딩하지 않는 함수

ES6에서는 함수 내부에서 `this`가 전역객체를 바라보는 문제를 보완하고자, `this`를 바인딩하지 않는 화살표 함수를 새로 도입했다. 화살표 함수는 실행 컨텍스트를 생성할 때 `this` 바인딩 과정 자체가 빠져, 상위 스코프의 `this`를 그대로 활용할 수 있다.

```js
var obj = {
  outer: function () {
    console.log(this); // outer 객체
    var innerFunc = () => {
      console.log(this); // outer 객체
    };
    innerFunc();
  },
};
obj.outer();
```

이 외에도 `call`, `apply` 등의 메서드를 활용해 함수를 호출할 때 명시적으로 `this`를 지정하는 방법이 있다.

### 3.1.4 콜백 함수 호출 시 그 함수 내부에서의 `this`

함수 A의 제어권을 다른 함수(메서드) B에게 넘겨주는 경우, 함수 A를 콜백 함수라고 한다. 함수 A는 함수 B의 내부 로직에 따라 실행되며, `this` 역시 함수 B 내부 로직에서 정한 규칙에 따라 값이 결정된다. **콜백 함수 역시 함수이므로 기본적으로 `this`가 전역 객체를 참조**한다. 하지만 **제어권을 받은 함수에서 콜백 함수에 별도로 `this`가 될 대상을 지정한 경우는 그 대상을 참조**하게 된다.

```js
setTimeout(function () {
  console.log(this);
}, 3000); // 3초 뒤에 전역객체 출력

[1, 2, 3].forEach(function (x) {
  console.log(this, x);
}); // 3번 전역 객체 출력

document.body.innerHTML += "<button id='a'>클릭</button>";
document.body.querySelector("#a").addEventListener("click", function (e) {
  console.log(this, e);
}); // 클릭 시 button#a 출력
```

`setTimeout` 함수와 `forEach` 메서드는 내부에서 콜백 함수를 호출할 때 대상이 될 `this`를 지정하지 않으므로 전역객체를 참조한다. 반면 `addEventListener`는 콜백 함수를 호출할 때 자신의 `this`를 상속한다. 따라서 콜백 함수의 `this` 역시 `addEventListner`의 점(`.`) 앞 부분이 된다.

### 3.1.4 생성자 함수 내부에서의 `this`

생성자 함수는 어떤 공통된 성질을 지니는 객체들을 생성하는 데 사용하는 함수이다. 객체지향 언어에서는 생성자를 클래스 class, 클래스를 통해 만든 객체를 인스턴스 instance라고 한다.

프로그래밍적으로 **'생성자'는 구체적인 인스턴스를 만들기 위한 틀**이다. 틀에는 공통 속성들이 준비돼 있고, 구체적인 개성을 더해 개별 인스턴스를 만들 수 있다.

자바스크립트는 함수에 생성자로서의 역할을 함께 부여했다. `new` 명령어와 함께 함수를 호출하면 해당 함수가 생성자로서 동작한다. **어떤 함수가 생성자 함수로서 호출된 경우 내부에서의 `this`는 곧 새로 만들 구체적인 인스턴스 자신**이 된다.

생성자 함수를 `new` 명령어와 함께 호출하면, 생성자의 `prototype` 프로퍼티를 참조하는 `__proto__` 프로퍼티가 있는 객체(인스턴스)를 만들고, 미리 준비된 공통 속성 및 개성을 해당 객체(`this`)에 부여한다. 이런 방식으로 구체적인 인스턴스가 만들어진다.

```js
var Cat = function (name, age) {
  this.bark = "야옹";
  this.name = name;
  this.age = age;
};

var choco = new Cat("초코", 7);
var nabi = new Cat("나비", 5);
console.log(choco, nabi);

// Cat {bark: '야옹', name: '초코', age: 7}
// Cat {bark: '야옹', name: ' 나비', age: 5}
```

`Cat` 이라는 변수에 익명 함수를 할당했다. 이 함수는 `this`에 접근해 `bark`, `name`, `age` 프로퍼티에 값을 대입한다. `new` 명령어를 통해 두 개의 인스턴스를 만들고 로그를 찍어보면 생성자 함수 내부에서의 `this`는 각각 `choco`, `nabi` 인스턴스를 가리키고 있음을 알 수 있다.

## 3.2 명시적으로 `this`를 바인딩하는 방법

`this`에 별도의 대상을 바인딩하는 방법도 있다. 만일 앞 절의 규칙에 부합하지 않는다면 다음 방법 중 하나를 사용했을 것이라고 추측할 수 있다.

### 3.2.1 `call` 메서드

```js
Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
```

`call` 메서드는 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령이다. 이때 `call` 메서드의 첫 인자를 `this`로 바인딩하고, 이후의 인자들을 호춣할 함수의 매개변수로 한다.

함수를 그냥 실행할 때와 달리 `call` 메서드를 이용하면 임의의 객체를 `this`로 지정할 수 있다. 메서드의 경우에도 메서드를 호출한 객체가 아닌 임의의 객체를 `this로 지정할 수 있다.

```js
var func = function (a, b, c) {
  console.log(this, a, b, c);
};

func(1, 2, 3); // Window 1 2 3
func.call({ x: 1 }, 4, 5, 6); // {x : 1} 4 5 6

var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};

obj.mehtod(2, 3); // 1 2 3
obj.method.call({ a: 4 }, 5, 6); // 4 5 6
```

### 3.2.2 `apply` 메서드

```js
Function.prototype.apply(thisArg[, argsArray])
```

`apply` 메서드는 기능적으로 `call` 메서드와 완전히 동일하다. `call` 메서드는 첫 인자를 제외한 나머지 모든 인자들을 호출할 함수의 매개변수로 지정하는 반면, **`apply` 메서드는 두 번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정**한다는 점만 다르다.

```js
var func = function (a, b, c) {
  console.log(this, a, b, c);
};

func(1, 2, 3); // Window 1 2 3
func.apply({ x: 1 }, [4, 5, 6]); // {x : 1} 4 5 6

var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};

obj.mehtod(2, 3); // 1 2 3
obj.method.apply({ a: 4 }, [5, 6]); // 4 5 6
```

### 3.2.3 `call` / `apply` 메서드의 활용

`call`이나 `apply` 메서드를 잘 활용하면 자바스크립트를 더욱 다채롭게 사용할 수 있다.

#### 유사배열객체에 배열 메서드를 적용

```js
var obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};
Array.prototype.push.call(obj, "d");
console.log(obj); // { 0: "a", 1: "b", 2: "c", 3: "d", length: 4}

var arr = Array.prototype.slice.call(obj);
consolr.log(arr); // ["a", "b", "c", "d"]
```

원래 객체에는 배열 메서드를 직접 적용할 수 없다. 하지만 1) 키가 0 또는 양의 정수인 프로퍼티가 존재하고, 2) `length` 프로퍼티의 값이 0 또는 양의 정수인 객체, 즉 배열의 구조와 유사한 객체인 경우 `call` 또는 `apply` 메서드를 이용해 배열 메서드를 차용할 수 있다.

`push` 메서드를 사용해 객체에 프로퍼티 `3`에 `"d"`를 추가할 수도 있고, `slice` 메서드를 사용해 원본 배열을 얕은 복사할 수 있다. 이 때 `slice` 메서드는 배열 메서드이기 때문에, 객체에 차용하더라도 반환값은 배열이 나오게 된다.

함수 내부에서 접근 가능한 `arguments` 객체도 유사배열객체이므로, 위의 방법으로 배열로 전환할 수 있다. `querySelectorAll`, `getElementByClassName` 등을 통해 얻을 수 있는 `NodeList`도 마찬가지다.

유사배열객체에는 `call`/`apply` 메서드를 이용해 모든 배열 메서드를 적용할 수 있다. 배열처럼 인덱스와 `length` 프로퍼티를 지니는 문자열도 마찬가지다. 단, 문자열의 경우 `length` 프로퍼티가 읽기 전용이므로, 원본 문자열에 변경을 가하는 `push`, `pop`, `shift`, `unshift`, `splice` 등의 메서드는 에러를 던지며, `concat`처럼 대상이 반드시 배열이어야 할 경우 에러는 나지 않지만 제대로 된 결과를 얻을 수 없다.

이처럼 `call` / `apply` 메서드를 이용해 형변환하는 것은 `this`를 원하는 값으로 지정하여 호출한다는 원래의 의도와는 먼 것이다. 이에 ES6에서는 유사배열객체 또는 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는 `Array.from` 메서드를 새로 도입했다.

#### 생성자 내부에서 다른 생성자를 호출

생성자 내부에 다른 생성자와 공통된 내용이 있을 경우 `call` 또는 `apply`를 이용해 다른 생성자를 호출하면 간단하게 반복을 줄일 수 있다.

```js
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}

function Student(name, gender, school) {
  Person.call(this, name, gender);
  this.school = school;
}
```

#### 여러 인수를 묶어 하나의 배열로 전달하고 싶을 때 - `apply` 활용

여러 개의 인수를 받는 메서드에게 하나의 배열로 인수들을 전달하고 싶을 때 `apply` 메서드를 사용하면 좋다. ES6에서는 펼치기 연산자를 이용하면 더욱 간편하게 작성할 수 있다.

```js
var numbers = [10, 20, 3, 16, 45];
var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);
console.log(max, min); // 45 3

// 펼치기 연산자
var max = Math.max.apply(...numbers);
var min = Math.min.apply(...numbers);
```

`call` / `apply` 메서드는 명시적으로 별도의 `this`를 바인딩하면서 함수 또는 메서드를 실행하는 훌륭한 방법이다. 하지만 이로 인해 오히려 `this`를 예측하기 어렵게 만드는 단점 또한 있다.

### 3.2.4 `bind` 메서드

```js
Function.prototype.bind(thisArg[, ar1[, arg2[, ...]]])
```

`bind` 메서드는 ES5에서 추가된 기능으로, `call`과 비슷하지만 즉시 호출하지는 않고, 넘겨받은 `this` 및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 메서드이다. 다시 새로운 함수를 호출할 때 인수를 넘기면 그 인수들은 기존 `bind` 메서드를 호출할 때 전달했던 인수들의 뒤에 이어서 등록된다. 즉 `bind` 메서드는 함수에 `this`를 미리 적용하는 것, 부분 적용 함수를 구현하는 것이라는 두 가지 목적을 지닌다.

```js
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
func(1, 2, 3, 4); // Window, 1 2 3 4

var bindFunc1 = func.bind({ x: 1 });
bindFunc1(5, 6, 7, 8); // {x: 1} 5 6 7 8

var bindFunc2 = funcbind({ x: 1 }, 4, 5);
bindFunc2(6, 7); // {x: 1} 4 5 6 7
bindFunc2(8, 9); // {x: 1} 4 5 8 9
```

`bindFunc1`은 `this`만을 지정했고, `bindFunc2`는 `this` 지정과 함께 부분 적용 함수를 구현했다.

#### name 프로퍼티

`bind` 메서드를 적용해 새로 만든 함수는 `name` 프로퍼티에 `bound`라는 접두어가 붙는다. 어떤 함수의 `name` 프로퍼티가 `bound`로 시작한다면 이는 `bound` 뒤의 이름을 가진 원본 함수에 `bind` 메서드를 적용한 함수라는 의미가 되고, 코드를 추적하기 수월해진다.

#### 상위 컨텍스트의 `this`를 내부함수나 콜백 함수에 전달하기

`self` 변수를 활용하지 않고도, `call`, `apply`, `bind` 메서드를 이용해 메서드의 내부함수에서 메서드의 `this`를 그대로 바라보게 할 수 있다.

```js
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    };
    innerFunc.call(this);
  },
};
obj.outer();
```

```js
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    }.bind(this);
    innerFunc();
  },
};
obj.outer();
```

콜백 함수를 인자로 받는 함수나 메서드 중에서, 기본적으로 콜백 함수 내에서의 `this`에 관여하는 함수 또는 메서드에 대해서도 `bind` 메서드를 이용해 `this` 값을 사용자의 뜻대로 바꿀 수 있다.

```js
var obj = {
  logThis: function () {
    console.log(this);
  },
  logThisLater1: function () {
    setTimeout(this.logThis, 500);
  },
  logThisLate2: function () {
    setTimeout(this.logThis.bind(this), 1000);
  },
};
obj.logThisLater1(); // Window
obj.logThisLater2(); // obj {...}
```

### 3.2.5 화살표 함수의 예외사항

화살표 함수는 실행 컨텍스트 생성 시 `this`를 바인딩하는 과정이 제외됐다. 이 함수 내부에는 `this`가 아예 없으며, 접근하고자 하면 스코프체인상 가장 가까운 `this`에 접근하게 된다.

```js
var obj = {
  outer: function () {
    console.log(this); // outer { ... }
    var innerFunc = () => {
      console.log(this); // outer { ... }
    };
    innerFunc();
  },
};
obj.outer();
```

### 3.2.6 별도의 인자로 `this`를 받는 경우(콜백함수 내에서의 `this`)

콜백 함수를 인자로 받는 메서드 중 일부는 추가로 `this`로 지정할 객체(`thisArg`)를 인자로 지정할 수 있는 경우가 있다. 이때 `thisArg`를 지정하면 콜백 함수 내부에서 `this` 값을 원하는 대로 변경할 수 있다. 배열 메서드에 많으며, `Set`, `Map` 등의 메서드에도 일부 존재한다.

```js
var report = {
  sum: 0,
  count: 0,
  add: function () {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (entry) {
      this.sum += entry;
      ++this.count;
    }, this); // forEach의 두 번째 인자로 전달한 this가 콜백함수 내부에서의 this에 바인딩 된다.
  },
  average: function () {
    return this.sum / this.count;
  },
};

report.add(60, 85, 95);
console.log(report.sum, report.count, eport.average()); // 240 3 80
```

`report` 객체엔 `sum`, `count` 프로퍼티와 `add`, `average` 메서드가 있다. `add` 메서드는 `arguments`를 배열로 변환해 `args` 변수에 담고, 배열을 순회하면서 `forEach` 메서드로 콜백 함수를 실행한다.

이때 콜백 함수 내부에서의 `this`는 `forEach` 메서드의 두 번째 인자로 전달해준 `this`가 바인딩된다. 따라서 콜백 함수 내부에서 `this`는 전역객체가 아닌, `add` 메서드의 `this`인 `report`를 가리킨다.

`forEach` 외에도, `map`, `filter`, `some`, `every`, `find`, `findIndex`, `flatMap`, `from` 등의 배열 메서드와, `Set`과 `Map`에서의 `forEach` 역시 `thisArg`를 전달할 수 있다.
