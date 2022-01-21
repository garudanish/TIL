# 05. 배열

> Let's Get IT 자바스크립트 프로그래밍

배열을 만드려면 대괄호로 값들을 감싸면 된다. 값은 쉼표로 구분한다.

```js
const fruits = ["사과", "오렌지", "배", "딸기"];
```

배열 내부의 값을 개별적으로 불러오려면, 배열 이름 뒤에 불러오고 싶은 값의 자릿수를 적으면 된다. 이때 자릿수는 0부터 시작하며, 이를 인덱스라고 한다.

```js
const fruits = ["사과", "오렌지", "배", "딸기"];
console.log(fruits[0]); // 사과
console.log(fruits[1]); // 오렌지
console.log(fruits[2]); // 배
console.log(fruits[3]); // 딸기
```

배열 안의 값은 자료형이 모두 같지 않아도 된다. 배열 안에 다른 배열이나 변수를 넣을 수도 있다. 배열 내부에 배열이 들어있는 것을 이차원 배열이라고 한다.

```js
const arrayOfArray = [
  [1, 2, 3],
  [4, 5],
];
arrayOfArray[0]; // [1, 2, 3]
const a = 10;
const b = 20;
const variableArray = [a, b, 30];
variableArray[1]; // 20
```

```js
const everything = ["사과", 1, undefined, true, "배열", null];
const duplicated = ["가", "가", "가", "가", "가"];
const empty = [];
```

또, 배열 내부의 값이 중복되어도 되고, 아무 값 없이 만들 수도 있다. 이러한 배열 내부의 값을 **요소**라고 한다. 위의 예시에서 `everything` 배열에는 6개의 요소가 있고, `empty` 배열에는 0개의 요소가 있다.

## 배열의 요소 개수 구하기

배열의 요소 개수를 구하려면 배열 이름 뒤에 `.length`를 붙이면 된다.

```js
const everything = ["사과", 1, undefined, true, "배열", null];
console.log(everything.length); // 6

const emptyValue = [null, undefined, false, "", NaN];
console.log(emptyValue.length); // 5
```

빈 값 역시도 유효한 값이기 때문에 요소 개수를 셀 때 포함된다.

배열의 요소 개수는 항상 마지막 인덱스보다 1 크다. 위의 예시에서 `emptyValue` 배열에서 `NaN` 요소의 인덱스는 4이고, 요소의 개수는 5이다. 배열의 요소 개수에서 1을 빼면 마지막 요소의 인덱스가 된다. 이를 이용해서 마지막 요소의 값을 찾을 수 있다.

```js
const findLastElement = ["a", "b", "c", "d", "e"];
console.log(findLastElement[findLastElement.length - 1]); // e
```

## 배열에 요소 추가하기

배열을 만들고 난 후 중간에 배열을 수정할 수 있다. 배열에 요소를 추가할 수도 있고, 특정 인덱스의 요소를 수정하거나 제거할 수도 있다.

```js
const target = ["a", "b", "c", "d", "e"];
target[target.length] = "f";
console.log(target); // (6) ['a', 'b', 'c', 'd', 'e', 'f']

const target2 = ["가", "나", "다", "라", "마"];
target2.push("바");
console.log(target2); // (6) ['가', '나', '다', '라', '마', '바']
```

배열의 요소 개수는 인덱스보다 항상 1이 크므로, `배열[배열.length] = 추가요소`를 실행하면 마지막 인덱스에 요소를 추가할 수 있다. 혹은 `push` 기능을 사용해 맨 뒤에 요소를 추가할 수 있다.

```js
const target = ["나", "다", "라", "마", "바"];
target.unshift("가");
console.log(target); // (6) ['가', '나', '다', '라', '마', '바']
```

배열의 맨 앞에 요소를 추가하려면 `unshift` 기능을 실행한다. 작성한 값이 배열의 첫 번째 요소로 추가되고, 다른 요소들의 인덱스는 하나씩 뒤로 밀린다.

위의 예시들에서 배열을 `const`로 선언했는데도 수정이 가능한 이유는, `const`에 객체(배열, 함수, 객체 리터럴)가 대입되면 객체 내부의 속성이나 배열의 요소는 수정할 수 있기 때문이다. 하지만 이미 선언된 `const`에 새로운 값을 대입하지는 못한다.

## 배열의 요소 수정하기

