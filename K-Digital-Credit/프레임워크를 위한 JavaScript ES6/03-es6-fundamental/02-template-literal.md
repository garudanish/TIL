# 템플릿 리터럴

> 프레임워크를 위한 JavaScript ES6

지금까지는 문자열을 표기할 때 `""`를 사용하거나, `''`를 사용했다. 템플릿 리터럴은 백틱을 이용해서 문자열을 입력하는 방식이다.

```js
const name = "minchul";
console.log("안녕 내 이름은 " + name + "이야");
console.log(`안녕 내 이름은 ${name}이야`);

console.log("총 금액은 " + (10 + 5) + "만원입니다.");
console.log(`총 금액은 ${10 + 5}만원입니다.`);

let homework = true;
console.log(`아 숙제 ${homework ? "다 했다" : "아직 다 못했어"}`);
```
