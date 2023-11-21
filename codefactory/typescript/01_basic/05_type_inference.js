"use strict";
/**
 * Type inference
 *
 * 타입 추론
 */
Object.defineProperty(exports, "__esModule", { value: true });
let stringType = "string"; // string 타입을 명시하지 않아도 string 타입으로 추론
let booleanType = true; // boolean 타입을 명시하지 않아도 boolean 타입으로 추론
let numberType = 1; // number 타입을 명시하지 않아도 number 타입으로 추론
booleanType = false;
// booleanType = "string"; // boolean 타입으로 추론되어 string 타입을 할당할 수 없음
// 그냥 string 타입이 아니라 'const string'으로 추론함. 값이 어차피 변하지 않기 때문
const constStringType = "const string";
// name, year가 각각 string, number 타입으로 추론됨
let yuJin = {
    name: "안유진",
    year: 2002,
};
// const로 선언했지만 '안유진', 2002가 아닌 string, number로 추론됨
const yuJin2 = {
    name: "안유진",
    year: 2002,
};
yuJin2.name = "김유진"; // 그래서 값을 변경할 수 있음
const yuJin3 = {
    name: "안유진", // as const를 붙이면 값을 변경하지 못하게 할 수 있음
    year: 2002,
};
// yuJin3.name = "김유진"; // 에러 발생
yuJin3.name = "안유진"; // 값이 바뀌지 않는다면 할당 자체를 막진 않는다
/**
 * Arrays
 */
let numbers = [1, 2, 3]; // number[] 타입으로 추론
let numbersAndString = [1, 2, 3, "4"]; // (string | number)[] 타입으로 추론
numbers.push(4); // number 타입이기 때문에 가능
// numbers.push("5"); // number 타입이 아니기 때문에 불가능'
const number = numbers[0]; // number 타입으로 추론
const numberOrString = numbersAndString[0]; // string | number 타입으로 추론
const numberOrString2 = numbersAndString[4]; // undefined지만 string | number 타입으로 추론
// tuple
const twoNumbers = [1, 3]; // readonly [1, 3] 타입으로 추론
// 정확한 순서와 값을 갖고 있음
//twoNumbers.push(4); // 에러 발생
//twoNumbers[0] = 2; // 에러 발생
const first = twoNumbers[0]; // 정확히 값이 1이라는 것을 알려줌
// const first2 = twoNumbers[2]; // 에러. 튜플의 길이가 2이기 때문에 인덱스 2는 존재할 수 없음
