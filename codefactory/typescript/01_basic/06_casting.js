"use strict";
/**
 * Casting
 *
 * TS에서 Casting을 하면 JS에서는 적용이 안 된다.
 * 즉 캐스팅은 JS에서는 존재하지 않는 개념이다.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const hyeonsuKim = "Hyeonsu Kim";
console.log(hyeonsuKim.toUpperCase());
const testNumber = 1;
// console.log(testNumber.toUpperCase()); // 에러 발생
let number = 1;
// console.log(number.toUpperCase()); // 에러가 나지 않음
// 캐스팅: 실제 그 타입이 아니더라도 그 타입이라고 가정함.
let string = number; // number를 string으로 캐스팅.
console.log(typeof number); // number. 하지만 자동완성은 string 자료형에 맞게 나옴.
let number2 = 2;
console.log(number.toUpperCase()); // 에러가 나지 않음
// 캐스팅은 이렇게 위험하기 때문에, 주로 상속에서 더 구체적인 타입을 지정할 때 사용한다.
// any로 캐스팅하거나, 말도 안 되는 타입으로 캐스팅하는 경우를 만들지 않도록 주의해야 한다.
