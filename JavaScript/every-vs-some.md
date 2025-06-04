# every 메서드와 some 메서드의 차이

```js
const arr = [];

arr.every(() => true); // true
arr.some(() => true); // false
```

배열이 빈 배열일 때, Array.prototype.some은 `false`를 반환하고 Array.prototype.every는 `true`를 반환한다.

MDN 설명에 따르면

> (every 메서드에서) 특별히 빈 배열은 true를 반환합니다. ([빈 집합](https://en.wikipedia.org/wiki/Empty_set#Properties)의 모든 요소가 주어진 조건을 만족하는 것은 [공허 참](https://en.wikipedia.org/wiki/Vacuous_truth)입니다.)

## ECMAScript 2026 언어 명세로 대충 구현해본 내부 동작

> [https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.some](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.some)
>
> [https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.every](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.every)

```js
const some = (arr, callback) => {
  let k = 0;

  while (k < arr.length) {
    if (arr[k]) {
      if (Boolean(callback(arr[k]) === true)) {
        return true;
      }
    }

    k += 1;
  }

  return false;
};

const every = (arr, callback) => {
  let k = 0;

  while (k < arr.length) {
    if (arr[k]) {
      if (Boolean(arr[k]) === false) {
        return false;
      }
    }

    k += 1;
  }

  return true;
};
```