수정하길 원하는 인덱스에 바꿀 값을 넣으면 된다.

```JS
const target = ["가", "나", "다", "라", "마"];
target[3] = "카";
console.log(target);    // (5) ["가", "나", "다", "카", "마"]
```

## 배열에서 요소 제거하기

```js
const target = ["가", "나", "다", "라", "마"];
target.pop();
console.log(target); // (4) ["가", "나", "다", "라"]
```

`pop` 기능을 사용하면 배열의 마지막 요소를 제거할 수 있다.

```js
const target = ["가", "나", "다", "라", "마"];
target.shift();
console.log(target); // (4) ["나", "다", "라", "마"]
```

`shift` 기능을 사용하면 배열의 첫 번째 요소를 제거할 수 있다.

```js
const target = ["가", "나", "다", "라", "마"];
target.splice(1, 1);
console.log(target); // (4) ["가", "다", "라", "마"]

const target2 = [1, 2, 3, 4, 5];
target2.splice(1);
console.log(target2); // [1]
```

중간 요소를 제거하려면 `splice` 기능을 사용한다. `splice` 기능의 첫 번째 값은 시작 인덱스이고, 두 번째는 제거할 요소의 개수이다. `target.splice(1, 1)`은 `target` 배열의 인덱스 1부터 1개의 요소를 제거한다는 뜻이다. 만일, 값을 하나만 입력한다면 해당 인덱스를 포함해 마지막 인덱스까지의 모든 요소를 다 제거하겠다는 뜻이다.

```js
const target = ["가", "나", "다", "라", "마"];
target.splice(1, 3, "타", "파");
console.log(target); // (4) ["가", "타", "파", "마"]
```

`splice` 기능의 세 번째 값을 넣으면 제거한 자리에 다른 값을 넣을 수 있다. 위의 예시는 `target` 배열의 인덱스 1부터 3개의 요소(`"나"`, `"다"`, `"라"`)를 제거한 뒤, 제거한 자리에 `"타"`와 `"파"`를 채워넣는다. 그러므로 `target`은 `["가", "타", "파", "마"]`가 된다.

## 배열에서 요소 찾기

```js
const target = ["가", "나", "다", "라", "마"];
const result = target.includes("다");
const result2 = target.includes("카");
console.log(result); // true
console.log(result2); // false
```

`includes` 기능을 사용하면 배열에 특정 요소가 있는지 찾아볼 수 있다. `includes`에 주어진 값이 배열에 존재하면 `true`, 존재하지 않으면 `false`가 된다.

```js
const target = ["라", "나", "다", "라", "다"];
const result = target.indexOf("다");
const result2 = target.lastIndexOf("라");
const result3 = target.indexOf("가");
console.log(result); // 2
console.log(result2); // 3
console.log(result3); // -1
```

`indexOf`과 `lastIndexOf` 기능을 사용하면 검색하고 싶은 값이 몇 번째 인덱스에 위치하는지도 알 수 있다. 위의 예시에선 배열에 `"라"`와 `"다"`가 두 개씩 있다. `indexOf` 기능은 앞에서부터 주어진 값이 있는지 찾고, `lastIndexOf`은 뒤에서부터 찾는다. 따라서 `"다"`는 인덱스 2, 4에 위치하지만 `indexOf` 기능을 통해 찾았으므로 결괏값이 2가 되고, `"라"`는 인덱스 0, 3에 위치하지만 `lastIndexOf` 기능을 통해 찾았으므로 결괏값이 3이 된다. 배열 안에 존재하지 않는 값의 인덱스를 찾으면 결괏값은 `result3`처럼 `-1`이 된다.

## 배열 반복하기

```js
const target = ["가", "나", "다", "라", "마"];
let i = 0;
while (i < target.length) {
  console.log(target[i]);
  i++;
}

// 가
// 나
// 다
// 라
// 마
```

변수 `i`를 배열의 인덱스라고 생각하면 된다. 인덱스 0에서 시작해서 1씩 증가하며 `console.log`를 실행한다. `i`가 `target.length`일 때 중단되므로, `target.length`보다 1이 작은 마지막 인덱스까지 모두 출력된다.

```js
const target = ["가", "나", "다", "라", "마"];
for (let i = 0; i < target.length; i++) {
  console.log(target[i]);
}

// 가
// 나
// 다
// 라
// 마
```
