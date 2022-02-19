# 구조분해할당

> 프레임워크를 위한 JavaScript ES6

배열의 인덱스 혹은 객체의 키를 기준으로 변수에 값을 한 번에 할당하는 것.
객체나 배열 안의 값들로 한번에 변수를 선언할 때 등에 사용한다.

```js
const song = {
  author: "비",
  date: "2020-05-31",
  title: "깡",
  body: "화려한 조명이 나를 감싸네",
};
const { author, date, title, body } = song;
console.log(author, date, title, body); // 비 2020-05-31 깡 화려한 조명이 나를 감싸네
```

변수 이름과 객체의 키를 다르게 설정할 때는 `:`을 사용하면 된다.

```js
const { author: name, date: time, title: jemok, body: lyrics } = song;
```

외부로부터 데이터를 받아올 때는 중첩된 객체 형태를 띠는 경우가 많다.
웹 서비스에서 드러내고자 하는 정보는 중첩된 객체 전체가 아니라, 중첩된 객체의 일부일 경우가 많다.
그럴 때 구조분해할당을 이용한다.

중첩된 객체 안의 데이터를 받아오고 싶을 때는 `: {}`를 사용해 구조분해할당을 한 번 더 하면 된다.

```js
const {
  amount: { total: totalPrice },
} = kakaoResponse;
```

위의 코드는 `kakaoResponse` 객체 안의 `amount` 객체 안의 `total` 키의 값을 `totalPrice` 변수에 할당한다.
