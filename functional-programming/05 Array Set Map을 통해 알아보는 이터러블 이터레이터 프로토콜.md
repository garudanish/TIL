# Array, Set, Map을 통해 알아보는 이터러블/이터레이터 프로토콜

자바스크립트는 `Array`, `Set`, `Map`이라는 내장 값을 가지고 있는데, 이 값들을 모두 `for of`문으로 순회할 수 있다.

```js
const arr = [1, 2, 3];
for (const a of arr) {
  console.log(a); // 1, 2, 3
}

const set = new Set([1, 2, 3]);
for (const a of set) {
  console.log(a); // 1, 2, 3
}

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
for (const a of map) {
  console.log(a); // ["a", 1], ["b", 2], ["c", 3]
}
```

`Array`는 `arr[0]` 같은 숫자 키로 요소에 접근해 순회할 수 있다. 하지만 `set[0], map[0]`은 불가능한데, 이는 `for of`문이 ES6 이전의 `for (var i = 0; i < arr.length; i++)`의 형태를 가지지 않았음을 뜻한다.

```js
const arr = [1, 2, 3];

console.log(arr[Symbol.iterator]); // ƒ values() { [native code] }

arr[Symbol.iterator] = null;

for (const a of arr) {
  console.log(a); // Uncaught TypeError: arr is not iterable
}
```

`Symbol.iterator`라는 ES6에서 추가된 심벌이 있다. 이 심벌은 객체의 속성으로 사용될 수 있다. 이 심벌을 `null` 등으로 재할당하면 `for of`문을 사용할 때 에러가 발생한다.

## 이터러블/이터레이터 프로토콜

`Array`, `Set`, `Map`은 자바스크립트 내장객체로 이터러블/이터레이터 프로토콜을 따르고 있다.

- 이터러블: 이터레이터를 리턴하는, `[Symbol.iterator]()` 메서드를 가진 값
  - 위의 예시에서 `arr`, `set`, `map`은 이터러블이다.
- 이터레이터: `{ value, done }` 객체를 리턴하는, `next()` 메서드를 가진 값
- 이터러블/이터레이터 프로토콜: 이터러블을 `for of`, 전개 연산자 등과 함께 동작하도록 한 규약
  - `set`, `map`은 숫자 키로 값에 접근할 수 없지만, 이 프로토콜을 따르고 있기 때문에 `for of`문으로 접근 가능한 것이다.

```js
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

const it = map.values();
console.log(it); // MapIterator {1, 2, 3}

const it2 = it[Symbol.iterator]();
```

`map.keys()`, `map.values()`, `map.entires()`는 `map`의 `key`, `value`, 키-값 쌍만 담은 이터레이터를 반환한다. 이 이터레이터 역시 `Symbol.iterator`를 속성으로 갖고 있는데, 이를 실행해 변수에 담으면 자기 자신과 같은 이터레이터를 생성한다.
