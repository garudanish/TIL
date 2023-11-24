"use strict";
/**
 * Defining a function
 */
Object.defineProperty(exports, "__esModule", { value: true });
function printName(name) {
    console.log(name);
}
function returnTwoCouples(person1, person2) {
    return `${person1}와 ${person2}는 커플입니다.`;
}
// console.log(returnTwoCouples()); // parameter가 옵셔널이 아니기 때문에 에러 발생
// console.log(returnTwoCouples(0, 1)); // parameter가 string이 아니기 때문에 에러 발생
// console.log(returnTwoCouples("김현수")); // parameter가 2개가 아니기 때문에 에러 발생
// console.log(returnTwoCouples("김현수", "성남FC", "수원삼성")); // parameter가 2개가 아니기 때문에 에러 발생
console.log(returnTwoCouples("김현수", "성남FC"));
function multiplyOrReturn(x, y) {
    if (y) {
        return x * y;
    }
    else {
        return x;
    }
}
console.log(multiplyOrReturn(3, 5));
console.log(multiplyOrReturn(3));
function multiplyOrReturn2(x, y = 20) {
    return x * y;
}
console.log(multiplyOrReturn2(3, 5));
console.log(multiplyOrReturn2(3)); // 기본값을 설정하면 옵셔널하다고 명시하지 않아도 된다
// 왜냐하면 undefined가 들어가면(값을 넣지 않으면) 기본값이 들어가기 때문이다.
function getInfiniteParameters(...args) {
    return args.map((x) => `너무좋아 ${x}`);
}
console.log(getInfiniteParameters("김현수", "성남FC", "축구"));
function addTwoNumbers(x, y) {
    return x + y;
}
addTwoNumbers(1, 2); // number로 유추됨
function randomNumber() {
    return Math.random() > 0.5 ? 1234 : "성남FC";
}
randomNumber(); // number | "성남FC"로 유추됨
function subtractTwoNumbers(x, y) {
    // return "string" // return type과 type이 다르기 때문에 에러 발생
    return x - y;
}
const subtractTwoNumbersArrow = (x, y) => x - y;
function doNotReturn() {
    console.log("아무것도 반환하지 않습니다.");
}
function throwError() {
    throw new Error("에러가 발생했습니다.");
    // 함수가 error를 던지면서 끝나지 않기 때문에 never로 유추된다.
}
function neverEnding() {
    while (true) {
        console.log("무한루프");
    }
} // 함수가 끝나지 않기 때문에 never로 유추된다.
