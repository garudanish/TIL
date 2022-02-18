# this

> 프레임워크를 위한 JavaScript ES6

## 바인딩 binding

함수, 메서드를 호출한 대상에게 실제 함수를 연결 짓는 것.
함수를 호출한 애한테 실제로 함수가 있는 메모리 주소로 연결지어 주는 것.

```js
var myObject = {
  name: "minchul",
  sayName: function () {
    console.log(this.name);
  },
};

var otherObject = {
  name: "youngsu",
};

otherObject.sayName = myObject.sayName;
myObject.sayName(); // "minchul"
otherObject.sayName(); // "youngsu"
```

함수를 `otherObject`에게 할당해줫다. 각자의 `sayName` 메서드를 실행하면 각자의 `name`이 나온다. `myObject.sayName`은 `myObject`에, `otherObject.sayName`은 `otherObject`에 바인딩되었기 때문이다.

즉, 바인딩은 올바른 객체에 올바른 메서드를 묶어주는 것이다.

## 전역 객체

전역을 감싸는 객체. 코드 전체를 아우르는 객체.

자바스크립트는 소스 코드를 실행하기 전에, 자바스크립트 전체를 포괄하는 가장 큰 범위의 객체를 하나 만들고 나서 실행하게 된다.

`console.log()`, `clear()` 모두 전역 객체의 속성, 메서드이다.

브라우저에서의 전역객체는 `window` 객체이고, Node.js와 같이 서버 사이드 환경에서의 전역객체는 `global` 객체이다.

## 일반적인 함수 호출의 `this` 바인딩

함수는 사실 전역 객체의 메서드 이고, 전역 변수도 사실 전역 변수의 속성이다.

즉, 일반 함수 호출 과정에서의 `this`는 전역 객체에 바인딩 된다.

```js
var name = "Minchul";

var sayHello = function () {
  var name = "Youngsu";
  console.log(this.name); // Minchul
};
```

일반적인 함수에서의 `this`는 전역객체, 즉 `window` 객체를 가리킨다. `window.name`은 `var name = "Minhul"`라는 전역 변수로 선언되었다. 따라서 `Youngsu`가 아니라 `Minhul`이 출력된다.

## 객체를 호출했을 때 `this` 바인딩

객체의 메서드에서 사용된 `this`는 객체에 바인딩 된다.

```js
var myObject = {
  name: "minchul",
  sayName: function () {
    console.log(this.name);
  },
};

var otherObject = {
  name: "youngsu",
};

otherObject.sayName = myObject.sayName;
myObject.sayName(); // "minchul"
otherObject.sayName(); // "youngsu"
```

각 객체에 바인딩 되어 각 객체의 `name` 속성을 출력한다.

## 생성자 함수를 호출에서의 `this` 바인딩

그 생성자 함수를 통해 생성되어 반환되는 객체에 바인딩 된다.

생성자 함수를 통해 객체를 만든다면 새롭게 만들어진 객체에 바인딩된다.

`new`로 **새로운 객체를 만들면** 생성자 함수이다. `new` 없이 그냥 호출되어 쓰이면 일반 함수이다.

만일 생성자 함수를 `new` 없이 그냥 실행한다면 일반 함수이므로 `this`는 전역 객체에 바인딩 된다.

## 내부함수의 `this`

내부함수에서의 `this`는 무조건 전역 객체에 바인딩 된다.

함수 안의 함수, 객체의 메서드 안의 함수... 등은 무조건 전역 객체에 바인딩 된다.

```js
function myFunction() {
  console.log(this); // window
  function innerFunction() {
    console.log(this); // window
  }
}

var obj = {
  objMethod: function () {
    console.log(this); // obj
    function innerMethod() {
      console.log(this); // window
    }
  },
};
```
