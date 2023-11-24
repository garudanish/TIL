"use strict";
/**
 * type predicate
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isNumber(input) {
    return typeof input === "number";
}
function isNumberReturnBoolean(input) {
    return typeof input === "number";
}
let number = 5;
if (isNumberReturnBoolean(number)) {
    number; // any로 유추됨
}
if (isNumber(number)) {
    number; // number로 유추됨
}
function isDoge(animal) {
    return animal.age !== undefined;
    // age 프로퍼티는 Doge에만 존재하므로 undefined가 아니면 Doge이다
}
const doge = {
    name: "강아지",
    age: 3,
};
if (isDoge(doge)) {
    doge; // Doge로 유추됨
}
else {
    doge; // never로 유추됨.
    // 왜냐면 Cat 타입에는 breed가 있는데, 변수로 선언된 doge 변수에는 breed가 없기 때문이다.
}
