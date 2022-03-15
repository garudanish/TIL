# 07. 객체 리터럴

> Let's Get IT 자바스크립트 프로그래밍

객체는 여러 개의 변수를 하나의 변수로 묶을 때 사용한다. `{}`를 사용해 객체를 표현하는 것을 **객체 리터럴**이라고 한다.여러 개의 변수를 하나로 묶는 배열과 객체 리터럴이 가장 다른 점은 객체 리터럴의 값에는 속성property이 있다는 점이다.

```js
const hyeonsuKim = {
  name: "김현수",
  year: 1996,
  month: 8,
  date: 20,
  gender: "M",
};
```

`name`, `year`... 등은 속성 이름이고, `"김현수"`, `1996` 등은 속성 값이다. 속성 이름은 띄어쓰기가 없는 문자열일 경우엔 위의 예시처럼 따옴표를 쓰지 않아도 되나, 숫자나 공백이 포함된 경우 따옴표를 써야 한다.

```js
const hyeonsuKim = {
  name: "김현수",
  year: 1996,
  month: 8,
  date: 20,
  gender: "M",
};

console.log(hyeonsuKim.name); // 김현수
console.log(hyeonsuKim["name"]); // 김현수
console.log(hyeonsuKim.date); // 20
console.log(hyeonsuKim["date"]); // 20

const name = "date";
console.log(hyeonsuKim[name]); // 20
```

속성에 접근하는 방법은 두 가지이다. 1) `변수.속성`, 2) `변수["속성"]`.

두 번째 방법을 쓸 때 `[]` 내부에 따옴표를 사용해 문자열을 넣어야 한다. 만일 따옴표를 쓰지 않는다면 해당 이름의 변수를 사용하게 된다.

속성 이름에 숫자나 공백이 포함된 경우는 `변수["속성"]` 방법을 사용해야만 속성에 접근할 수 있다.

만일 없는 속성에 접근한 경우 `undefined`가 나온다.

## 객체 속성 수정하기

```js
hyeonsuKim.gender = "F";
console.log(hyeonsuKim.gender); // F
```

`변수.속성 = 값;`을 하면 속성 값이 수정된다. 같은 방식으로 새로운 속성을 추가할 수도 있다.

## 객체 속성 제거하기

```JS
delete hyeonsuKim.gender;
console.log(hyeonsuKim.gender);   // undefined
```

`delete 변수.속성;`을 하면 해당 속성이 제거된다. 이때 제거된 속성 값은 `undefined`가 된다.

이러한 성질은 배열과 함수 모두에도 적용된다. 즉, 배열과 함수에도 속성을 추가하거나 수정할 수 있다. 하지만 각각의 목적이 있기 때문에 추가하는 경우는 드물다.

## 메서드 이해하기

객체의 속성 값으로 함수가 들어가면 그것을 특별히 메서드라고 한다.

```js
const debug = {
  log: function (value) {
    console.log(value);
  },
};

debug.log("Hello, Method!"); // Hello, Method!
```

## 객체 간 비교하기

숫자, 문자열, 불 값, `null`, `undefined` 등은 같은 모양이라면 `true`를 반환하지만, 객체끼리는 모양이 같아도 비교하면 `false`를 반환한다.

```js
{} === {};    // false
```

객체는 생성할 때마다 새로운 객체가 만들어진다. 즉 위의 예시에서 좌변의 `{}`을 생성할 때 새로운 객체가 만들어지고, 우변의 `{}`를 생성할 때 또 다시 새로운 객체가 만들어져 둘을 비교했을 때 `false`를 반환하는 것이다.

따라서 객체를 비교하려면 객체를 변수 안에 담아놓고 비교해야 한다.

```js
const a = { name: "hyeonsu" };
const array = [1, 2, a];
console.log(a === array[2]); // true
```

## 참조와 복사

```js
const a = { name: "hyeonsu" };
const b = a;
a.name = "hero";
console.log(b.name); // hero
```

위의 예시는 변수 `b`에 `a`를 대입했다. 객체를 저장한 변수를 다른 변수에 대입하면 두 변수 모두 같은 객체를 저장하는 셈이 된다. 이때 그 객체의 속성 값을 바꾸면 두 변수 모두 바뀌는 것처럼 보인다. 이럴 때 `a`와 `b`는 같은 객체를 **참조**라고 있다고 표현한다.

하지만 객체가 아닌 값(문자열, 숫자, 불 값, `null`, `undefined`)의 경우는 이와 다르다.

```js
let a = "hyeonsu";
let b = a;
a = "hero";
console.log(b); // hyeonsu
```

객체가 아닌 값을 변수에 저장한 경우에는 참조 관계가 생기지 않기 때문에 `a`를 `b`에 대입한 뒤 `a`를 바꿔도 `b`는 변하지 않는다. 이렇게 참조가 생기지 않는 상황을 **복사**라고 한다.
