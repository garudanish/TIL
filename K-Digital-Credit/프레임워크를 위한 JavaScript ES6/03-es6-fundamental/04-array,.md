# 배열

> 프레임워크를 위한 JavaScript ES6

배열의 자료형은 객체이다.

```js
const arr = [1, 2, 3, 4];
console.log(typeof arr); // object
```

## 배열의 길이 알아보기

`array.length`를 통해 알 수 있다.

```js
console.log(arr.length); // 4
```

배열의 길이와, 배열의 요소 개수(사용자가 초기화해준 값)는 다른 말일 수 있다.

```js
const array = [];
array[2] = 3;
console.log(arr.length); // 3
```

인덱스 0과 인덱스 1에 값을 초기화해주지 않고 인덱스 2에 값을 배정했다. 이럴 때 인덱스 0과 인덱스 1엔 `empty item`이 들어가고 `length`에 포함된다.

## 요소 추가

배열을 직접 건드리는 방식이 있고, 배열을 직접 건드리지 않는 방식이 있다.

`array.push(요소)`를 하면 배열에 요소가 추가되며, 원본 배열을 변화시킨다.

```js
const arr = [1, 2, 3, 4];
arr.push(5, 6);
console.log(arr); // [1, 2, 3, 4, 5, 6]
```

`array.concat(요소)`를 하면 배열에 요소가 추가되며, 원본 배열이 변화되지 않는다.

```js
const arr = [1, 2, 3, 4];
const result = arr.concat(5, 6);
console.log(arr); // [1, 2, 3, 4]
console.log(result); // [1, 2, 3, 4, 5, 6]
```

## 요소 빼내기

`array.pop()`을 사용하면 배열의 마지막 요소가 삭제되고, 원본 배열이 변화한다.

```js
const arr = [1, 2, 3, 4];
arr.pop();
console.log(arr); // [1, 2, 3]
```

## 배열 속 요소 순회하기

`array.forEach(함수)`를 사용하면 배열 속 요소를 순회하며 함수를 실행한다.

```js
const nameArr = ["민철", "영수", "영희", "민수"];
nameArr.forEach((name) => console.log(`내 이름은 ${name}이야`));
```

`array.map(함수)`를 사용하면 배열 속 요소를 순회하며 함수를 실행한다. 실행한 뒤, 실행한 결과를 토대로 새로운 배열을 리턴한다.

```js
const oddArr = [1, 3, 5, 7, 9];
const newArr = oddArr.map((num) => num * 2);
console.log(newArr); // [2, 6, 10 , 14, 18]
```

## 요소 필터링하기

`array.filter(함수)`를 사용하면 배열 속 요소를 순회하며 함수를 실행한다. 함수를 실행했을 때 값이 `false`라면 배열에서 삭제한다.

```js
const oddArr = [1, 3, 5, 7, 9];
const filterArr = oddArr.filter((x) => x > 4);
console.log(filterArr); // [5,7,9]
```

주로 정보의 덩어리에서 내가 원하는 대로 정렬하거나 검색할 때 사용한다.

```js
const postList = [
  { date: "yesterday", id: 1 },
  { date: "yesterday", id: 2 },
  { date: "today", id: 3 },
];

const yesterdayPost = postList.filter((post) => post.date === "yesterday");
console.log(yesterdayPost); // [ { date: "yesterday", id: 1 }, { date: "yesterday", id: 2 } ]
```
